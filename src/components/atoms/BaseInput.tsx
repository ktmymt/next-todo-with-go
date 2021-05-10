import { FC } from "react"
import { css } from "@emotion/react"

type Props = {
  className: string
  placeholder?: string
}

const inputStyle = css`
  background-color: #3d3f53;
  width: 75%;
  padding: 20px;
  border: none;
  border-radius: 15px;
  outline: 0;
  color: white;

  &::placeholder {
    color: #caccd1;
  }
`

const BaseInput: FC<Props> = (props) => {
  return <input css={inputStyle} className={props.className} placeholder={props.placeholder} />
}

export default BaseInput
