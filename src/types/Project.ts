export interface IProject {
  id: number
  name: string
  outline: string
  selected: boolean
  active_at: Date
  created_at: Date
  updated_at: Date
}

export const projects: IProject[] = [
  {
    id: 1,
    name: "project 1",
    outline: "This is a project 1",
    selected: true,
    active_at: new Date("2021, 1, 31"),
    created_at: new Date("2021, 1, 31"),
    updated_at: new Date("2021, 1, 31"),
  },
  {
    id: 2,
    name: "project 2",
    outline: "This is a project 2",
    selected: false,
    active_at: new Date("2021, 5, 31"),
    created_at: new Date("2021, 5, 31"),
    updated_at: new Date("2021, 5, 31"),
  },
  {
    id: 3,
    name: "project 3",
    outline: "This is a project 3",
    selected: false,
    active_at: new Date("2021, 3, 31"),
    created_at: new Date("2021, 3, 31"),
    updated_at: new Date("2021, 3, 31"),
  },
]
