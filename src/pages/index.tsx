import { NextPage, GetServerSideProps } from "next"
import { css } from "@emotion/react"

// components
import { ProjectCardList, ProjectInfo } from "../components/organisms/Project"
import { TodoList } from "../components/organisms/Todo"
import { DotSquare } from "../components/organisms/Common"
import { BaseText, BaseInput } from "../components/atoms"

// types
import { projects } from "../types/Project"
import { todos } from "../types/Todo"

// styles
import { Colors } from "../styles/colors"

const appStyle = css`
  display: flex;
  background-color: ${Colors.mainColor};
`
const projectSideStyle = css`
  width: 50vw;
  height: 100vh;
`

const projectSideContainerStyle = css`
  padding: 200px;
  width: 50%;

  p:nth-child(2) {
    margin: 15px 0 40px 0;
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

const Home: NextPage = () => {
  const selectedProject = projects.filter((project) => {
    if (project.selected) {
      return project
    }
  })

  return (
    <div css={appStyle}>
      <div css={projectSideStyle}>
        {/* <DotSquare /> */}
        <div css={projectSideContainerStyle}>
          <BaseText text="Hi Jack." styles="sizeL white bold" />
          <BaseText text="Welcome back to the workspace" styles=" lightGray" />
          <BaseInput className="" placeholder="Search Task or Project..." />
          <ProjectCardList projects={projects} />
        </div>
      </div>
      <div css={todoSideStyle}>
        <div css={todoSideContainerStyle}>
          <ProjectInfo project={selectedProject[0]} />
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
  const res = await fetch("http://localhost:8000/api/todos")
  const todos = await res.json()
  return { props: { todos } }
}

export default Home
