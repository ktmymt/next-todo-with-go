import { ReactNode, createContext, useContext, useState } from "react"
import { getAxiosInstance } from "../modules/request"
import { IProject } from "../types/Project"

type ProjectContextType = {
  projects: IProject[]
  selectedProject: IProject
  setProjectsState: (projects: IProject[]) => void
  setSelectedProjectState: (project: IProject | null) => void
  refreshProjects: () => void
  sortProjects: (project: IProject) => void
  createProject: (name: string, description: string, color: string) => void
  updateProject: (project: IProject) => void
  deleteProject: (id: number) => void
}

const projectContextDefaultValues: ProjectContextType = {
  projects: null,
  selectedProject: null,
  setProjectsState: () => [],
  setSelectedProjectState: () => [],
  refreshProjects: () => [],
  sortProjects: () => [],
  createProject: () => [],
  updateProject: () => [],
  deleteProject: () => [],
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

  // set projects state that is used in some components
  const setProjectsState = (projects: IProject[]) => {
    setProjects(projects)
  }

  // set selected project state for current project
  const setSelectedProjectState = (project: IProject | null) => {
    setSelectedProject(project)
  }

  // refreshing project data
  const refreshProjects = async () => {
    try {
      const res = await axios.get("/api/projects")
      const projects = await res.data
      setProjects(projects.data)

      if (!projects.data) {
        setSelectedProject(null)
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
  const createProject = async (name: string, description: string, color: string) => {
    try {
      const res = await axios.post("/api/project", {
        name: name,
        description: description,
        todos: [],
        color: color,
      })
      const newProject = await res.data.data
      setProjects((prevProjects) => {
        const updatedProjects = [newProject, ...prevProjects]
        return updatedProjects
      })
      setSelectedProject(newProject)
    } catch (e) {
      console.error(e)
    }
  }

  // update target project
  const updateProject = () => {
    axios.post("test")
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
    setProjectsState,
    setSelectedProjectState,
    refreshProjects,
    sortProjects,
    createProject,
    updateProject,
    deleteProject,
  }

  return (
    <>
      <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
    </>
  )
}
