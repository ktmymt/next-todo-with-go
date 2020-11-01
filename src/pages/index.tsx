import { NextPage } from "next"
import ProjectSide from "../components/ProjectSide"
import TodoSide from "../components/TodoSide"

// styles
import styled from "styled-components"
const AppContainer = styled.div`
  display: flex;
`

interface ITodo {
  title: string
  isDone: boolean
}

const Home: NextPage<ITodo> = (todos: ITodo) => {
  return (
    <AppContainer>
      <ProjectSide />
      <TodoSide todos={todos} />
    </AppContainer>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:8000/api/todos")
  const json = await res.json()
  return json.data.map((todo) => todo)
}

export default Home
