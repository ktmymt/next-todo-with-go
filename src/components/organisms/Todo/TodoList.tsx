import { FC } from "react"
import BaseText from "../../atoms/BaseText"
import { css } from "@emotion/react"

import Todo from "./Todo"

type Props = {
  title: string
  todos: Todo[]
}

const todoListContainerStyle = css`
  margin-top: 70px;
`

const TodoList: FC<Props> = (props) => {
  return (
    <div css={todoListContainerStyle}>
      <BaseText text={props.title} styles="sizeM underbar" />
      <ul>
        {Object.values(props.todos).map((todo: Todo, index) => {
          return (
            <li key={index}>
              <Todo title={todo.title} isDone={todo.isDone} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TodoList
