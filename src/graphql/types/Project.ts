import { Todo } from "./Todo"
import { User } from "./User"

export type Project = {
  id: number
  name: string
  description: string
  color: string
  todos: Todo[]
  users: User[]
  updatedAt: Date
}

export type CreateProjectInput = {
  name: string
  description: string
  color: string
}
