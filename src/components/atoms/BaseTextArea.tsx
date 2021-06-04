import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../styles/colors"

type Props = {
  placeholder?: string
  onChangeText: (text: string) => void
}

const inputStyle = css`
  background-color: ${Colors.veryDarkGray};
  width: 80%;
  height: 100px;
  padding: 20px;
  border: none;
  outline: 0;
  color: ${Colors.white};

  &::placeholder {
    color: ${Colors.lightGray};
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
