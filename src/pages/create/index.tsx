import { View, Text, colors } from '@/styles/global'
import { useMobile } from '@/contexts/useMobile'
import React, { FormEvent, useState } from 'react'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import {
  ISmartContract,
  TransactionType,
  abiEncoder,
  web,
} from '@klever/sdk-web'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'

const scAddress = process.env.NEXT_PUBLIC_SC_ADDRESS
const kleverscanUrl = process.env.NEXT_PUBLIC_KLEVERSCAN_URL

export default function Crowdfunding() {
  const { isMobile } = useMobile()

  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [target, setTarget] = useState(0)
  const [token, setToken] = useState('KLV')

  const currentDate = new Date()
  const nextMonthDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + 1),
  )
  const formattedDate = nextMonthDate.toISOString().split('T')[0]

  const [deadline, setDeadline] = useState(formattedDate)

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const convertedValues = []

    const deadlineConverted = new Date(deadline).getTime()

    convertedValues.push(abiEncoder.encodeABIValue(title, 'String', false))
    convertedValues.push(abiEncoder.encodeABIValue(image, 'String', false))
    convertedValues.push(
      abiEncoder.encodeABIValue(description, 'String', false),
    )
    convertedValues.push(abiEncoder.encodeABIValue(token, 'String', false))
    convertedValues.push(abiEncoder.encodeBigNumber(target, false))
    convertedValues.push(
      abiEncoder.encodeABIValue(deadlineConverted, 'u64', false),
    )

    const metadata = convertedValues.join('@')

    const payload: ISmartContract = {
      address: scAddress as string,
      scType: 0,
    }

    const txData: string = Buffer.from(
      'create' + '@' + metadata,
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

      setTitle('')
      setDescription('')
      setImage('')
      setTarget(0)
      setToken('KLV')
      setDeadline(formattedDate)

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
      width="100vw"
      height="calc(100vh - 70px)"
      style={{
        background: 'linear-gradient(180deg, #9732bc 0%, #500b58 100%)',
      }}
      display="flex"
      justify="center"
      align="center"
    >
      <View
        width="400px"
        height="auto"
        borderRadius="8px"
        padding={isMobile ? '1rem' : '2rem'}
        flexDirection="column"
        background="white"
      >
        <View width="100%" marginBottom="30px">
          <Text fontWeight={700} color={colors.primary} fontSize={24}>
            Create your own Crowdfunding
          </Text>
        </View>

        <form onSubmit={e => handleCreate(e)}>
          <View
            display="flex"
            flexDirection="column"
            align="start"
            justify="center"
            width="100%"
          >
            <Text color={colors.primary} fontSize={14}>
              Title
            </Text>
            <Input
              width="100%"
              height="45px"
              required
              padding="5px"
              color={colors.black}
              border={`2px solid ${colors.primary}`}
              borderRadius="4px"
              margin="2px 0px 0px 0px"
              fontSize="16px"
              onChange={e => setTitle(e.target.value)}
              value={title}
              mask=""
              type="text"
            />
          </View>

          <View
            display="flex"
            flexDirection="column"
            align="start"
            justify="center"
            width="100%"
            marginTop="5px"
          >
            <Text color={colors.primary} fontSize={14}>
              Description
            </Text>
            <textarea
              style={{
                width: '100%',
                height: '90px',
                resize: 'none',
                padding: '5px',
                border: `2px solid ${colors.primary}`,
                borderRadius: '4px',
                margin: '2px 0px 0px 0px',
                fontSize: '16px',
              }}
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </View>

          <View
            display="flex"
            flexDirection="column"
            align="start"
            justify="center"
            width="100%"
            marginTop="5px"
          >
            <Text color={colors.primary} fontSize={14}>
              Image URL
            </Text>
            <Input
              required
              width="100%"
              height="45px"
              padding="5px"
              color={colors.black}
              border={`2px solid ${colors.primary}`}
              borderRadius="4px"
              margin="2px 0px 0px 0px"
              fontSize="16px"
              onChange={e => setImage(e.target.value)}
              value={image}
              mask=""
              type="text"
            />
          </View>

          <View
            display="flex"
            flexDirection="column"
            align="start"
            justify="center"
            marginTop="5px"
            width="100%"
          >
            <Text color={colors.primary} fontSize={14}>
              Target
            </Text>
            <Input
              width="100%"
              required
              height="45px"
              padding="5px"
              color={colors.black}
              border={`2px solid ${colors.primary}`}
              borderRadius="4px"
              margin="2px 0px 0px 0px"
              fontSize="16px"
              onChange={e => setTarget(Number(e.target.value))}
              value={target}
              mask=""
              type="number"
            />
          </View>

          <View
            display="flex"
            flexDirection="column"
            align="start"
            marginTop="5px"
            justify="center"
            width="100%"
          >
            <Text color={colors.primary} fontSize={14}>
              Token
            </Text>
            <Input
              width="100%"
              height="45px"
              padding="5px"
              color={colors.black}
              border={`2px solid ${colors.primary}`}
              borderRadius="4px"
              required
              margin="2px 0px 0px 0px"
              fontSize="16px"
              onChange={e => setToken(e.target.value)}
              value={token}
              mask=""
              type="text"
            />
          </View>

          <View
            display="flex"
            flexDirection="column"
            align="start"
            marginTop="5px"
            justify="center"
            width="100%"
          >
            <Text color={colors.primary} fontSize={14}>
              Deadline
            </Text>
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
          </View>

          <Button
            width="100%"
            height="40px"
            margin="20px 0px 0px 0px"
            borderRadius="8px"
            background={colors.primary}
            border="none"
          >
            Create
          </Button>
        </form>
      </View>
    </View>
  )
}
