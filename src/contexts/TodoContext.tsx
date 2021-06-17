import { ReactNode, createContext, useContext, useState } from "react"
import { getAxiosInstance } from "../modules/request"
import { ITodo } from "../types/Todo"

type TodoContextType = {
  todos: ITodo[]
  setTodosState: (todos: ITodo[]) => void
  changeTodoActive: (id: number) => void
  createTodo: (title: string) => void
  updateTodo: (todo: ITodo) => void
}

const todoContextDefaultValues: TodoContextType = {
  todos: null,
  setTodosState: () => [],
  changeTodoActive: () => [],
  createTodo: () => [],
  updateTodo: () => [],
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

  // update target todo active
  const changeTodoActive = (id: number) => {
    const targetTodo = todos.find((todo) => todo.id == id)
    targetTodo.isDone = true
    updateTodo(targetTodo)
  }

  // create todo data
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

  const updateTodo = async (todo: ITodo) => {
    console.log(todo)
    try {
      const res = await axios.put(`/api/updTodo/${todo.id}`, {
        id: todo.id,
        title: todo.title,
        isDone: todo.isDone,
        status: todo.status,
        schedule: todo.schedule,
      })
      if (res.status == 200) {
        console.log("ok")
      }
    } catch (e) {
      console.error(e)
    }
  }

  const value = {
    todos,
    setTodosState,
    changeTodoActive,
    createTodo,
    updateTodo,
  }

  return (
    <>
      <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    </>
  )
}
