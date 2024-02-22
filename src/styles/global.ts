import styled, { createGlobalStyle, css } from 'styled-components'

export const colors = {
  primary: '#65146D',
  black: '#000',
  white: '#fff',
  gray1: '#858585',
  gray2: '#7E7E7E',
  gray3: '#7E7C7C',
  gray4: '#A4A4A4',
  gray5: '#d3d3d3',
  lightGray1: '#EDEDED',
  lightGray2: '#F9F8F8',
  lightGray3: '#F3F3F3',
  lightGray4: '#FFEDED',
  lightGray5: '#D8D8D8',
  lightGray6: '#E2E8F0',
  lightGreen: '#D0FFF1',
}

interface ViewProps {
  display?: string
  flexFlow?: string
  userSelect?: string
  zIndex?: number | string
  alignSelf?: string
  align?: string
  justify?: string
  flex?: number | string
  flexDirection?: string
  height?: string
  width?: string
  maxWidth?: string
  maxHeight?: string
  minWidth?: string
  minHeight?: string
  rowGap?: string
  columnGap?: string
  background?: string
  border?: string
  borderRight?: string
  borderLeft?: string
  borderTop?: string
  borderBottom?: string
  borderWidth?: number | string
  borderColor?: string
  borderRadius?: string
  paddingTop?: number | string
  paddingY?: number | string
  paddingX?: number | string
  padding?: number | string
  paddingRight?: number | string
  paddingLeft?: number | string
  paddingBottom?: number | string
  margin?: number | string
  marginY?: number | string
  marginX?: number | string
  marginTop?: number | string
  marginBottom?: number | string
  marginRight?: number | string
  marginLeft?: number | string
  position?: string
  top?: number | string
  bottom?: number | string
  right?: number | string
  left?: number | string
  vertical?: boolean
  opacity?: number
  flexWrap?: string
  overflow?: string
  overflowY?: string
  boxShadow?: string
  fontSize?: number | string
  fontWeight?: number | string
  color?: string
  cursor?: string
  gap?: number | string
  hiddeScroll?: boolean
  animation?: string
  media?: { maxWidth: number; styles: string }[]
}

