import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../styles/colors"

type Props = {
  placeholder?: string
  onChangeText: (text: string) => void
}

const inputStyle = css`
  background-color: ${Colors.darkBlueGray};
  width: 75%;
  padding: 20px;
  border: none;
  border-radius: 15px;
  outline: 0;
  color: ${Colors.white};

  &::placeholder {
    color: ${Colors.offWhite};
  }
`

const BaseTextArea: FC<Props> = (props) => {
  return (
    <textarea
      css={inputStyle}
      placeholder={props.placeholder}
      onChange={(e) => props.onChangeText(e.target.value)}
    />
  )
}

export default BaseTextArea
