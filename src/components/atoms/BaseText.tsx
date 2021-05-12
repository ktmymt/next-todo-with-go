import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../styles/colors"

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
    font-size: 2.8rem;
  `,
  sizeM: css`
    font-size: 1.8rem;
  `,
  sizeS: css`
    font-size: 1rem;
  `,
  white: css`
    color: ${Colors.white};
  `,
  veryLightGray: css`
    color: ${Colors.veryLightGray};
  `,
  lightGray: css`
    color: ${Colors.lightGray};
  `,
  darkGray: css`
    color: ${Colors.darkGray};
  `,
  textCenter: css`
    text-align: center;
  `,
  underbar: css`
    border-bottom: 1px solid;
    padding-bottom: 20px;
  `,
}

const BaseText: FC<Props> = (props) => {
  const styles = props.styles.split(" ").map((name) => {
    if (optionalStyles[name]) return optionalStyles[name]
  })

  return <p css={[baseStyle, styles]}>{props.text}</p>
}

export default BaseText
