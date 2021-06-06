import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../styles/colors"

interface Props {
  text: string
  bgColor: string
  textColor?: string
  onClickButton: () => void
}

const buttonStyle = (bgColor: string, textColor?: string) => css`
  background-color: ${bgColor};
  color: ${textColor};
  padding: 10px;
  margin: 0;
  box-shadow: 1px 1px 8px ${Colors.darkBlueGray};
  border: none;
`

const BaseButton: FC<Props> = (props) => {
  return (
    <button css={buttonStyle(props.bgColor, props.textColor)} onClick={props.onClickButton}>
      {props.text}
    </button>
  )
}

export default BaseButton
