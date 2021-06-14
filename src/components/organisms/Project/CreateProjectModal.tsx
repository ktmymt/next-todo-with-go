import { FC, useState } from "react"
import Modal from "react-modal"
import { BaseButton, BaseInput, BaseTextArea, BaseText } from "../../atoms"
import { Colors } from "../../../styles/colors"
import { css } from "@emotion/react"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { getAxiosInstance } from "../../../modules/request"

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
    height: "500px",
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
  margin-top: 30px;
`

const colorButtonStyle = (color: string) => css`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${color};
`

const buttonStyle = css`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;

  button {
    width: 35%;
    height: 50px;
    border-radius: 20px;
  }
`

const CreateProjectModal: FC = () => {
  const { createProject, refreshProjects } = useProjectContext()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [projectTitle, setProjectTitle] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectColor, setProjectColor] = useState("")

  const onClickButton = async () => {
    createProject(projectTitle, projectDescription, projectColor)
    setModalIsOpen(false)
  }

  return (
    <>
      <BaseButton text="+" bgColor={Colors.purple} onClickButton={() => setModalIsOpen(true)} />
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
        <div css={inputAreaStyle}>
          <h2>Create a Workspace</h2>
          <BaseInput
            type="text"
            placeholder="Workspace Name"
            hasLabel={true}
            onChangeText={setProjectTitle}
          />
          <div css={colorButtonContainerStyle}>
            <BaseText text="Color" size="1.0rem" color={Colors.lightGray} />
            {Object.entries(Colors.projectCards).map((color, index) => {
              return (
                <span
                  key={index}
                  css={colorButtonStyle(color[1])}
                  onClick={() => setProjectColor(color[0])}
                ></span>
              )
            })}
          </div>
          <BaseTextArea
            placeholder="Write some description for your workspace"
            onChangeText={setProjectDescription}
          />
        </div>
        <div css={buttonStyle}>
          <BaseButton
            text="Close"
            bgColor={Colors.white}
            onClickButton={() => setModalIsOpen(false)}
          />
          <BaseButton
            text="Create"
            bgColor={Colors.purple}
            textColor={Colors.white}
            onClickButton={onClickButton}
          />
        </div>
      </Modal>
    </>
  )
}

export default CreateProjectModal
