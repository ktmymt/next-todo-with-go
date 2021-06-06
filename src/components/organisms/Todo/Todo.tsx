import { FC, useState } from "react"
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
  line-height: 2.2;
`

const iconStyle = (isDone: boolean) => css`
  padding: 10px;
  font-size: 1.8rem;
  margin-right: 20px;
  color: ${isDone ? Colors.lightGreen : Colors.veryLightGray};
`

const Todo: FC<Props> = (props) => {
  const [isDone, setIsDone] = useState(false)

  const onClickToggleCheck = () => {
    setIsDone(!isDone)
  }

  return (
    <div css={todoContainer}>
      <FontAwesomeIcon
        icon={isDone ? faCheckCircle : faCircle}
        css={iconStyle(isDone)}
        onClick={onClickToggleCheck}
      />
      <BaseText text={props.todo.title} />
    </div>
  )
}

export default Todo
