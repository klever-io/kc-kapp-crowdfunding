import { useRouter } from 'next/router'
import { View, Text, colors } from '@/styles/global'
import { useMobile } from '@/contexts/useMobile'
import ProgressBar from '@/components/ProgressBar'
import Button from '@/components/Button/Button'
import Link from 'next/link'
import { formatAddress } from '@/utils/formatter'
import { useState, useEffect, FormEvent } from 'react'
import { GetServerSideProps } from 'next'
import {
  ISmartContract,
  TransactionType,
  abiDecoder,
  abiEncoder,
  web,
} from '@klever/sdk-web'
import { abi } from '@/utils/abi'
import {
  convertCrowdfundingJSON,
  convertDTOCrowdfunding,
} from '@/utils/converter'
import { useSdk } from '@/contexts/useSdk'
import { toast } from 'sonner'
import Input from '@/components/Input/Input'

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL
const scAddress = process.env.NEXT_PUBLIC_SC_ADDRESS
const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL
const kleverscanUrl = process.env.NEXT_PUBLIC_KLEVERSCAN_URL

type Props = {
  crowdfunding: DTOCrowdfunding
  token: TokenInfo
}

export default function Crowdfunding({ crowdfunding, token }: Props) {
  const crowd = convertDTOCrowdfunding(crowdfunding)

  const { isMobile } = useMobile()
  const router = useRouter()
  const sdk = useSdk()
  const address = sdk.getAccount()

  const [amount, setAmount] = useState(0)

  const currentDate = new Date()
  const nextMonthDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + 1),
  )
  const formattedDate = nextMonthDate.toISOString().split('T')[0]
  const [deadline, setDeadline] = useState(formattedDate)

  const percentage = (Number(crowd.balance) / Number(crowd.target)) * 100
  const available =
    (crowd.balance - crowd.claimed) / BigInt(10 ** token.precision)

  const handleClaim = async () => {
    const payload: ISmartContract = {
      address: scAddress as string,
      scType: 0,
      callValue: {
        KLV: 10000000,
      },
    }

    const txData: string = Buffer.from(
      'claim' + '@' + abiEncoder.encodeABIValue(crowd.id, 'String', false),
      'utf8',
    ).toString('base64')

    try {
      const unsignedTx = await web.buildTransaction(
        [
          {
            payload,
            type: TransactionType.SmartContract,
          },
        ],
        [txData],
      )

      const signedTx = await web.signTransaction(unsignedTx)

      const broadcastResponse = await web.broadcastTransactions([signedTx])

      if (
        broadcastResponse.error !== '' ||
        broadcastResponse.data.txsHashes.length === 0
      ) {
        throw new Error('Error creating crowdfunding')
      }

      toast.success(
        'Transaction broadcasted! Click here to see on Kleverscan.',
        {
          action: {
            label: '💜',
            onClick: () =>
              router.push(
                kleverscanUrl +
                  '/transaction/' +
                  broadcastResponse.data.txsHashes[0],
              ),
          },
        },
      )
    } catch (error) {
      toast.error('Error creating crowdfunding. Cannot create transaction')
    }
  }

  const handleDeadline = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: ISmartContract = {
      address: scAddress as string,
      scType: 0,
    }

    const deadlineConverted = new Date(deadline).getTime()

    const txData: string = Buffer.from(
      'set_deadline' +
        '@' +
        abiEncoder.encodeABIValue(crowd.id, 'String', false) +
        '@' +
        abiEncoder.encodeABIValue(deadlineConverted, 'u64', false),
      'utf8',
    ).toString('base64')

    try {
      const unsignedTx = await web.buildTransaction(
        [
          {
            payload,
            type: TransactionType.SmartContract,
          },
        ],
        [txData],
      )

      const signedTx = await web.signTransaction(unsignedTx)

      const broadcastResponse = await web.broadcastTransactions([signedTx])

      if (
        broadcastResponse.error !== '' ||
        broadcastResponse.data.txsHashes.length === 0
      ) {
        throw new Error('Error creating crowdfunding')
      }

      toast.success(
        'Transaction broadcasted! Click here to see on Kleverscan.',
        {
          action: {
            label: '💜',
            onClick: () =>
              router.push(
                kleverscanUrl +
                  '/transaction/' +
                  broadcastResponse.data.txsHashes[0],
              ),
          },
        },
      )
    } catch (error) {
      toast.error('Error creating crowdfunding. Cannot create transaction')
    }
  }

  const handleFund = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const amountParsed = Number(amount * 10 ** token.precision)
    let balance = await window.kleverWeb.getBalance()

    if (token.assetId !== 'KLV') {
      const resp = await fetch(
        `${proxyUrl}/address/${address}/collection/${token.assetId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const { data } = await resp.json()
      balance = Number(data?.data?.collection[0]?.balance) || 0
    }

    if (balance < amountParsed) {
      toast.error('Not enough KLV to fund')
      return
    }

    const payload: ISmartContract = {
      address: scAddress as string,
      scType: 0,
      callValue: {
        [token.assetId]: amountParsed,
      },
    }

    const txData: string = Buffer.from(
      'donate' + '@' + abiEncoder.encodeABIValue(crowd.id, 'String', false),
      'utf8',
    ).toString('base64')

    try {
      const unsignedTx = await web.buildTransaction(
        [
          {
            payload,
            type: TransactionType.SmartContract,
          },
        ],
        [txData],
      )

      const signedTx = await web.signTransaction(unsignedTx)

      const broadcastResponse = await web.broadcastTransactions([signedTx])

      if (
        broadcastResponse.error !== '' ||
        broadcastResponse.data.txsHashes.length === 0
      ) {
        throw new Error('Error creating crowdfunding')
      }

      toast.success(
        'Transaction broadcasted! Click here to see on Kleverscan.',
        {
          action: {
            label: '💜',
            onClick: () =>
              router.push(
                kleverscanUrl +
                  '/transaction/' +
                  broadcastResponse.data.txsHashes[0],
              ),
          },
        },
      )
    } catch (error) {
      toast.error('Error creating crowdfunding. Cannot create transaction')
    }
  }

  return (
    <View
      width="100%"
      height="100%"
      padding={isMobile ? '1rem' : '2rem'}
      display="flex"
      justify="center"
      align="start"
      flexDirection="column"
    >
      <View
        width="100%"
        height="100%"
        display="flex"
        justify="center"
        align="center"
        flexDirection="row"
        flexWrap="wrap"
      >
        <View
          width={isMobile ? '100%' : '50%'}
          height="500px"
          borderRadius="8px"
          style={{
            backgroundImage: `url(${crowd.logo})`,
            backgroundSize: 'cover',
          }}
        ></View>

        <View width="2%"></View>

        <View
          width={isMobile ? '100%' : '48%'}
          height="100%"
          display="flex"
          flexDirection="column"
          justify="start"
          align="space-between"
        >
          <View width="100%" marginY="30px">
            <Text fontWeight={700} color={colors.primary} fontSize={28}>
              {' '}
              {crowd.title}
            </Text>
          </View>

          <ProgressBar percentage={percentage} />

          <View width="100%" marginY="30px" justify="end">
            <Text fontWeight={700} color={colors.primary} fontSize={16}>
              {`${crowd.balance / BigInt(10 ** token.precision)} / ${
                crowd.target / BigInt(10 ** token.precision)
              } - ${crowd.token}`}
            </Text>
          </View>

          <View width="100%" justify="center">
            <form style={{ width: '100%' }} onSubmit={e => handleFund(e)}>
              <View width="100%">
                <Input
                  width="100%"
                  height="45px"
                  required
                  padding="5px"
                  color={colors.black}
                  border={`2px solid ${colors.primary}`}
                  borderRadius="4px"
                  fontSize="16px"
                  onChange={e => setAmount(Number(e.target.value))}
                  value={amount}
                  min={1}
                  mask=""
                  type="number"
                />
                <Button
                  width="100%"
                  height="45px"
                  borderRadius="4px"
                  background={colors.primary}
                  border="none"
                  disabled={!address}
                  opacity={!address ? 0.8 : 1}
                  hover
                >
                  FUND!
                </Button>
              </View>
            </form>
          </View>

          <View
            align="center"
            width="100%"
            justify="space-between"
            marginTop="30px"
          >
            <View flexDirection="column" align="start">
              <Text fontWeight={700} color={colors.black} fontSize={16}>
                Valid until:
              </Text>
              <Text fontWeight={400} color={colors.black} fontSize={16}>
                {new Date(crowd.deadline).toLocaleDateString()}
              </Text>
            </View>

            <Link href={`/crowdfundings/${crowd.owner}`}>
              <View
                width="200px"
                height="40px"
                borderRadius="6px"
                background={colors.lightGray1}
                display="flex"
                justify="center"
                align="center"
                margin="2px 1px"
              >
                {formatAddress(crowd.owner)}
              </View>
            </Link>
          </View>

          {available > 0 && address && address === crowd.owner && (
            <View
              width="100%"
              marginTop="30px"
              justify="space-between"
              align="center"
            >
              <Text fontWeight={700} color={colors.primary} fontSize={16}>
                {`Available: ${available}${crowd.token}`}
              </Text>

              <Button
                width="130px"
                height="40px"
                borderRadius="8px"
                background={colors.primary}
                border="none"
                onClick={handleClaim}
                disabled={!address}
                opacity={!address ? 0.8 : 1}
                hover
              >
                Claim
              </Button>
            </View>
          )}

          {address && address === crowd.owner && (
            <>
              <View flexDirection="column" align="start" marginTop="20px">
                <Text fontWeight={700} color={colors.black} fontSize={16}>
                  Update Deadline:
                </Text>
              </View>

              <View width="100%" justify="center">
                <form
                  style={{ width: '100%' }}
                  onSubmit={e => handleDeadline(e)}
                >
                  <View width="100%">
                    <Input
                      width="100%"
                      height="45px"
                      padding="5px"
                      color={colors.black}
                      required
                      border={`2px solid ${colors.primary}`}
                      borderRadius="4px"
                      margin="2px 0px 0px 0px"
                      fontSize="16px"
                      onChange={e => setDeadline(e.target.value)}
                      value={deadline}
                      mask=""
                      type="date"
                    />
                    <Button
                      width="100%"
                      height="45px"
                      borderRadius="4px"
                      background={colors.primary}
                      border="none"
                      hover
                    >
                      UPDATE!
                    </Button>
                  </View>
                </form>
              </View>
            </>
          )}
        </View>
      </View>

      <View width="100%" marginY="30px">
        <Text fontWeight={700} color={colors.black} fontSize={24}>
          {' '}
          Description:{' '}
        </Text>
      </View>

      <Text>{crowd.description}</Text>
    </View>
  )
}

export const getServerSideProps = (async context => {
  const id = context?.params?.id

  if (!id) {
    return {
      notFound: true,
    }
  }

  let convertedId = abiEncoder.encodeABIValue(id, 'String', false)

  const resp = await fetch(`${nodeUrl}/vm/hex`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      scAddress: scAddress,
      funcName: 'getCrowdfunding',
      args: [convertedId],
    }),
  })

  const res = await resp.json()

  const decoded = abiDecoder.decodeStruct(
    res.data.data,
    'CrowdfundingData',
    abi,
  )

  let parsed = convertCrowdfundingJSON(decoded)

  const tokenResp = await fetch(`${proxyUrl}/assets/${parsed.token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const { data } = await tokenResp.json()

  return {
    props: {
      crowdfunding: parsed,
      token: {
        name: data.asset.name,
        assetId: data.asset.assetId,
        precision: data.asset.precision,
      } as TokenInfo,
    },
  }
}) satisfies GetServerSideProps<Props>
