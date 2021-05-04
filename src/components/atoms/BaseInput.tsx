import { FC } from "react"

type Props = {
  text: string
  className: string
}

const BaseInput: FC<Props> = (props) => {
  return <input className={props.className} />
}

export default BaseInput
