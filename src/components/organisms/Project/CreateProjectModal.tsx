import { FC, useState } from "react"
import Modal from "react-modal"
import { BaseButton, BaseInput, BaseTextArea, BaseText } from "../../atoms"
import { Colors } from "../../../styles/colors"
import { css } from "@emotion/react"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

// for modal
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "400px",
    height: "600px",
    backgroundColor: "#3D3D40",
    borderStyle: "none",
    borderRadius: "20px",
    color: "#fff",
    transform: "translate(-50%, -50%)",
    transitionProperty: "background-color, width, height",
    transitionDuration: "500ms",
    transitionTimingFunction: "ease-in-out",
  },
}

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
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectColor, setProjectColor] = useState("")

  const onClickModalOpen = () => {
    setModalIsOpen(true)
    resetErrorsState()
  }

  const onClickCreate = async () => {
    const statusCode = await createProject(projectTitle, projectDescription, projectColor)
    if (statusCode != 400) setModalIsOpen(false)
    setProjectColor("")
  }

  const onClickModalClose = () => {
    setModalIsOpen(false)
    setProjectColor("")
  }

  return (
    <>
      <BaseButton text="+" bgColor={Colors.purple} onClickButton={onClickModalOpen} />
      <Modal isOpen={modalIsOpen} onRequestClose={onClickModalClose} style={customStyles}>
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
          <BaseButton text="Close" bgColor={Colors.offWhite} onClickButton={onClickModalClose} />
          <BaseButton
            text="Create"
            bgColor={Colors.purple}
            textColor={Colors.white}
            onClickButton={onClickCreate}
          />
        </div>
      </Modal>
    </>
  )
}

export default CreateProjectModal
