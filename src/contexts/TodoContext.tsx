import { ReactNode, createContext, useContext, useState } from "react"
import { getAxiosInstance } from "../modules/request"
import { ITodo, TODO_STATUS } from "../types/Todo"

type TodoContextType = {
  todos: ITodo[]
  setTodosState: (todos: ITodo[]) => void
  changeTodoActive: (id: string) => void
  createTodo: (title: string, projectId: number, scheduleId: number) => void
  updateTodo: (todo: ITodo) => void
  deleteTodo: (id: string) => void
}

const todoContextDefaultValues: TodoContextType = {
  todos: null,
  setTodosState: () => [],
  changeTodoActive: () => [],
  createTodo: () => [],
  updateTodo: () => [],
  deleteTodo: () => [],
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
  const changeTodoActive = (id: string) => {
    const targetTodo = todos.find((todo) => todo.id == id)
    targetTodo.isDone = true
    updateTodo(targetTodo)
  }

  // create todo data
  const createTodo = async (title: string, projectId: number, scheduleId: number) => {
    const status = scheduleId == 0 ? TODO_STATUS.PENDING : TODO_STATUS.WAITING
    const res = await axios.post("/api/todo", {
      projectId: projectId,
      title: title,
      isDone: false,
      status: status,
      schedule: scheduleId,
    })
    const newTodo = await res.data
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo.data]
      return updatedTodos
    })
  }

  const updateTodo = async (todo: ITodo) => {
    try {
      const res = await axios.put(`/api/updTodo/${todo.id}`, {
        id: todo.id,
        projectId: todo.projectId,
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

  const deleteTodo = async (id: string) => {
    try {
      const res = await axios.delete(`/api/delTodo/${id}`)
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }

  const value = {
    todos,
    setTodosState,
    changeTodoActive,
    createTodo,
    updateTodo,
    deleteTodo,
  }

  return (
    <>
      <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    </>
  )
}
