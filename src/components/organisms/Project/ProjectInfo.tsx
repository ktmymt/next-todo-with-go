import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../../styles/colors"

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
      <BaseText text={props.project.name} optionStyles="sizeM bold" />
      <BaseText text={props.project.description} color={Colors.lightGray} optionStyles="sizeS" />
    </div>
  )
}

export default ProjectInfo
