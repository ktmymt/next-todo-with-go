import { NextPage, GetServerSideProps } from "next"
import Modal from "react-modal"
import { css } from "@emotion/react"

// components
import { ProjectCardList, ProjectInfo } from "../components/organisms/Project"
import { TodoList } from "../components/organisms/Todo"
import { DotSquare } from "../components/organisms/Common"
import { BaseText, BaseInput } from "../components/atoms"
import { getGreeting } from "../modules/greeting"

// types
import { IProject } from "../types/Project"
import { useProjectContext } from "../contexts/ProjectContext"
import { useTodoContext } from "../contexts/TodoContext"

interface Props {
  initialProjects: IProject[]
}

// styles
import { Colors } from "../styles/colors"
import { useEffect } from "react"

const appStyle = css`
  display: flex;
  background-color: ${Colors.mainColor};
`
const projectSideStyle = css`
  width: 50vw;
  height: 100vh;
  position: relative;
`

const projectSideContainerStyle = css`
  padding: 0 200px 0 200px;
  width: 55%;

  p:nth-of-type(2) {
    margin: 15px 0 40px 0;
  }
`
const greetingAreaStyle = css`
  padding-top: 200px;

  input {
    width: 90%;
  }
`

const todoSideStyle = css`
  background-color: ${Colors.white};
  width: 50vw;
  height: 96vh;
  margin: 22px;
  border-radius: 20px;
  overflow: auto;
`

const todoSideContainerStyle = css`
  padding: 100px;
`
// determine modal range
Modal.setAppElement("#__next")

const Home: NextPage<Props> = ({ initialProjects }) => {
  const { setProjectsState, setSelectedProjectState } = useProjectContext()
  const { setTodosState } = useTodoContext()

  // get text from input box, and filter projects
  const onChangeSearchProject = (text: string) => {
    const projectsAfterSearch = initialProjects.filter((project) => {
      if (project.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
        return project
      }
    })
    setProjectsState(projectsAfterSearch)
  }

  useEffect(() => {
    if (initialProjects) {
      setProjectsState(initialProjects)
      setSelectedProjectState(initialProjects[0])
      setTodosState(initialProjects[0].todos)
    }
  }, [])

  return (
    <div css={appStyle}>
      <div css={projectSideStyle}>
        <div css={projectSideContainerStyle}>
          <div css={greetingAreaStyle}>
            <BaseText text={getGreeting()} color={Colors.white} optionStyles="sizeL white bold" />
            <BaseText text="Welcome back to the workspace" color={Colors.lightGray} />
            <BaseInput
              type="text"
              placeholder="Search Task or Project..."
              onChangeText={onChangeSearchProject}
            />
          </div>
          <ProjectCardList />
        </div>
      </div>
      <div css={todoSideStyle}>
        <div css={todoSideContainerStyle}>
          <ProjectInfo />
          <div>
            <TodoList title="Today" />
            <TodoList title="Upcoming" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/api/projects")
  const projects = await res.json()
  return { props: { initialProjects: projects.data } }
}

export default Home
