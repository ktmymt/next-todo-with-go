import { FC } from "react"
import { css } from "@emotion/react"

import { ProjectCardList } from "../organisms/Project"
import { BaseText, BaseInput } from "../atoms"

import { getGreeting } from "../../modules/greeting"
import { useProjectContext } from "../../contexts/ProjectContext"
import { useWindowDimensions } from "../../hooks/windowSize"
import { useClient } from "../../hooks/client"

import { Colors } from "../../styles/colors"
import { IProject } from "../../types/Project"

interface Props {
  projects: IProject[]
}

const projectSideStyle = css`
  width: 50vw;
  position: relative;
`

const projectSideContainerStyle = (width: number) => css`
  @media screen and (min-width: 500px) {
    padding: 0 140px;
    width: 70%;
  }

  @media screen and (min-width: 800px) {
    padding: 0 140px;
    width: 70%;
  }

  @media screen and (min-width: 1440px) {
    padding: 0 200px;
    width: 70%;
  }

  p:nth-of-type(2) {
    margin: 15px 0 40px 0;
  }
`
const greetingAreaStyle = (width: number) => css`
  @media screen and (min-width: 500px) {
    padding-top: 150px;

    input {
      width: 70%;
    }
  }

  @media screen and (min-width: 800px) {
    padding-top: 180px;

    input {
      width: 70%;
    }
  }

  @media screen and (min-width: 1440px) {
    padding-top: 180px;

    input {
      width: 70%;
    }
  }

  input {
    width: 70%;
  }
`

const ProjectSide: FC<Props> = (props) => {
  const { setProjectsState } = useProjectContext()
  const { width } = useWindowDimensions()
  const isClient = useClient()

  // get text from input box, and filter projects
  const onChangeSearchProject = (text: string) => {
    if (!props.projects) {
      return
    }
    const projectsAfterSearch = props.projects.filter((project) => {
      if (project.name.toLowerCase().indexOf(text.toLowerCase()) > -1) {
        return project
      }
    })
    setProjectsState(projectsAfterSearch)
  }

  const makeProjectSideResponsible = (): { padding: string; width: string } => {
    if (width && width >= 1586) {
      return { padding: "200px", width: "55%" }
    }
    if (width && width <= 1585) {
      return { padding: "140px", width: "70%" }
    }
    if (width && width <= 1270) {
      return { padding: "80px", width: "80%" }
    }
  }

  return (
    <div css={projectSideStyle}>
      {isClient && (
        <div css={projectSideContainerStyle(width)}>
          <div css={greetingAreaStyle(width)}>
            <BaseText
              text={getGreeting()}
              color={Colors.white}
              size={width <= 1440 ? "2.6rem" : "3rem"}
              optionStyles="white bold"
            />
            <BaseText text="Welcome back to the workspace" color={Colors.lightGray} />
            <BaseInput
              type="text"
              placeholder="Search Task or Project..."
              onChangeText={onChangeSearchProject}
            />
          </div>
          <ProjectCardList />
        </div>
      )}
    </div>
  )
}

export default ProjectSide
