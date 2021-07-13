import { ITodo } from "./Todo"
export interface IProject {
  id: string
  name: string
  description: string
  todos: ITodo[]
  color: string
  userEmail: string[]
  userImage: string[]
  updatedAt: Date
}
