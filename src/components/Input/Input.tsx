import { View, Text } from '@/styles/global'
import React from 'react'
import styled from 'styled-components'

interface InputProps {
  width: string
  height: string
  borderRadius: string
  border: string
  fontSize: string
  padding?: string
  color?: string
  mask?: string
  margin?: string
  required?: boolean
  value: string | number
  type: string
  icon?: React.ReactNode
  min?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  width,
  height,
  onChange,
  borderRadius,
  border,
  color,
  value,
  fontSize,
  mask,
  margin,
  padding,
  required,
  icon,
  type,
  min,
}) => {
  const formatNumber = (number: number) => {
    const numString = number.toString()

    const [integerPart, decimalPart] = numString.split('.')

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    const formattedNumber = decimalPart
      ? `${formattedInteger},${decimalPart}`
      : formattedInteger

    return formattedNumber
  }

  const formatMask = (value: string) => {
    let parsed = mask || ''

    if (parsed === '') {
      return value
    }

    if (parsed === '{number}') {
      return formatNumber(Number(value))
    }

    return parsed.replace('{value}', value)
  }
  return (
    <View
      width={width}
      height={height}
      borderRadius={borderRadius}
      align="center"
      border={border}
      margin={margin || '0px'}
      padding={padding || '0px'}
    >
      {icon}
      <StyledInput
        min={min}
        type={type}
        color={color || 'black'}
        value={formatMask(value.toString())}
        onChange={onChange}
        required={required}
        fontSize={fontSize}
      />
    </View>
  )
}

interface StyledInputProps {
  fontSize: string
}

const StyledInput = styled.input<StyledInputProps>`
  border: none;
  background-color: transparent;
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color};
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 3px;
`

export default Input
