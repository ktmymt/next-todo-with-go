import { FC, Fragment, useState } from "react"
import Image from "next/image"
import { css } from "@emotion/react"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { signOut } from "next-auth/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import DeleteProjectModal from "./DeleteProjectModal"
import AddUserToProjectModal from "./AddUserToProjectModal"
import { Colors } from "../../../styles/colors"
import { BaseButton, BaseText } from "../../atoms"
import { useUserContext } from "../../../contexts/UserContext"

const projectInfoContainerStyle = css`
  p:nth-child(2) {
    margin-top: 16px;
  }
  display: flex;
`

const projectInfoStyle = css`
  display: flex;
  flex-direction: column;

  input {
    font-size: 2.1rem;
  }

  textarea {
    margin-top: 10px;
    font-size: 1rem;
  }
`

const inEditProjectButtonStyle = css`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;

  button {
    width: 40%;
  }

  button:nth-child(2) {
    color: ${Colors.white};
  }
`

const projectMenuContainerStyle = css`
  svg {
    margin-left: auto;
  }
  font-size: 1.8rem;
  margin-left: auto;
  margin-top: -30px;
  display: flex;
  flex-direction: column;
`

const projectMenuButtonStyle = (isActive: boolean) => css`
  display: ${isActive ? "flex" : "none"};
  flex-direction: column;
  position: absolute;
  top: 100px;
  right: 100px;

  button {
    font-size: 1rem;
    padding: 10px 20px 10px 20px;
  }

  button:hover {
    color: ${Colors.blue};
  }
`

const userIconContainerStyle = css`
  margin-left: auto;
`

const userIconStyle = css`
  border-radius: 30px;
`

const ProjectInfo: FC = () => {
  const { user } = useUserContext()
  const { selectedProject, refreshProjects, updateProject } = useProjectContext()
  const [editMode, setEditMode] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")

  const myLoader = ({ src }) => {
    return src
  }

  const onClickProjectMenu = () => {
    setProjectName(selectedProject.name)
    setProjectDescription(selectedProject.description)
    setIsMenuActive(true)
  }

  const onMouseLeave = () => {
    setIsMenuActive(false)
  }

  const onClickSave = async () => {
    const code = await updateProject(
      selectedProject.id,
      projectName,
      projectDescription,
      selectedProject.color,
    )
    if (code == 200) {
      setEditMode(false)
      refreshProjects(user.id)
    }
  }

  const onClickUpdateProject = () => {
    setEditMode(true)
    setIsMenuActive(false)
  }

  return (
    <Fragment>
      {selectedProject && (
        <div css={projectInfoContainerStyle}>
          <div css={projectInfoStyle}>
            {editMode ? (
              <Fragment>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <textarea
                  onChange={(e) => setProjectDescription(e.target.value)}
                  defaultValue={selectedProject.description}
                ></textarea>
                <div css={inEditProjectButtonStyle}>
                  <BaseButton
                    text="Cancel"
                    bgColor={Colors.veryLightGray}
                    onClickButton={() => setEditMode(false)}
                  />
                  <BaseButton text="Save" bgColor={Colors.purple} onClickButton={onClickSave} />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <BaseText text={selectedProject.name} size="2.1rem" optionStyles="bold" />
                <BaseText
                  text={selectedProject.description}
                  color={Colors.lightGray}
                  optionStyles="sizeS"
                />
              </Fragment>
            )}
          </div>
          <div css={userIconContainerStyle}>
            <Image
              loader={myLoader}
              src={user.image}
              alt="user picture"
              width={55}
              height={55}
              css={userIconStyle}
            />
            {selectedProject.users.map((user) => {
              return (
                <Image
                  key={user.email}
                  loader={myLoader}
                  src={user.image}
                  alt="user picture"
                  width={55}
                  height={55}
                  css={userIconStyle}
                />
              )
            })}
          </div>
          <div css={projectMenuContainerStyle} onMouseLeave={onMouseLeave}>
            <FontAwesomeIcon icon={faEllipsisH} onMouseEnter={onClickProjectMenu} />
            <div css={projectMenuButtonStyle(isMenuActive)}>
              <BaseButton
                text="Update Project"
                bgColor={Colors.white}
                onClickButton={onClickUpdateProject}
              />
              <DeleteProjectModal closeMenu={() => setIsMenuActive(false)} />
              <AddUserToProjectModal closeMenu={() => setIsMenuActive(false)} />
              <BaseButton text="Sign out" bgColor={Colors.white} onClickButton={() => signOut()} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ProjectInfo
