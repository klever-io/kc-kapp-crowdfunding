import { View, colors } from '@/styles/global'
import { formatAddress } from '@/utils/formatter'
import Link from 'next/link'

interface IAddressGrid {
  addrs: string[]
}

const AddressGrid = ({ addrs }: IAddressGrid) => {
  return (
    <View display="flex" cursor="pointer" flexDirection="row" flexWrap="wrap">
      <>
        {addrs.map(addr => (
          <>
            <Link key={addr} href={`/crowdfundings/${addr}`}>
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
                {formatAddress(addr)}
              </View>
            </Link>
          </>
        ))}
      </>
    </View>
  )
}

export default AddressGrid
