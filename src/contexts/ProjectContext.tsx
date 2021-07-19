import { ReactNode, createContext, useContext, useState } from "react"
import { getAxiosInstance } from "../modules/request"
import { IProject } from "../types/Project"
import { IUser } from "../types/User"
import { IError } from "../types/Error"

type ProjectContextType = {
  projects: IProject[]
  selectedProject: IProject
  projectNameError: string
  projectDescriptionError: string
  projectColorError: string
  users: IUser[]
  addUserError: string
  setProjectsState: (projects: IProject[]) => void
  setSelectedProjectState: (project: IProject | null) => void
  setUsersState: (users: IUser[]) => void
  refreshProjects: (id: string) => void
  sortProjects: (project: IProject) => void
  createProject: (
    userId: string,
    title: string,
    description: string,
    color: string,
  ) => Promise<number>
  updateProject: (id: string, name: string, description: string, color: string) => Promise<number>
  deleteProject: (id: string) => Promise<number>
  addUserToProject: (projectId: string, email: string) => Promise<number>
  resetErrorsState: () => void
}

const projectContextDefaultValues: ProjectContextType = {
  projects: null,
  selectedProject: null,
  projectNameError: null,
  projectDescriptionError: null,
  projectColorError: null,
  users: [],
  addUserError: null,
  setProjectsState: () => [],
  setSelectedProjectState: () => [],
  setUsersState: () => [],
  refreshProjects: () => [],
  sortProjects: () => [],
  createProject: async () => await 0,
  updateProject: async () => await null,
  deleteProject: async () => await null,
  addUserToProject: async () => null,
  resetErrorsState: () => [],
}

const ProjectContext = createContext<ProjectContextType>(projectContextDefaultValues)

export const useProjectContext = () => {
  return useContext(ProjectContext)
}

type Props = {
  children: ReactNode
}

export const ProjectProvider = ({ children }: Props) => {
  const axios = getAxiosInstance()

  const [projects, setProjects] = useState<IProject[]>([])
  const [users, setUsers] = useState([])
  const [selectedProject, setSelectedProject] = useState<IProject>()
  const [projectNameError, setProjectNameError] = useState("")
  const [projectDescriptionError, setProjectDescriptionError] = useState("")
  const [projectColorError, setProjectColorError] = useState("")
  const [addUserError, setAddUserError] = useState("")

  // set projects state that is used in some components
  const setProjectsState = (projects: IProject[]): void => {
    setProjects(projects)
  }

  // set selected project state for current project
  const setSelectedProjectState = (project: IProject | null): void => {
    setSelectedProject(project)
  }

  const setUsersState = (users: IUser[]) => {
    setUsers(users)
  }

  const resetErrorsState = (): void => {
    setProjectNameError("")
    setProjectColorError("")
  }

  // refreshing project data
  const refreshProjects = async (id: string) => {
    try {
      const res = await axios.get(`/api/userProjects/${id}`)
      const result = await res.data
      setProjects(result.data.project)

      if (result.data.project == null) {
        setSelectedProjectState(null)
      }

      if (result.data.project && result.data.project.length > 0) {
        setSelectedProject(result.data.project[0])
      }
    } catch (e) {
      console.error(e)
    }
  }

  // move selected project to top
  const sortProjects = (targetProject: IProject) => {
    const tempProjects = projects.filter((project) => project.id != targetProject.id)
    tempProjects.unshift(targetProject)
    setProjects(tempProjects)
  }

  // create project, and update projects state, and selected project state
  const createProject = async (
    userId: string,
    title: string,
    description: string,
    color: string,
  ): Promise<number> => {
    try {
      const res = await axios.post("/api/project", {
        userIds: [userId],
        name: title,
        description: description,
        color: color,
      })

      const newProject = await res.data

      setProjects((prevProjects) => {
        const updatedProjects = [newProject.data, ...prevProjects]
        return updatedProjects
      })

      setSelectedProject(newProject.data)
      return newProject.code
    } catch (err) {
      const errorRes = err.response.data
      resetErrorsState()

      if (errorRes.code == 400) {
        errorRes.data.map((error: IError) => {
          if (error.name == "projectName") {
            setProjectNameError(error.message)
          }
          if (error.name == "projectDescription") {
            setProjectDescriptionError(error.message)
          }
          if (error.name == "projectColor") {
            setProjectColorError(error.message)
          }
        })
      }
      return errorRes.code
    }
  }

  // update target project
  const updateProject = async (
    id: string,
    name: string,
    description: string,
    color: string,
  ): Promise<number> => {
    const params = {
      name: name,
      description: description,
      todos: [],
      color: color,
    }
    const res = await axios.put(`/api/updProject/${id}`, params)
    const result = await res.data
    return result.code
  }

  // delete target project
  const deleteProject = async (id: string): Promise<number> => {
    try {
      const res = await axios.delete(`/api/delProject/${id}`, { data: { id: id } })
      const result = await res.data
      return result.code
    } catch (err) {
      console.error(err)
    }
  }

  const addUserToProject = async (projectId: string, email: string): Promise<number> => {
    try {
      const res = await axios.put(`/api/updMembers?projectId=${projectId}&userEmail=${email}`)
      const result = await res.data
      return result.code
    } catch (err) {
      const errorRes = err.response.data

      if (errorRes.code == 400) {
        setAddUserError(errorRes.message)
      }
      return errorRes.code
    }
  }

  const value = {
    projects,
    selectedProject,
    projectNameError,
    projectDescriptionError,
    projectColorError,
    users,
    setProjectsState,
    setSelectedProjectState,
    setUsersState,
    refreshProjects,
    sortProjects,
    createProject,
    updateProject,
    deleteProject,
    addUserToProject,
    resetErrorsState,
    addUserError,
  }

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}
