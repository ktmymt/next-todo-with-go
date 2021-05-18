import { FC } from "react"
import { css } from "@emotion/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { Colors } from "../../../styles/colors"

// components
import { BaseText } from "../../atoms"

// types
import { ITodo } from "../../../types/Todo"
interface Props {
  todo: ITodo
}

// styles
const todoContainer = css`
  display: flex;
`

const checkIconStyle: React.CSSProperties = {
  padding: 10,
  fontSize: 30,
  color: Colors.lightGreen,
}

const circleIconStyle: React.CSSProperties = {
  padding: 10,
  fontSize: 30,
  color: Colors.veryLightGray,
}

const Todo: FC<Props> = (props) => {
  return (
    <div css={todoContainer}>
      <FontAwesomeIcon icon={faCheckCircle} style={checkIconStyle} />
      <FontAwesomeIcon icon={faCircle} style={circleIconStyle} />
      <BaseText text={props.todo.title} styles="" />
    </div>
  )
}

export default Todo
