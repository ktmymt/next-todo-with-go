import { FC } from "react"
import { css } from "@emotion/react"

// components
import { BaseText } from "../../atoms"

const projectInfoContainerStyle = css``

// types
import { IProject } from "../../../types/Project"

interface Props {
  project: IProject
}

const ProjectInfo: FC<Props> = (props) => {
  return (
    <div css={projectInfoContainerStyle}>
      <BaseText text={props.project.name} styles="sizeM" />
      <BaseText text={props.project.description} styles="sizeS lightGray" />
    </div>
  )
}

export default ProjectInfo
