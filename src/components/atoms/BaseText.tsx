import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../styles/colors"

interface Props {
  text: string
  color?: string
  size?: string
  optionStyles?: string
}

const baseStyle = (color: string, size: string) => css`
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
  color: ${color};
  font-size: ${size};
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
  textCenter: css`
    text-align: center;
  `,
  underbar: css`
    border-bottom: 1px solid ${Colors.offWhite};
    padding-bottom: 20px;
  `,
}

const BaseText: FC<Props> = (props) => {
  const styles =
    props.optionStyles &&
    props.optionStyles.split(" ").map((name) => {
      if (optionalStyles[name]) return optionalStyles[name]
    })

  return <p css={[baseStyle(props.color, props.size), styles]}>{props.text}</p>
}

export default BaseText
