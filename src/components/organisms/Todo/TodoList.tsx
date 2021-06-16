import { FC, useEffect, useState } from "react"
import { BaseText, BaseInput } from "../../atoms"
import { css } from "@emotion/react"
import Todo from "./Todo"
import { ITodo } from "../../../types/Todo"
import { useTodoContext } from "../../../contexts/TodoContext"
import { useProjectContext } from "../../../contexts/ProjectContext"

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
  const { selectedProject } = useProjectContext()
  const { createTodo } = useTodoContext()
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
        {selectedProject &&
          selectedProject.todos &&
          Object.values(selectedProject.todos).map((todo: ITodo, index) => {
            return (
              <li key={index}>
                <Todo todo={todo} />
              </li>
            )
          })}
      </ul>
      <BaseInput
        type="text"
        placeholder="What comes to your mind?"
        hasLabel={true}
        onChangeText={onChangeText}
        onPressEnter={onPressEnter}
      />
    </div>
  )
}

export default TodoList
