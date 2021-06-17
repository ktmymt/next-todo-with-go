import { FC, useState } from "react"
import { BaseText, BaseInput } from "../../atoms"
import { css } from "@emotion/react"
import Todo from "./Todo"
import { ITodo } from "../../../types/Todo"
import { useTodoContext } from "../../../contexts/TodoContext"
import { Colors } from "../../../styles/colors"

interface Props {
  title: string
}

const todoListContainerStyle = css`
  margin-top: 70px;
`

const todoListStyle = css`
  list-style: none;
  padding: 0;
`

const TodoList: FC<Props> = (props) => {
  const { createTodo, todos } = useTodoContext()
  const [todoTitle, setTodoTitle] = useState("")

  const onChangeText = (text: string) => {
    setTodoTitle(text)
  }

  const onPressEnter = (key: string) => {
    if (key == "Enter") {
      createTodo(todoTitle)
    }
  }

  return (
    <div css={todoListContainerStyle}>
      <BaseText text={props.title} size="1.4rem" optionStyles="underbar" />
      <ul css={todoListStyle}>
        {todos &&
          Object.values(todos).map((todo: ITodo, index) => {
            if (props.title == "Today" && todo.schedule == 0) {
              return (
                <li key={index}>
                  <Todo todo={todo} />
                </li>
              )
            }

            if (props.title == "Upcoming" && todo.schedule == 1) {
              return (
                <li key={index}>
                  <Todo todo={todo} />
                </li>
              )
            }
          })}
      </ul>
      <BaseInput
        type="text"
        placeholder={props.title == "Today" ? "Write something" : "What comes to your mind?"}
        hasLabel={true}
        onChangeText={onChangeText}
        onPressEnter={onPressEnter}
      />
    </div>
  )
}

export default TodoList
