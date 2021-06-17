import { ReactNode, createContext, useContext, useState } from "react"
import { getAxiosInstance } from "../modules/request"
import { ITodo } from "../types/Todo"

type TodoContextType = {
  todos: ITodo[]
  setTodosState: (todos: ITodo[]) => void
  changeTodoActive: (id: number) => void
  createTodo: (title: string) => void
}

const todoContextDefaultValues: TodoContextType = {
  todos: null,
  setTodosState: () => [],
  changeTodoActive: () => [],
  createTodo: () => [],
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
    const activeTodos = todos.filter((todo) => {
      return todo.isDone == false
    })
    setTodos(activeTodos)
  }

  const changeTodoActive = (id: number) => {
    const targetTodo = todos.find((todo) => todo.id == id)
    targetTodo.isDone = true
  }

  const createTodo = (title: string) => {
    console.log("create", title)
    // const res = await axios.post("/api/todo", {
    //   name: name,
    //   description: description,
    //   todo: [],
    //   color: color,
    //   // updatedAt: Date.now(),
    // })
  }

  const value = {
    todos,
    setTodosState,
    changeTodoActive,
    createTodo,
  }

  return (
    <>
      <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    </>
  )
}
