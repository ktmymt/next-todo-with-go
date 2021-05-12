import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../styles/colors"

type Props = {
  className: string
  placeholder?: string
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

const BaseInput: FC<Props> = (props) => {
  return <input css={inputStyle} className={props.className} placeholder={props.placeholder} />
}

export default BaseInput
