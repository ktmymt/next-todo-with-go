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
  @media screen and (min-width: 500px) {
    width: 120px;
    height: 120px;
  }

  @media screen and (min-width: 800px) {
    width: 70px;
    height: 70px;
    p {
      font-size: 1.1rem;
      top: 7px;
    }
  }

  @media screen and (min-width: 1200px) {
    width: 80px;
    height: 80px;
    p {
      font-size: 1.1rem;
      top: 11px;
    }
  }

  @media screen and (min-width: 1326px) {
    width: 90px;
    height: 90px;
    p {
      font-size: 1.2rem;
      top: 15px;
    }
  }

  @media screen and (min-width: 1441px) {
    width: 115px;
    height: 115px;
    p {
      font-size: 1.6rem;
      top: 18px;
    }
  }

  @media screen and (min-width: 1600px) {
    width: 125px;
    height: 125px;
    p {
      font-size: 1.8rem;
      top: 16px;
    }
  }

  background-color: ${Colors.projectCards[color]};
  border-radius: 23px;
  position: relative;

  p {
    position: absolute;
    color: ${Colors.white};
    width: 100%;
    text-align: center;
  }
`

const selectedProjectStyle = (color: string) => css`
  ${projectCardStyle(color)}
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
      width: 85px;
      height: 85px;
    }

    @media screen and (min-width: 1200px) {
      width: 95px;
      height: 95px;
    }

    @media screen and (min-width: 1326px) {
      width: 105px;
      height: 105px;
    }

    @media screen and (min-width: 1441px) {
      width: 130px;
      height: 130px;
    }

    @media screen and (min-width: 1600px) {
      width: 140px;
      height: 140px;
    }
  }
`

const ProjectCard: FC<Props> = (props) => {
  const { setSelectedProjectState, sortProjects } = useProjectContext()
  const { setTodosState } = useTodoContext()

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
