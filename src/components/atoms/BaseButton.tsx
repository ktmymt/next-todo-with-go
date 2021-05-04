import { FC } from "react"

type Props = {
  text: string
  className: string
}

const BaseButton: FC<Props> = (props) => {
  return <button className={props.className}>{props.text}</button>
}

export default BaseButton
