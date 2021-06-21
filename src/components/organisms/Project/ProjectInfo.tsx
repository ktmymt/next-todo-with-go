import { FC, useState } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../../styles/colors"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import DeleteProjectModal from "./DeleteProjectModal"

// components
import { BaseButton, BaseInput, BaseText, BaseTextArea } from "../../atoms"

const projectInfoStyle = css`
  p:nth-child(2) {
    margin: 18px 0 20px 0;
  }
  display: flex;
`

const projectMenuContainerStyle = css`
  svg {
    margin-left: auto;
  }
  font-size: 1.8rem;
  margin-left: auto;
  display: flex;
  flex-direction: column;
`

const projectMenuButtonStyle = (isActive) => css`
  display: ${isActive ? "flex" : "none"};
  flex-direction: column;
`

const ProjectInfo: FC = () => {
  const { selectedProject } = useProjectContext()
  const [editMode, setEditMode] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)

  const onClickProjectMenu = () => {
    setIsMenuActive(!isMenuActive)
    if (isMenuActive == true) {
      setEditMode(false)
    }
  }

  return (
    <>
      {selectedProject && (
        <div css={projectInfoStyle}>
          <div>
            {editMode ? (
              <BaseInput type="text" value={selectedProject.name} />
            ) : (
              <BaseText text={selectedProject.name} size="2.1rem" optionStyles="bold" />
            )}

            {editMode ? (
              <BaseTextArea value={selectedProject.description} onChangeText={() => []} />
            ) : (
              <BaseText
                text={selectedProject.description}
                color={Colors.lightGray}
                optionStyles="sizeS"
              />
            )}
          </div>
          <div css={projectMenuContainerStyle}>
            <FontAwesomeIcon icon={faEllipsisH} onClick={onClickProjectMenu} />
            <div css={projectMenuButtonStyle(isMenuActive)}>
              <BaseButton
                text="Update Project"
                bgColor={Colors.purple}
                onClickButton={() => setEditMode(true)}
              />
              <DeleteProjectModal />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectInfo
