import { ReactNode, createContext, useContext, useState } from "react"
import { getAxiosInstance } from "../modules/request"
import { IProject } from "../types/Project"
import { IError } from "../types/Error"

type ProjectContextType = {
  projects: IProject[]
  selectedProject: IProject
  projectNameError: string
  projectDescriptionError: string
  projectColorError: string
  setProjectsState: (projects: IProject[]) => void
  setSelectedProjectState: (project: IProject | null) => void
  refreshProjects: () => void
  sortProjects: (project: IProject) => void
  createProject: (name: string, description: string, color: string) => Promise<number>
  updateProject: (id: number, name: string, description: string, color: string) => Promise<number>
  deleteProject: (id: number) => void
  resetErrorsState: () => void
}

const projectContextDefaultValues: ProjectContextType = {
  projects: null,
  selectedProject: null,
  projectNameError: null,
  projectDescriptionError: null,
  projectColorError: null,
  setProjectsState: () => [],
  setSelectedProjectState: () => [],
  refreshProjects: () => [],
  sortProjects: () => [],
  createProject: async () => await 0,
  updateProject: async () => await null,
  deleteProject: () => [],
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
  const [selectedProject, setSelectedProject] = useState<IProject>()
  const [projectNameError, setProjectNameError] = useState("")
  const [projectDescriptionError, setProjectDescriptionError] = useState("")
  const [projectColorError, setProjectColorError] = useState("")

  // set projects state that is used in some components
  const setProjectsState = (projects: IProject[]): void => {
    setProjects(projects)
  }

  // set selected project state for current project
  const setSelectedProjectState = (project: IProject | null): void => {
    setSelectedProject(project)
  }

  const resetErrorsState = (): void => {
    setProjectNameError("")
    setProjectColorError("")
  }

  // refreshing project data
  const refreshProjects = async () => {
    try {
      const res = await axios.get("/api/projects")
      const projects = await res.data
      setProjects(projects.data)

      if (projects.data.length > 0) {
        setSelectedProject(projects.data[0])
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
    name: string,
    description: string,
    color: string,
  ): Promise<number> => {
    try {
      const res = await axios.post("/api/project", {
        name: name,
        description: description,
        todos: [],
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
    id: number,
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
  const deleteProject = async (id: number) => {
    try {
      const res = await axios.delete(`/api/delProject/${id}`, { data: { id: id } })
      const status = await res.status
      if (status == 200) {
        refreshProjects()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const value = {
    projects,
    selectedProject,
    projectNameError,
    projectDescriptionError,
    projectColorError,
    setProjectsState,
    setSelectedProjectState,
    refreshProjects,
    sortProjects,
    createProject,
    updateProject,
    deleteProject,
    resetErrorsState,
  }

  return (
    <>
      <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
    </>
  )
}
