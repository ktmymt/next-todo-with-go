import { NextPage, GetServerSideProps } from "next"
import { Fragment, useEffect } from "react"
import { useSession, getSession } from "next-auth/client"
import { css } from "@emotion/react"
import Modal from "react-modal"

import { DotSquare, Loading } from "../components/organisms/Common"
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
  const [session, loading] = useSession()
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
      {loading && <Loading />}
      {session && (
        <Fragment>
          <ProjectSide projects={initialProjects} />
          <TodoSide />
        </Fragment>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/userProjects?username=${session?.user?.name}&email=${session?.user?.email}`,
  )
  const projects = await res.json()
  return { props: { initialProjects: projects.data } }
}

export default Home
