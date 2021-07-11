import { NextPage, GetServerSideProps } from "next"
import { Fragment, useEffect } from "react"
import { useSession, getSession } from "next-auth/client"
import { css } from "@emotion/react"
import Modal from "react-modal"
import { getAxiosInstance } from "../modules/request"

import { DotSquare, Loading } from "../components/organisms/Common"
import ProjectSide from "../components/layouts/ProjectSide"
import TodoSide from "../components/layouts/TodoSide"

import { useProjectContext } from "../contexts/ProjectContext"
import { useTodoContext } from "../contexts/TodoContext"
import { useUserContext } from "../contexts/UserContext"

import { IProject } from "../types/Project"
import { Colors } from "../styles/colors"

interface Props {
  initialUserProjects: {
    email: string
    id: string
    image: string
    project: IProject[]
    username: string
  }
}

const appStyle = css`
  display: flex;
  background-color: ${Colors.mainColor};
`

// determine modal range
Modal.setAppElement("#__next")

const Home: NextPage<Props> = ({ initialUserProjects }) => {
  const [session, loading] = useSession()
  const { setProjectsState, setSelectedProjectState } = useProjectContext()
  const { setTodosState } = useTodoContext()
  const { setUserState } = useUserContext()

  useEffect(() => {
    setUserState({
      id: initialUserProjects.id,
      username: initialUserProjects.username,
      email: initialUserProjects.email,
      image: initialUserProjects.image,
    })
    if (initialUserProjects.project) {
      setProjectsState(initialUserProjects.project)
      setSelectedProjectState(initialUserProjects.project[0])
      setTodosState(initialUserProjects.project[0].todos)
    }
  }, [])

  return (
    <div css={appStyle}>
      {loading && <Loading />}
      {session && (
        <Fragment>
          <ProjectSide
            projects={initialUserProjects.project}
            username={initialUserProjects.username}
          />
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

  const axios = getAxiosInstance()

  const userRes = await axios.post("/api/user", {
    username: session.user.name,
    email: session.user.email,
    image: session.user.image,
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/userProjects/${userRes.data.data.id}`,
  )
  const projects = await res.json()
  return { props: { initialUserProjects: projects.data } }
}

export default Home
