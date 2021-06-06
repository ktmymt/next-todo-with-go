import { FC } from "react"
import BaseText from "../../atoms/BaseText"
import { css } from "@emotion/react"

import Todo from "./Todo"
import { ITodo } from "../../../types/Todo"

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
  return (
    <div css={todoListContainerStyle}>
      <BaseText text={props.title} size="1.4rem" optionStyles="underbar" />
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
