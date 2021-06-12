import { NextPage, GetServerSideProps } from "next"
import Modal from "react-modal"
import { css } from "@emotion/react"

// components
import { ProjectCardList, ProjectInfo } from "../components/organisms/Project"
import { TodoList } from "../components/organisms/Todo"
import { DotSquare } from "../components/organisms/Common"
import { BaseText, BaseInput } from "../components/atoms"

// types
import { todos } from "../types/Todo"
import { IProject } from "../types/Project"
import { Greeting } from "../const/greeting"
interface Props {
  projects: IProject[]
}

// styles
import { Colors } from "../styles/colors"
import { useEffect, useState } from "react"

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
`

const todoSideContainerStyle = css`
  padding: 100px;
`

Modal.setAppElement("#__next")

const Home: NextPage<Props> = ({ projects }) => {
  const [allProjects, setAllProjects] = useState(projects)
  const [projectSelected, setProjectSelected] = useState(projects[0])
  const [greeting, setGreeting] = useState("")

  // get text from input box, and filter projects
  const onChangeSearchProject = (text: string) => {
    const projectsAfterSearch = projects.filter((project) => {
      if (project.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
        return project
      }
    })
    setAllProjects(projectsAfterSearch)
  }

  // set greeting to show on top
  const getGreeting = () => {
    const date = new Date()
    const hour = date.getHours()
    switch (true) {
      case hour >= 5 && hour <= 10:
        setGreeting(Greeting.MORNING)
        break
      case hour >= 11 && hour <= 16:
        setGreeting(Greeting.HELLO)
        break
      case hour >= 17 && hour <= 20:
        setGreeting(Greeting.EVENING)
        break
      case hour >= 21 || hour <= 4:
        setGreeting(Greeting.NIGHT)
        break
    }
  }

  useEffect(() => {
    getGreeting()
  })

  return (
    <div css={appStyle}>
      <div css={projectSideStyle}>
        <div css={projectSideContainerStyle}>
          <div css={greetingAreaStyle}>
            <BaseText text={greeting} color={Colors.white} optionStyles="sizeL white bold" />
            <BaseText text="Welcome back to the workspace" color={Colors.lightGray} />
            <BaseInput
              type="text"
              placeholder="Search Task or Project..."
              onChangeText={onChangeSearchProject}
            />
          </div>
          <ProjectCardList
            projects={allProjects}
            projectSelected={projectSelected}
            onClickProject={setProjectSelected}
          />
        </div>
      </div>
      <div css={todoSideStyle}>
        <div css={todoSideContainerStyle}>
          <ProjectInfo project={projectSelected} />
          <div>
            <TodoList title="Today" todos={todos} />
            <TodoList title="Upcoming" todos={todos} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:8000/api/projects")
  const projects = await res.json()
  return { props: { projects: projects.data } }
}

export default Home
