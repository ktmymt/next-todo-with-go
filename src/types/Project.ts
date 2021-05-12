export interface IProject {
  id: number
  name: string
  outline: string
  selected: boolean
}

export const projects: IProject[] = [
  {
    id: 1,
    name: "project 1",
    outline: "This is a project 1",
    selected: true,
  },
  {
    id: 2,
    name: "project2",
    outline: "This is a project 2",
    selected: false,
  },
  {
    id: 3,
    name: "project 3",
    outline: "This is a project 3",
    selected: false,
  },
]
