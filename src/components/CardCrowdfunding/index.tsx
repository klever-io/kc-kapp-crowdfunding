import { Text, View, colors } from '@/styles/global'
import Image from 'next/image'
import { formatAddress } from '@/utils/formatter'

interface ICardCrowdfunding {
  crowdfunding: Crowdfunding
}

const CardCrowdfunding = ({ crowdfunding }: ICardCrowdfunding) => {
  return (
    <View cursor="pointer" display="flex" flexDirection="column" align="start">
      <View
        borderRadius="10px"
        style={{
          backgroundImage: `url(${crowdfunding.logo})`,
          backgroundSize: 'cover',
        }}
        border={`4px solid ${colors.primary}`}
        width="400px"
        height="300px"
      ></View>

      <Text marginTop="10px" fontWeight={700} color={colors.primary}>
        {crowdfunding.title}
      </Text>
      <Text marginTop="5px">From: {formatAddress(crowdfunding.owner)}</Text>
    </View>
  )
}

export default CardCrowdfunding
