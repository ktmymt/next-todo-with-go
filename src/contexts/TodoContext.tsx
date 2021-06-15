import { ReactNode, createContext, useContext, useState } from "react"
import { getAxiosInstance } from "../modules/request"
import { ITodo } from "../types/Todo"

type TodoContextType = {
  todos: ITodo[]
}

const todoContextDefaultValues: TodoContextType = {
  todos: null,
}

const TodoContext = createContext<TodoContextType>(todoContextDefaultValues)

export const useTodoContext = () => {
  return useContext(TodoContext)
}

type Props = {
  children: ReactNode
}

export const TodoProvider = ({ children }: Props) => {
  const axios = getAxiosInstance()

  const [todos, setTodos] = useState<ITodo[]>([])

  // set projects state that is used in some components
  const setTodosState = (todos: ITodo[]) => {
    setTodos(todos)
  }

  const value = {
    todos,
  }

  return (
    <>
      <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    </>
  )
}
