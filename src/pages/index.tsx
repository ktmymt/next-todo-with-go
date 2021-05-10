import { NextPage, GetServerSideProps } from "next"
import { css } from "@emotion/react"

// components
import TodoInput from "../components/TodoInput"
import ProjectCardList from "../components/organisms/Project/ProjectCardList"
import BaseText from "../components/atoms/BaseText"
import BaseInput from "../components/atoms/BaseInput"
import TodoList from "../components/TodoList"

// styles
const appStyle = css`
  display: flex;
`
const projectSideStyle = css`
  background-color: #272a41;
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
  background-color: #ffffff;
  width: 50vw;
  height: 100vh;
`

const todoSideContainerStyle = css`
  padding: 60px;
`

interface ITodo {
  title: string
  isDone: boolean
}

const Home: NextPage<ITodo> = (todos: ITodo) => {
  return (
    <div css={appStyle}>
      <div css={projectSideStyle}>
        <div css={projectSideContainerStyle}>
          <BaseText text="Hi Jack." styles="sizeL white bold" />
          <BaseText text="Welcome back to the workspace. We missed you!" styles=" lightGray" />
          <BaseInput className="" placeholder="Search Task or Project..." />
          <ProjectCardList />
        </div>
      </div>
      <div css={todoSideStyle}>
        <div css={todoSideContainerStyle}>
          <TodoInput />
          {/* <BaseText text="Today" className="today" /> */}
          {/* <TodoList todos={todos} /> */}
          {/* <BaseText text="Upcoming" className="upcoming" /> */}
          <TodoList todos={todos} />
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
