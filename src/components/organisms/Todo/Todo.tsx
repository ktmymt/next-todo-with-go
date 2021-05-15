import { FC, useState } from "react"

// components
import { BaseText } from "../../atoms"

// types
import { ITodo } from "../../../types/Todo"
interface Props {
  todo: ITodo
}

const Todo: FC<Props> = (props) => {
  return (
    <div>
      <BaseText text={props.todo.title} styles="" />
    </div>
  )
}

export default Todo
