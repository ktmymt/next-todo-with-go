import { NextPage } from "next"
import { css } from "@emotion/react"

// components
import TodoInput from "../components/TodoInput"
import BaseText from "../components/atoms/BaseText"
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

const todoSideStyle = css`
  background-color: #ffffff;
  width: 50vw;
  height: 100vh;
`

interface ITodo {
  title: string
  isDone: boolean
}

const Home: NextPage<ITodo> = (todos: ITodo) => {
  return (
    <div css={appStyle}>
      <div css={projectSideStyle}>
        <BaseText text="Hi Jack." styles="sizeM white bold" />
        <BaseText text="Welcome back to the workspace. We missed you!" styles="sizeS lightGray" />
        <input
          type="text"
          className="bg-gray-700 text-gray-500 rounded"
          placeholder="Search Task or Project..."
        />
      </div>
      <div css={todoSideStyle}>
        <TodoInput />
        {/* <BaseText text="Today" className="today" /> */}
        {/* <TodoList todos={todos} /> */}
        {/* <BaseText text="Upcoming" className="upcoming" /> */}
        <TodoList todos={todos} />
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:8000/api/todos")
  const json = await res.json()
  return json.data.map((todo) => todo)
}

export default Home
