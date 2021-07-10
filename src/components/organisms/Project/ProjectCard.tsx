import { FC, useEffect } from "react"
import { css } from "@emotion/react"

import { IProject } from "../../../types/Project"
import BaseText from "../../atoms/BaseText"

import { Colors } from "../../../styles/colors"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { useTodoContext } from "../../../contexts/TodoContext"
import { useWindowDimensions } from "../../../hooks/windowSize"

interface Props {
  project: IProject
  isSelected: boolean
  projectIndex?: number
}

const projectCardContainerStyle = css`
  p:nth-child(2) {
    margin-top: 20px;
  }
`

const projectCardStyle = (color: string, width: number) => css`
  @media screen and (min-width: 500px) {
    width: 120px;
    height: 120px;
  }

  @media screen and (min-width: 800px) {
    width: 120px;
    height: 120px;
  }

  @media screen and (min-width: 1440px) {
    width: 120px;
    height: 120px;
  }

  background-color: ${Colors.projectCards[color]};
  border-radius: 23px;
  position: relative;

  p {
    font-size: 1.8rem;
    position: absolute;
    top: 15px;
    color: ${Colors.white};
    width: 100%;
    text-align: center;
  }
`

const selectedProjectStyle = (color: string, width: number) => css`
  ${projectCardStyle(color, width)}
  ::after {
    content: "";
    border: 5px solid ${Colors.projectCards[color]};
    border-radius: 35px;
    position: absolute;
    top: -13px;
    left: -13px;

    @media screen and (min-width: 500px) {
      width: 135px;
      height: 135px;
    }

    @media screen and (min-width: 800px) {
      width: 135px;
      height: 135px;
    }

    @media screen and (min-width: 1440px) {
      width: 135px;
      height: 135px;
    }
  }
`

const ProjectCard: FC<Props> = (props) => {
  const { setSelectedProjectState, sortProjects } = useProjectContext()
  const { setTodosState } = useTodoContext()
  const { width } = useWindowDimensions()

  const getShortHandProjectName = (text: string): string => {
    let name = ""
    const splitName = text.split(" ")
    if (splitName.length > 1) {
      if (splitName[1] == "") {
        return splitName[0][0].toUpperCase() + splitName[0][1].toUpperCase()
      }
      name = splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase()
    } else {
      name = splitName[0][0].toUpperCase() + splitName[0][1].toUpperCase()
    }
    return name
  }

  const onClickProjectCard = () => {
    setSelectedProjectState(props.project)
    setTodosState(props.project.todos)

    // if the project card is in all area
    if (props.projectIndex >= 5) {
      sortProjects(props.project)
    }
  }

  useEffect(() => {
    if (props.project.name) {
      getShortHandProjectName(props.project.name)
    }
  }, [])

  return (
    <div css={projectCardContainerStyle} onClick={onClickProjectCard}>
      <div
        css={
          props.isSelected
            ? selectedProjectStyle(props.project.color, width)
            : projectCardStyle(props.project.color, width)
        }
      >
        <p>{getShortHandProjectName(props.project.name)}</p>
      </div>
      <BaseText
        text={props.project.name}
        color={Colors.veryLightGray}
        optionStyles="sizeS textCenter"
      />
    </div>
  )
}

export default ProjectCard
