export interface ITodo {
  id: number
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

export const todos: ITodo[] = [
  {
    id: 1,
    title: "todo 1",
    status: TODO_STATUS.WAITING,
    isDone: false,
    schedule: 1,
  },
  {
    id: 2,
    title: "todo 2",
    status: TODO_STATUS.WAITING,
    isDone: false,
    schedule: 0,
  },
  {
    id: 3,
    title: "todo 3",
    status: TODO_STATUS.WAITING,
    isDone: false,
    schedule: 1,
  },
]
