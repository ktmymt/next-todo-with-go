import { FC } from "react"
import { css } from "@emotion/react"

import { IProject } from "../../../types/Project"

interface Props {
  project: IProject
}

const projectCardStyle = css`
  width: 100px;
  height: 100px;
  background-color: #fa36aa;
  border-radius: 23px;
  text-align: center;
  position: relative;

  p {
    font-size: 1.7rem;
    position: absolute;
    left: 35px;
    top: 5px;
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
    <div css={projectCardStyle}>
      <p>{displayProjectName}</p>
    </div>
  )
}

export default ProjectCard
