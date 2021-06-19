import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../../styles/colors"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import DeleteProjectModal from "./DeleteProjectModal"

// components
import { BaseText } from "../../atoms"

const projectInfoStyle = css`
  p:nth-child(2) {
    margin-top: 16px;
  }

  display: flex;

  svg {
    margin-left: auto;
    font-size: 1.8rem;
  }
`

const ProjectInfo: FC = () => {
  const { selectedProject } = useProjectContext()

  return (
    <>
      {selectedProject && (
        <div css={projectInfoStyle}>
          <div>
            <BaseText text={selectedProject.name} size="2.1rem" optionStyles="bold" />
            <BaseText
              text={selectedProject.description}
              color={Colors.lightGray}
              optionStyles="sizeS"
            />
          </div>
          <FontAwesomeIcon icon={faEllipsisH} />
          <DeleteProjectModal />
        </div>
      )}
    </>
  )
}

export default ProjectInfo
