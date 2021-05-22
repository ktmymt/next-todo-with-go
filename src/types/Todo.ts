export interface ITodo {
  id: number
  title: string
  status: typeof TODO_STATUS
  isDone: boolean
}

const TODO_STATUS = {
  APPROVED: "Approved",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Reveiw",
  WAITING: "Waiting",
} as const

export const todos: ITodo[] = [
  {
    id: 1,
    title: "todo 1",
    status: TODO_STATUS,
    isDone: false,
  },
  {
    id: 2,
    title: "todo 2",
    status: TODO_STATUS,
    isDone: false,
  },
  {
    id: 3,
    title: "todo 3",
    status: TODO_STATUS,
    isDone: false,
  },
]
