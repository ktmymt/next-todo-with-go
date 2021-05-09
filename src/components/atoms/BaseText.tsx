import { FC } from "react"
import { css } from "@emotion/react"

type Props = {
  text: string
  styles: string
}

const baseStyle = css`
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
`

const optionalStyles = {
  bold: css`
    font-weight: bold;
  `,
  sizeL: css`
    font-size: 2.4rem;
  `,
  sizeM: css`
    font-size: 1.8rem;
  `,
  sizeS: css`
    font-size: 1rem;
  `,
  white: css`
    color: #fff;
  `,
  lightGray: css`
    color: #696c7b;
  `,
  darkGray: css`
    color: #24273e;
  `,
}

const BaseText: FC<Props> = (props) => {
  const styles = props.styles.split(" ").map((name) => {
    if (optionalStyles[name]) return optionalStyles[name]
  })

  return <p css={[baseStyle, styles]}>{props.text}</p>
}

export default BaseText
