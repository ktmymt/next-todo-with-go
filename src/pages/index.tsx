import { NextPage, GetServerSideProps } from "next"
import { useEffect } from "react"
import { css } from "@emotion/react"
import Modal from "react-modal"

import { DotSquare } from "../components/organisms/Common"
import ProjectSide from "../components/layouts/ProjectSide"
import TodoSide from "../components/layouts/TodoSide"

import { useProjectContext } from "../contexts/ProjectContext"
import { useTodoContext } from "../contexts/TodoContext"

import { IProject } from "../types/Project"
import { Colors } from "../styles/colors"

interface Props {
  initialProjects: IProject[]
}

const appStyle = css`
  display: flex;
  background-color: ${Colors.mainColor};
`

// determine modal range
Modal.setAppElement("#__next")

const Home: NextPage<Props> = ({ initialProjects }) => {
  const { setProjectsState, setSelectedProjectState } = useProjectContext()
  const { setTodosState } = useTodoContext()

  useEffect(() => {
    if (initialProjects) {
      setProjectsState(initialProjects)
      setSelectedProjectState(initialProjects[0])
      setTodosState(initialProjects[0].todos)
    }
  }, [])

  return (
    <div css={appStyle}>
      <ProjectSide projects={initialProjects} />
      <TodoSide />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`)
  const projects = await res.json()
  return { props: { initialProjects: projects.data } }
}

export default Home
