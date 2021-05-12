import { NextPage, GetServerSideProps } from "next"
import { css } from "@emotion/react"

// components
import TodoInput from "../components/organisms/Todo/TodoInput"
import ProjectCardList from "../components/organisms/Project/ProjectCardList"
import BaseText from "../components/atoms/BaseText"
import BaseInput from "../components/atoms/BaseInput"
import TodoList from "../components/organisms/Todo/TodoList"
import { projects } from "../types/Project"

// styles
import { Colors } from "../styles/colors"

const appStyle = css`
  display: flex;
`
const projectSideStyle = css`
  background-color: ${Colors.mainColor};
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
  height: 100vh;
`

const todoSideContainerStyle = css`
  padding: 100px;
`
interface ITodo {
  title: string
  isDone: boolean
}

const Home: NextPage<ITodo> = (todos: ITodo) => {
  const selectedProject = projects.filter((project) => {
    if (project.selected) {
      return project
    }
  })

  return (
    <div css={appStyle}>
      <div css={projectSideStyle}>
        <div css={projectSideContainerStyle}>
          <BaseText text="Hi Jack." styles="sizeL white bold" />
          <BaseText text="Welcome back to the workspace. We missed you!" styles=" lightGray" />
          <BaseInput className="" placeholder="Search Task or Project..." />
          <ProjectCardList projects={projects} />
        </div>
      </div>
      <div css={todoSideStyle}>
        <div css={todoSideContainerStyle}>
          <BaseText text={selectedProject[0].name} styles="sizeM" />
          <BaseText text={selectedProject[0].outline} styles="sizeS lightGray" />
          <TodoInput />
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
