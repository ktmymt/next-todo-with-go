import { TodoStatus } from "@prisma/client"

export type CreateTodoInput = {
  title: string
  status: TodoStatus
  isDone: boolean
  schedule: number
  projectId: number
}

// export enum Status {
//   DONE = "Done",
//   DOING = "Doing",
//   PENDING = "Pending",
//   WAITING = "Waiting",
// }
