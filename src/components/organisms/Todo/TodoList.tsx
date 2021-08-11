import { FC, useState } from "react"
import { BaseText, BaseInput } from "../../atoms"
import { css } from "@emotion/react"
import Todo from "./Todo"
import { ITodo, TODO_STATUS } from "../../../types/Todo"
import { useTodoContext } from "../../../contexts/TodoContext"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { useUserContext } from "../../../contexts/UserContext"

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
  const { selectedProject, refreshProjects } = useProjectContext()
  const { user } = useUserContext()
  const [todoTitle, setTodoTitle] = useState("")

  const onChangeText = (text: string) => {
    setTodoTitle(text)
  }

  const onPressEnter = (key: string) => {
    if (key == "Enter") {
      if (todoTitle == "") return
      const schedule = props.title == "Today" ? 0 : 1
      createTodo(todoTitle, selectedProject.id, schedule)
      refreshProjects(user.id)
      setTodoTitle("")
    }
  }

  return (
    <div css={todoListContainerStyle}>
      <BaseText text={props.title} size="1.4rem" optionStyles="underbar" />
      <ul css={todoListStyle}>
        {todos &&
          todos.map((todo: ITodo, index) => {
            if (props.title == "Today" && todo.status != TODO_STATUS.WAITING) {
              return (
                <li key={index}>
                  <Todo todo={todo} />
                </li>
              )
            }

            if (props.title == "Upcoming" && todo.status == TODO_STATUS.WAITING) {
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
        placeholder={props.title == "Today" ? "What comes to your mind?" : "Write something"}
        value={todoTitle}
        hasLabel={true}
        onChangeText={onChangeText}
        onPressEnter={onPressEnter}
      />
    </div>
  )
}

export default TodoList
