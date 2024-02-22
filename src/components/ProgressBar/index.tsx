import { View, colors, Text } from '@/styles/global'

interface IProgressBar {
  percentage: number
}

const ProgressBar = ({ percentage }: IProgressBar) => {
  return (
    <>
      <View width="100%" display="flex" align="center" justify="start">
        <View
          width="92%"
          height="15px"
          borderRadius="20px"
          background={colors.lightGray1}
          display="flex"
          align="center"
          justify="start"
          padding="3px"
        >
          <View
            width={`${percentage > 100 ? 100 : percentage}%`}
            height="100%"
            borderRadius="20px"
            background={colors.primary}
          />
        </View>

        <View width="8%" marginLeft="8px" justify="end">
          <Text fontWeight={700}> {percentage} % </Text>
        </View>
      </View>
    </>
  )
}

export default ProgressBar
