import { FC } from "react"
import { css } from "@emotion/react"

import { IProject } from "../../../types/Project"
import BaseText from "../../atoms/BaseText"

import { Colors } from "../../../styles/colors"

interface Props {
  project: IProject
}

const projectCardStyle = css`
  width: 120px;
  height: 120px;
  background-color: ${Colors.projectCards.pink};
  border-radius: 23px;
  text-align: center;
  position: relative;

  p {
    font-size: 1.7rem;
    position: absolute;
    left: 45px;
    top: 15px;
    color: ${Colors.white};
  }
`

const ProjectCard: FC<Props> = (props) => {
  const getShortHandProjectName = (textArray: string[]) => {
    if (textArray.length > 1) {
      return textArray[0][0].toUpperCase() + textArray[1][0].toUpperCase()
    } else {
      return textArray[0].toUpperCase() + textArray[0].toUpperCase()
    }
  }

  const splitName = props.project.name.split(" ")
  const projectName = getShortHandProjectName(splitName)

  return (
    <div>
      <div css={projectCardStyle}>
        <p>{projectName}</p>
      </div>
      <BaseText text={props.project.name} styles="veryLightGray sizeS textCenter" />
    </div>
  )
}

export default ProjectCard
