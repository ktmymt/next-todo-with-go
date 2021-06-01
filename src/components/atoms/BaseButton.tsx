import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../styles/colors"

interface Props {
  text: string
  color: string
  onClickButton: () => void
}

const buttonStyle = (color: string) => css`
  background-color: ${color};
  padding: 10px;
  margin: 0;
  box-shadow: 1px 1px 8px ${Colors.darkBlueGray};
  border: none;
`

const BaseButton: FC<Props> = (props) => {
  return (
    <button css={buttonStyle(props.color)} onClick={props.onClickButton}>
      {props.text}
    </button>
  )
}

export default BaseButton
