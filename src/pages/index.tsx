import { NextPage } from "next"
import ProjectSide from "../components/ProjectSide"
import TodoSide from "../components/TodoSide"

// styles
import { css } from "@emotion/react"
const appContainer = css`
  display: flex;
`

interface ITodo {
  title: string
  isDone: boolean
}

const Home: NextPage<ITodo> = (todos: ITodo) => {
  return (
    <div css={appContainer}>
      <ProjectSide />
      <TodoSide todos={todos} />
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:8000/api/todos")
  const json = await res.json()
  return json.data.map((todo) => todo)
}

export default Home
