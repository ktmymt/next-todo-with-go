import { ReactNode, createContext, useContext, useState } from "react"
import { getAxiosInstance } from "../modules/request"
import { IProject } from "../types/Project"

type ProjectContextType = {
  projects: IProject[]
  selectedProject: IProject
  setProjectsState: (projects: IProject[]) => void
  setSelectedProjectState: (project: IProject) => void
  refreshProjects: () => void
  sortProjects: (project: IProject) => void
  createProject: (name: string, description: string, color: string) => void
  updateProject: (project: IProject) => void
  deleteProject: (project: IProject) => void
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
  const setSelectedProjectState = (project: IProject) => {
    setSelectedProject(project)
  }

  // refreshing project data
  const refreshProjects = async () => {
    const res = await axios.get("/api/projects")
    const projects = await res.data
    setProjects(projects)
  }

  // move selected project to top
  const sortProjects = (targetProject: IProject) => {
    const tempProjects = projects.filter((project) => project.id != targetProject.id)
    tempProjects.unshift(targetProject)
    setProjects(tempProjects)
  }

  // create project, and update projects state, and selected project state
  const createProject = async (name: string, description: string, color: string) => {
    const res = await axios.post("/api/project", {
      name: name,
      description: description,
      todo: [],
      color: color,
      // updatedAt: Date.now(),
    })
    const newProject = await res.data.data
    setProjects((prevProjects) => {
      const updatedProjects = [newProject, ...prevProjects]
      return updatedProjects
    })
    setSelectedProjectState(newProject)
  }

  // update target project
  const updateProject = () => {
    axios.post("test")
  }

  // delete target project
  const deleteProject = () => {
    axios.post("test")
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
