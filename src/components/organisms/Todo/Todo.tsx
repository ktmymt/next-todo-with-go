import { FC, useState } from "react"
import { css } from "@emotion/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { Colors } from "../../../styles/colors"

// components
import { BaseButton, BaseText } from "../../atoms"

// types
import { ITodo } from "../../../types/Todo"
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
  margin: 0 auto;
`

const iconStyle = (isDone: boolean) => css`
  padding: 10px;
  font-size: 1.8rem;
  margin-right: 20px;
  color: ${isDone ? Colors.lightGreen : Colors.veryLightGray};
`

const Todo: FC<Props> = (props) => {
  const { createTodo, todos, changeTodoActive } = useTodoContext()
  const [isDone, setIsDone] = useState(false)

  const onClickToggleCheck = () => {
    setIsDone(!isDone)
    changeTodoActive(props.todo.id)
  }

  return (
    <div css={todoContainer}>
      <FontAwesomeIcon
        icon={isDone ? faCheckCircle : faCircle}
        css={iconStyle(isDone)}
        onClick={onClickToggleCheck}
      />
      <BaseText text={props.todo.title} size="1.2rem" color={Colors.veryDarkGray} />
      <div css={todoConfStyle}>
        <BaseText text={props.todo.status} />
        <BaseButton
          text="ゴミ"
          bgColor={Colors.lightGray}
          onClickButton={() => console.log("click")}
        />
      </div>
    </div>
  )
}

export default Todo