export const View = styled.div<ViewProps>`
  ${props =>
    props.animation &&
    css`
      animation: ${props.animation};
    `};
  ${props =>
    props.display &&
    css`
      display: ${props.display};
    `};
  ${props =>
    props.flexFlow &&
    css`
      flex-flow: ${props.flexFlow};
    `};
  ${props =>
    props.userSelect &&
    css`
      user-select: ${props.userSelect};
    `};
  ${props =>
    props.zIndex &&
    css`
      z-index: ${props.zIndex};
    `};
  align-self: ${props => props.alignSelf};
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  ${props =>
    props.flex &&
    css`
      flex: ${props.flex};
    `};
  ${props =>
    props.flexDirection &&
    css`
      flex-direction: ${props.flexDirection};
    `};
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `};
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `};
  ${props =>
    props.maxWidth &&
    css`
      max-width: ${props.maxWidth};
    `};
  ${props =>
    props.maxHeight &&
    css`
      max-height: ${props.maxHeight};
    `};
  ${props =>
    props.minHeight &&
    css`
      min-height: ${props.minHeight};
    `};
  ${props =>
    props.minWidth &&
    css`
      min-width: ${props.minWidth};
    `};
  ${props =>
    props.rowGap &&
    css`
      row-gap: ${props.rowGap};
    `};
  ${props =>
    props.columnGap &&
    css`
      column-gap: ${props.columnGap};
    `};
  ${props =>
    props.background &&
    css`
      ${!props.background?.includes('/')
        ? 'background-color'
        : 'background'}: ${props.background};
    `};
  ${props =>
    props.border &&
    css`
      border: ${props.border};
    `};
  ${props =>
    props.borderRight &&
    css`
      border-right: ${props.borderRight};
    `};
  ${props =>
    props.borderLeft &&
    css`
      border-right: ${props.borderLeft};
    `};
  ${props =>
    props.borderTop &&
    css`
      border-top: ${props.borderTop};
    `};
  ${props =>
    props.borderBottom &&
    css`
      border-bottom: ${props.borderBottom};
    `};
  ${props =>
    props.borderWidth &&
    css`
      border-width: ${props.borderWidth};
    `};
  ${props =>
    props.borderColor &&
    css`
      border-color: ${props.borderColor};
    `};
  ${props =>
    props.borderRadius &&
    css`
      border-radius: ${props.borderRadius};
    `};
  ${props =>
    props.paddingTop &&
    css`
      padding-top: ${props.paddingTop};
    `};
  ${props =>
    props.paddingY &&
    css`
      padding-top: ${props.paddingY};
    `};
  ${props =>
    props.paddingY &&
    css`
      padding-bottom: ${props.paddingY};
    `};
  ${props =>
    props.paddingX &&
    css`
      padding-left: ${props.paddingX};
    `};
  ${props =>
    props.paddingX &&
    css`
      padding-right: ${props.paddingX};
    `};
  ${props =>
    props.padding &&
    css`
      padding: ${props.padding};
    `};
  ${props =>
    props.paddingRight &&
    css`
      padding-right: ${props.paddingRight};
    `};
  ${props =>
    props.paddingLeft &&
    css`
      padding-left: ${props.paddingLeft};
    `};
  ${props =>
    props.paddingBottom &&
    css`
      padding-bottom: ${props.paddingBottom};
    `};
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `};
  ${props =>
    props.marginY &&
    css`
      margin: ${props.marginY} 0;
    `};
  ${props =>
    props.marginX &&
    css`
      margin: 0 ${props.marginX};
    `};
  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `};
  ${props =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom};
    `};
  ${props =>
    props.marginRight &&
    css`
      margin-right: ${props.marginRight};
    `};
  ${props =>
    props.marginLeft &&
    css`
      margin-left: ${props.marginLeft};
    `};
  ${props =>
    props.position &&
    css`
      position: ${props.position};
    `};
  ${props =>
    props.top &&
    css`
      top: ${props.top};
    `};
  ${props =>
    props.bottom &&
    css`
      bottom: ${props.bottom};
    `};
  ${props =>
    props.right &&
    css`
      right: ${props.right};
    `};
  ${props =>
    props.left &&
    css`
      left: ${props.left};
    `};
  ${props =>
    props.vertical &&
    css`
      flex-direction: column;
    `};
  ${props =>
    props.opacity &&
    css`
      opacity: ${props.opacity};
    `};
  ${props =>
    props.flexWrap &&
    css`
      flex-wrap: ${props.flexWrap};
    `};
  ${props =>
    props.overflow &&
    css`
      overflow: ${props.overflow};
    `};
  ${props =>
    props.overflowY &&
    css`
      overflow-y: ${props.overflowY};
    `};
  ${props =>
    props.boxShadow &&
    css`
      box-shadow: ${props.boxShadow};
    `};
  ${props =>
    props.boxShadow &&
    css`
      -webkit-box-shadow: ${props.boxShadow};
    `};

  ${props =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `};
  ${props =>
    props.fontWeight &&
    css`
      font-weight: ${props.fontWeight};
    `};
  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `};
  ${props =>
    props.cursor &&
    css`
      cursor: ${props.cursor};
    `};
  ${props =>
    props.gap &&
    css`
      gap: ${props.gap};
    `};
  ${props =>
    props.overflow &&
    css`
      overflow: ${props.overflow};
    `};
  ${props =>
    props.hiddeScroll === true &&
    css`
      ::-webkit-scrollbar {
        display: none;
      }

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    `};
  ${props =>
    props.media &&
    props.media.map(
      ({ maxWidth, styles }) => css`
        @media (max-width: ${maxWidth}px) {
          ${styles}
        }
      `,
    )};
