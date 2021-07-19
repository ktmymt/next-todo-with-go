import { ReactNode, createContext, useContext, useState } from "react"
import { getAxiosInstance } from "../modules/request"
import { ITodo, TODO_STATUS } from "../types/Todo"

type TodoContextType = {
  todos: ITodo[]
  setTodosState: (todos: ITodo[]) => void
  refreshTodos: (projectId: string) => void
  createTodo: (title: string, projectId: string, scheduleId: number) => void
  updateTodo: (todo: ITodo) => void
  changeTodoActive: (id: string) => void
  changeTodoStatus: (id: string, newStatus: string) => void
  deleteTodo: (id: string, projectId: string) => void
}

const todoContextDefaultValues: TodoContextType = {
  todos: null,
  setTodosState: () => [],
  refreshTodos: () => [],
  createTodo: () => [],
  updateTodo: () => [],
  changeTodoActive: () => [],
  changeTodoStatus: () => [],
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
    if (!todos) {
      setTodos([])
    } else {
      const activeTodos = todos.filter((todo) => {
        return todo.isDone == false
      })
      setTodos(activeTodos)
    }
  }

  // get todos belonging to project
  const refreshTodos = async (projectId: string) => {
    try {
      const res = await axios.get(`/api/todos/${projectId}`)
      if (res.status == 200) {
        setTodosState(res.data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // create todo data
  const createTodo = async (title: string, projectId: string, scheduleId: number) => {
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

  // pass todo data, and update
  const updateTodo = async (todo: ITodo) => {
    try {
      const res = await axios.put(`/api/updTodo/`, todo)
      if (res.status == 200) {
        refreshTodos(todo.projectId)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // update target todo active
  const changeTodoActive = (id: string) => {
    const targetTodo = todos.find((todo) => todo.id == id)
    targetTodo.isDone = true
    updateTodo(targetTodo)
  }

  // update target todo status
  const changeTodoStatus = (id: string, newStatus: string) => {
    const targetTodo = todos.find((todo) => todo.id == id)
    targetTodo.status = newStatus
    const newSchedule = newStatus == TODO_STATUS.WAITING ? 1 : 0
    targetTodo.schedule = newSchedule
    updateTodo(targetTodo)
  }

  // pass todo id, and delete
  const deleteTodo = async (id: string, projectId: string) => {
    try {
      const res = await axios.delete(`/api/delTodo/`, { data: { id: id } })
      if (res.status == 200) {
        refreshTodos(projectId)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const value = {
    todos,
    setTodosState,
    refreshTodos,
    createTodo,
    updateTodo,
    changeTodoActive,
    changeTodoStatus,
    deleteTodo,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
