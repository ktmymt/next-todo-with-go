import { FC } from "react"
import { css } from "@emotion/react"

import { IProject } from "../../../types/Project"
import BaseText from "../../atoms/BaseText"

interface Props {
  project: IProject
}

const projectCardStyle = css`
  width: 120px;
  height: 120px;
  background-color: #fa36aa;
  border-radius: 23px;
  text-align: center;
  position: relative;

  p {
    font-size: 1.7rem;
    position: absolute;
    left: 45px;
    top: 15px;
    color: white;
  }
`

const ProjectCard: FC<Props> = (props) => {
  const splitName = props.project.name.split(" ")

  let displayProjectName = ""
  if (splitName.length > 1) {
    displayProjectName = splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase()
  } else {
    displayProjectName = splitName[0][0].toUpperCase() + splitName[0][1].toUpperCase()
  }

  return (
    <div>
      <div css={projectCardStyle}>
        <p>{displayProjectName}</p>
      </div>
      <BaseText text={props.project.name} styles="veryLightGray sizeS textCenter" />
    </div>
  )
}

export default ProjectCard
