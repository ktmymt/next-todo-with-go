import { ITodo } from "./Todo"
export interface IProject {
  id: number
  name: string
  description: string
  todos: ITodo[]
  color: string
  updatedAt: Date
}

export const projects: IProject[] = [
  {
    id: 1,
    name: "project 1",
    description: "This is a project 1",
    todos: [],
    color: "",
    updatedAt: new Date("2021, 1, 31"),
  },
]
