import CardCrowdfunding from '@/components/CardCrowdfunding'
import { useMobile } from '@/contexts/useMobile'
import { View, colors, Text } from '@/styles/global'
import { abi } from '@/utils/abi'
import {
  convertCrowdfundingsJSON,
  convertDTOCrowdfunding,
} from '@/utils/converter'
import { formatAddress } from '@/utils/formatter'
import { abiDecoder, abiEncoder } from '@klever/sdk-web'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL
const scAddress = process.env.NEXT_PUBLIC_SC_ADDRESS
const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL

type Props = {
  address: string
  crowdfundings: DTOCrowdfunding[]
}

export default function Crowdfundings({ crowdfundings, address }: Props) {
  const { isMobile } = useMobile()

  return (
    <View
      width="100%"
      height="100%"
      padding={isMobile ? '1rem' : '2rem'}
      display="flex"
      justify="center"
      align="center"
      flexDirection="column"
    >
      <>
        {address && (
          <>
            <View width="100%" marginBottom="30px" flexDirection="column">
              <Text fontWeight={700} color={colors.black} fontSize={36}>
                {formatAddress(address)}
              </Text>
              <Text fontWeight={700} color={colors.black} fontSize={24}>
                {`Empower the Future: Help Funding!!`}
              </Text>
            </View>

            <View width="100%" flexWrap="wrap">
              {crowdfundings.map(crowdfunding => (
                <>
                  <View marginLeft="10px" marginBottom="10px">
                    <Link href={`/crowdfunding/${crowdfunding.id}`}>
                      <CardCrowdfunding
                        crowdfunding={convertDTOCrowdfunding(crowdfunding)}
                      />
                    </Link>
                  </View>
                </>
              ))}
            </View>
          </>
        )}
      </>
    </View>
  )
}

export const getServerSideProps = (async context => {
  const address = context.params?.address
  const convertedAddress = abiEncoder.encodeABIValue(address, 'Address')

  const respose = await fetch(`${nodeUrl}/vm/hex`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      scAddress: scAddress,
      funcName: 'getCrowdfundingsByHolder',
      args: [convertedAddress],
    }),
  })

  const respJson = await respose.json()

  if (respJson.error !== '' || respJson.data.data === '') {
    return {
      props: {
        crowdfundings: [],
        address: address as string,
      },
    }
  }

  const decodedCrowdfundings = abiDecoder.decodeList(
    respJson.data.data,
    'List<CrowdfundingData>',
    abi,
  )

  let parsed = convertCrowdfundingsJSON(decodedCrowdfundings)

  return {
    props: {
      crowdfundings: parsed,
      address: address as string,
    },
  }
}) satisfies GetServerSideProps<Props>