`
export const MainView = styled.div`
  height: 100%;
  width: 100%;
  align-self: end;

  @media (max-width: 1025px) {
    min-width: 100%;
  }
`

View.defaultProps = {
  display: 'flex',
}

interface TextProps {
  fontSize?: number
  fontSizeRem?: number
  fontWeight?: number | string
  fontFamily?: string
  color?: string
  letterSpacing?: number
  lineHeight?: string
  align?: string
  textTransform?: string
  paddingTop?: number | string
  paddingY?: number
  paddingX?: number | string
  padding?: number | string
  paddingRight?: number | string
  paddingLeft?: number | string
  paddingBottom?: number | string
  margin?: number | string
  marginY?: number | string
  marginX?: number | string
  marginTop?: number | string
  marginBottom?: number | string
  marginRight?: number | string
  marginLeft?: number | string
  opacity?: number
  textShadow?: string
  justify?: string
  media?: { maxWidth: number; styles: string }[]
}

export const Text = styled.span<TextProps>`
  ${props =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize}px;
    `};
  ${props =>
    props.fontSizeRem &&
    css`
      font-size: ${props.fontSizeRem}rem;
    `};
  ${props =>
    props.fontWeight &&
    css`
      font-weight: ${props.fontWeight};
    `};
  ${props =>
    props.lineHeight &&
    css`
      line-height: ${props.lineHeight};
    `};
  ${props =>
    props.fontFamily &&
    css`
      font-family: ${props.fontFamily};
    `};
  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `};
  ${props =>
    props.letterSpacing &&
    css`
      letter-spacing: ${props.letterSpacing}px;
    `};
  ${props =>
    props.align &&
    css`
      text-align: ${props.align};
    `};
  ${props =>
    props.textTransform &&
    css`
      text-transform: ${props.textTransform};
    `};

  ${props =>
    props.paddingTop &&
    css`
      padding-top: ${props.paddingTop};
    `};
  ${props =>
    props.paddingY &&
    css`
      padding: ${props.paddingY}px 0;
    `};
  ${props =>
    props.paddingX &&
    css`
      padding: 0 ${props.paddingX};
    `};
  ${props =>
    props.padding &&
    css`
      padding: ${props.padding};
    `};
  ${props =>
    props.paddingRight &&
    css`
      padding-right: ${props.paddingRight};
    `};
  ${props =>
    props.paddingLeft &&
    css`
      padding-left: ${props.paddingLeft};
    `};
  ${props =>
    props.paddingBottom &&
    css`
      padding-bottom: ${props.paddingBottom};
    `};
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `};
  ${props =>
    props.marginY &&
    css`
      margin: ${props.marginY} 0;
    `};
  ${props =>
    props.marginX &&
    css`
      margin: 0 ${props.marginX};
    `};
  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `};
  ${props =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom};
    `};
  ${props =>
    props.marginRight &&
    css`
      margin-right: ${props.marginRight};
    `};
  ${props =>
    props.marginLeft &&
    css`
      margin-left: ${props.marginLeft};
    `};
  ${props =>
    props.opacity &&
    css`
      opacity: ${props.opacity};
    `};
  ${props =>
    props.textShadow &&
    css`
      text-shadow: ${props.textShadow};
    `};
  ${props =>
    props.textShadow &&
    css`
      -webkit-text-shadow: ${props.textShadow};
    `};
  ${props =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `};
  ${props =>
    props.media &&
    props.media.map(
      ({ maxWidth, styles }) => css`
        @media (max-width: ${maxWidth}px) {
          ${styles}
        }
      `,
    )};
`

Text.defaultProps = {
  color: '#000',
}

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @keyframes transitionTop {
  from {
    opacity: 0;
    transform: translateY(1000px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

  html, body, #root, #__next {
    font-family: 'Outfit', sans-serif;
    width: 100% !important;
    height: 100% !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`
