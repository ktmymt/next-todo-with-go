import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../../styles/colors"
import { useProjectContext } from "../../../contexts/ProjectContext"

// components
import { BaseText } from "../../atoms"

const projectInfoContainerStyle = css``

const ProjectInfo: FC = () => {
  const { selectedProject } = useProjectContext()

  return (
    <div css={projectInfoContainerStyle}>
      {selectedProject && (
        <>
          <BaseText text={selectedProject.name} optionStyles="sizeM bold" />
          <BaseText
            text={selectedProject.description}
            color={Colors.lightGray}
            optionStyles="sizeS"
          />
        </>
      )}
    </div>
  )
}

export default ProjectInfo
