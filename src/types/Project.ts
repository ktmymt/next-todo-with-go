import { ITodo } from "./Todo"
export interface IProject {
  id: string
  name: string
  description: string
  todos: ITodo[]
  color: string
  users: { username: string; email: string; image: string }[]
  updatedAt: Date
}
