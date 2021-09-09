export type Todo = {
  id: number
  projectId: number
  title: string
  status: string
  isDone: boolean
  schedule: number
}

export type CreateTodoInput = {
  projectId: number
  title: string
  status: string
  schedule: number
}

export enum Check {
  DONE = "Done",
  DOING = "Doing",
  PENDING = "Pending",
  WAITING = "Waiting",
}
