import React, { useEffect, useState } from 'react'
import { Text, View, colors } from '@/styles/global'
import { useMobile } from '@/contexts/useMobile'
import CardCrowdfunding from '@/components/CardCrowdfunding'
import AddressGrid from '@/components/AddressGrid'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { abiDecoder } from '@klever/sdk-web'
import { abi } from '@/utils/abi'
import {
  convertCrowdfundingsJSON,
  convertDTOCrowdfunding,
} from '@/utils/converter'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const nodeUrl = process.env.NEXT_PUBLIC_NODE_URL
const scAddress = process.env.NEXT_PUBLIC_SC_ADDRESS

export default function Home({ crowdfundings, addresses }: Props) {
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: 'snap',
    rtl: false,
    slides: { perView: 'auto', spacing: 10 },
  })

  const { isMobile } = useMobile()

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
      <>
        <View width="100%" marginBottom="30px">
          <Text fontWeight={700} color={colors.black} fontSize={24}>
            {' '}
            Last Crowdfundings{' '}
          </Text>
        </View>
        <View ref={sliderRef} className="keen-slider" minWidth="100%">
          {crowdfundings.map(crowdfunding => (
            <>
              <View
                minWidth="400px"
                maxWidth="400px"
                className="keen-slider__slide"
                marginBottom="10px"
              >
                <Link href={`/crowdfunding/${crowdfunding.id}`}>
                  <CardCrowdfunding
                    crowdfunding={convertDTOCrowdfunding(crowdfunding)}
                  />
                </Link>
              </View>
            </>
          ))}
        </View>

        <View width="100%" marginTop="40px" marginBottom="30px">
          <Text fontWeight={700} color={colors.black} fontSize={24}>
            {' '}
            Crowdfundings Owners{' '}
          </Text>
        </View>

        <AddressGrid addrs={addresses} />
      </>
    </View>
  )
}

type Props = {
  crowdfundings: DTOCrowdfunding[]
  addresses: string[]
}

export const getServerSideProps = (async context => {
  const req = await fetch(`${nodeUrl}/vm/hex`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      scAddress: scAddress,
      funcName: 'getLastCrowdfundings',
      args: [],
    }),
  })

  const res = await req.json()

  if (res.error !== '' || res.data.data === '') {
    return {
      props: {
        crowdfundings: [],
        addresses: [],
      },
    }
  }

  const addressReq = await fetch(`${nodeUrl}/vm/hex`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      scAddress: scAddress,
      funcName: 'getCrowdfundingHolders',
      args: [],
    }),
  })

  const addressRes = await addressReq.json()

  if (addressRes.error !== '' || addressRes.data.data === '') {
    return {
      props: {
        crowdfundings: [],
        addresses: [],
      },
    }
  }

  const decodedAddresses = abiDecoder.decodeList(
    addressRes.data.data,
    'List<Address>',
    abi,
  )

  const decodedCrowdfundings = abiDecoder.decodeList(
    res.data.data,
    'List<CrowdfundingData>',
    abi,
  )

  let parsed = convertCrowdfundingsJSON(decodedCrowdfundings)

  return {
    props: {
      crowdfundings: parsed,
      addresses: decodedAddresses,
    },
  }
}) satisfies GetServerSideProps<Props>
