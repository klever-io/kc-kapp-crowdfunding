import Link from 'next/link'
import { colors, Text, View } from '@/styles/global'

interface IBarLink {
  path: string
  name: string
  mobile?: boolean
}

const BarLink = ({ path, name, mobile }: IBarLink) => {
  return (
    <Link key={path} href={path}>
      <View
        align="center"
        display="flex"
        marginLeft={mobile ? '0px' : '20px'}
        justify="center"
        gap="0.5rem"
        marginTop={mobile ? '0px' : '5px'}
        marginBottom={mobile ? '10px' : '0px'}
      >
        <Text
          fontSize={18}
          color={path == path ? colors.primary : colors.black}
          fontWeight="700"
        >
          {name}
        </Text>
      </View>
    </Link>
  )
}

export default BarLink
