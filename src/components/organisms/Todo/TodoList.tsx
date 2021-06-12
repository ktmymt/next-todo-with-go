import { FC, useState } from "react"
import { BaseText, BaseInput } from "../../atoms"
import { css } from "@emotion/react"
import Todo from "./Todo"
import { ITodo } from "../../../types/Todo"
import axios from "axios"

interface Props {
  title: string
  todos: ITodo[]
}

const todoListContainerStyle = css`
  margin-top: 70px;
`

const todoListStyle = css`
  list-style: none;
  padding: 0;
`

const TodoList: FC<Props> = (props) => {
  const [todoTitle, setTodoTitle] = useState("")
  const onChangeText = (text: string) => {
    setTodoTitle(text)
  }

  const onPressEnter = (key: string) => {
    if (key == "Enter") {
      axios
        .post("/api/todo", {
          title: "三郎",
          lastName: "田中",
        })
        .then(function (response) {
          console.log(response.data)
        })
    }
  }

  return (
    <div css={todoListContainerStyle}>
      <BaseText text={props.title} size="1.4rem" optionStyles="underbar" />
      <BaseInput
        type="text"
        placeholder="What comes to your mind?"
        hasLabel={true}
        onChangeText={onChangeText}
        onPressEnter={onPressEnter}
      />
      <ul css={todoListStyle}>
        {Object.values(props.todos).map((todo: ITodo, index) => {
          return (
            <li key={index}>
              <Todo todo={todo} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TodoList
