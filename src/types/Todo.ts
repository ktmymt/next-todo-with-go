export interface ITodo {
  id: string
  projectId: string
  title: string
  status: string
  isDone: boolean
  schedule: number
}

export enum TODO_STATUS {
  APPROVED = "Approved",
  IN_PROGRESS = "In Progress",
  PENDING = "Pending",
  WAITING = "Waiting",
}
