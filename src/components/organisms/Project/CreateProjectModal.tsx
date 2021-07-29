import { FC, Fragment, useState } from "react"
import Modal from "react-modal"
import { BaseButton, BaseInput, BaseTextArea, BaseText } from "../../atoms"
import { Colors } from "../../../styles/colors"
import { css, ClassNames } from "@emotion/react"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { useUserContext } from "../../../contexts/UserContext"

const inputAreaStyle = css`
  width: 100%;
  margin-left: 10px;

  input {
    margin-top: 30px;
    width: 140px;
  }
  textarea {
    margin-top: 45px;
  }
`

const colorButtonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 90%;
  line-height: 2;
  margin-top: 40px;
`

const colorButtonStyle = (color: string) => css`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${color};
  text-align: center;
  position: relative;
`

const selectedColorButtonStyle = (color: string) => css`
  ${colorButtonStyle(color)}
  ::after {
    content: "";
    width: 50px;
    height: 50px;
    border: 4px solid ${color};
    border-radius: 30px;
    position: absolute;
    top: -9px;
    left: -9px;
  }
`

const checkIconStyle = css`
  font-size: 1.2rem;
  color: ${Colors.black};
  margin-top: 10px;
`

const buttonStyle = css`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;

  button {
    width: 35%;
    height: 60px;
    border-radius: 20px;
    font-size: 1.1rem;
  }
`

const CreateProjectModal: FC = () => {
  const {
    createProject,
    projectNameError,
    projectDescriptionError,
    projectColorError,
    resetErrorsState,
  } = useProjectContext()
  const { user } = useUserContext()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectColor, setProjectColor] = useState("")

  const onClickModalOpen = () => {
    setModalIsOpen(true)
    resetErrorsState()
  }

  const onClickCreate = async () => {
    const statusCode = await createProject(user.id, projectTitle, projectDescription, projectColor)
    if (statusCode != 400) setModalIsOpen(false)
    setProjectColor("")
  }

  const onClickModalClose = () => {
    setModalIsOpen(false)
    setProjectColor("")
  }

  return (
    <Fragment>
      <BaseButton text="+" bgColor={Colors.purple} onClickButton={onClickModalOpen} />
      <ClassNames>
        {({ css, cx }) => (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={onClickModalClose}
            overlayClassName={{
              base: "overlay-base",
              afterOpen: "overlay-after",
              beforeClose: "overlay-before",
            }}
            className={{
              base: "content-base",
              afterOpen: "content-after",
              beforeClose: "content-before",
            }}
            closeTimeoutMS={500}
            portalClassName={css`
              .overlay-base {
                position: fixed;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                background-color: "rgba(0,0,0,0.3)";
                opacity: 0;
                transition-duration: 200ms;
                transition-timing-function: ease-in-out;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .overlay-after {
                background-color: rgba(0, 0, 0, 0.8);
                opacity: 1;
              }

              .overlay-before {
                opacity: 0;
              }

              .content-base {
                position: relative;
                top: auto;
                left: auto;
                right: auto;
                bottom: auto;
                overflow: auto;
                transition-duration: 100ms;
                transition-timing-function: ease-in-out;
              }

              .content-after {
                color: #fff;

                @media screen and (max-width: 1320px) {
                  width: 35%;
                }

                width: 20%;
                padding: 20px;
                border-radius: 20px;
                background-color: #3d3d40;
              }
            `}
          >
            <div css={inputAreaStyle}>
              <h2>Create a Workspace</h2>
              <BaseInput
                type="text"
                placeholder="Project Name"
                hasLabel={true}
                onChangeText={setProjectTitle}
              />
              <span>{projectNameError}</span>
              <div css={colorButtonContainerStyle}>
                <BaseText text="Color" size="1rem" color={Colors.lightGray} />
                {Object.entries(Colors.projectCards).map((color, index) => {
                  return (
                    <span
                      key={index}
                      css={
                        projectColor == color[0]
                          ? selectedColorButtonStyle(color[1])
                          : colorButtonStyle(color[1])
                      }
                      onClick={() => setProjectColor(color[0])}
                    >
                      {projectColor == color[0] ? (
                        <FontAwesomeIcon icon={faCheck} css={checkIconStyle} />
                      ) : (
                        ""
                      )}
                    </span>
                  )
                })}
              </div>
              <span>{projectColorError}</span>
              <BaseTextArea
                placeholder="Write some description for your workspace"
                onChangeText={setProjectDescription}
              />
            </div>
            <span>{projectDescriptionError}</span>
            <div css={buttonStyle}>
              <BaseButton
                text="Close"
                bgColor={Colors.offWhite}
                onClickButton={onClickModalClose}
              />
              <BaseButton
                text="Create"
                bgColor={Colors.purple}
                textColor={Colors.white}
                onClickButton={onClickCreate}
              />
            </div>
          </Modal>
        )}
      </ClassNames>
    </Fragment>
  )
}

export default CreateProjectModal
