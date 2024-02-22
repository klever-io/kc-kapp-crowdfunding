import React from 'react'
import styled, { css } from 'styled-components'
import { colors } from '@/styles/global'

export interface IButton {
  background?: string
  color?: string
  width?: string
  height?: string
  onClick?(): void
  children: React.ReactNode
  padding?: string
  border?: any
  borderRadius?: string
  boxShadow?: string
  fontSize?: string
  margin?: string
  fontWeight?: string
  disabled?: boolean
  opacity?: number
  brightness?: boolean
  hover?: boolean
}

const Button: React.FC<IButton> = ({
  onClick,
  children,
  background = colors.black,
  color = colors.white,
  width,
  margin,
  height,
  padding,
  border = `2px solid ${colors.black}`,
  borderRadius,
  boxShadow,
  hover,
  fontSize,
  fontWeight,
  disabled,
  opacity,
  brightness,
}) => {
  return (
    <Container
      padding={padding}
      width={width}
      height={height}
      background={background}
      color={color}
      hover={hover}
      margin={margin || '0px'}
      border={border}
      onClick={onClick}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      fontSize={fontSize}
      fontWeight={fontWeight}
      disabled={disabled}
      opacity={opacity}
      brightness={brightness}
    >
      {children}
    </Container>
  )
}

export const Container = styled.button<IButton>`
  width: ${props => props.width || ''};
  height: ${props => props.height || ''};
  padding: ${props => props.padding || '0'};

  ${props =>
    props.disabled
      ? css``
      : css`
          &:hover {
            opacity: ${props.hover ? '0.9' : '1'};
            transform: ${props.hover ? 'translateY(-0.4px)' : ''};
            transition: all 0.2s;
          }
        `};

  background-color: ${props => props.background || props.theme.secondary};

  border-radius: ${props => props.borderRadius || '0.85rem'};
  ${props =>
    props.border &&
    css`
      border: ${props.border};
    `};

  opacity: ${props => props.opacity || '1'};

  margin: ${props => props.margin};

  color: ${props => props.color || colors.white};
  font-weight: ${props => props.fontWeight || 'bold'};
  font-size: ${props => props.fontSize || ' 0.9rem'};
  letter-spacing: 0.02rem;

  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  filter: brightness(
    ${props => (props.disabled ? (!props.brightness ? 1 : 0.5) : 1)}
  );

  box-shadow: ${props =>
    props.boxShadow || '3px 10px 40px -3px rgba(0, 0, 0, 0.4)'};
`

export default Button
