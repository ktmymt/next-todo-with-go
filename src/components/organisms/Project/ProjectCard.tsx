import { FC, useEffect } from "react"
import { css } from "@emotion/react"

import { IProject } from "../../../types/Project"
import BaseText from "../../atoms/BaseText"

import { Colors } from "../../../styles/colors"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { useTodoContext } from "../../../contexts/TodoContext"

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

const projectCardStyle = (color: string) => css`
  width: 128px;
  height: 128px;
  background-color: ${Colors.projectCards[color]};
  border-radius: 23px;
  position: relative;

  p {
    font-size: 2rem;
    position: absolute;
    top: 15px;
    color: ${Colors.white};
    width: 100%;
    text-align: center;
  }
`

const selectedProjectStyle = (color: string) => css`
  ${projectCardStyle(color)}
  ::after {
    content: "";
    width: 143px;
    height: 143px;
    border: 5px solid ${Colors.projectCards[color]};
    border-radius: 35px;
    position: absolute;
    top: -13px;
    left: -13px;
  }
`

const ProjectCard: FC<Props> = (props) => {
  const { setSelectedProjectState, sortProjects } = useProjectContext()
  const { setTodosState } = useTodoContext()

  const getShortHandProjectName = (text: string): string => {
    let name = ""
    const splitName = text.split(" ")
    if (splitName.length > 1) {
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
            ? selectedProjectStyle(props.project.color)
            : projectCardStyle(props.project.color)
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
