import { FC, useState } from "react"
import { css } from "@emotion/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Colors } from "../../../styles/colors"

// components
import { BaseText } from "../../atoms"

// types
import { ITodo, TODO_STATUS } from "../../../types/Todo"
import { useTodoContext } from "../../../contexts/TodoContext"
interface Props {
  todo: ITodo
}

// styles
const todoContainer = css`
  display: flex;
  line-height: 2.2;
`

const todoConfStyle = css`
  display: flex;
  margin-left: auto;
`

const checkIconStyle = (isDone: boolean) => css`
  padding: 10px;
  font-size: 1.8rem;
  margin-right: 20px;
  color: ${isDone ? Colors.lightGreen : Colors.veryLightGray};
`
const trashIconStyle = css`
  margin-left: 30px;
  margin-top: 15px;
  font-size: 1.1rem;
`

const statusLabelStyle = (colors) => css`
  background-color: ${colors.background};
  color: ${colors.text};
  padding: 1px 20px 1px 20px;
  margin-top: 10px;
  width: 100%;
  height: 0;
  border-radius: 20px;
  display: inline-table;
  text-align: center;
  font-size: 0.9rem;
`

const Todo: FC<Props> = (props) => {
  const { todos, setTodosState, changeTodoActive } = useTodoContext()
  const [isDone, setIsDone] = useState(false)

  const onClickToggleCheck = () => {
    setIsDone(!isDone)
    changeTodoActive(props.todo.id)
    setTodosState(todos)
  }

  const getTodoStatusColor = (status: string): { background: string; text: string } => {
    if (status == TODO_STATUS.APPROVED) {
      return Colors.todoStatus.approved
    }
    if (status == TODO_STATUS.IN_PROGRESS) {
      return Colors.todoStatus.inProgress
    }
    if (status == TODO_STATUS.WAITING) {
      return Colors.todoStatus.waiting
    }
  }

  return (
    <div css={todoContainer}>
      <FontAwesomeIcon
        icon={isDone ? faCheckCircle : faCircle}
        css={checkIconStyle(isDone)}
        onClick={onClickToggleCheck}
      />
      <BaseText text={props.todo.title} size="1.2rem" color={Colors.veryDarkGray} />
      <div css={todoConfStyle}>
        <span css={statusLabelStyle(getTodoStatusColor(props.todo.status))}>
          {props.todo.status}
        </span>
        <FontAwesomeIcon icon={faTrash} css={trashIconStyle} />
      </div>
    </div>
  )
}

export default Todo
