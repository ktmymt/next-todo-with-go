import { FC, useState } from "react"
import Modal from "react-modal"
import { BaseButton, BaseInput, BaseTextArea, BaseText } from "../../atoms"
import { Colors } from "../../../styles/colors"
import { css } from "@emotion/react"

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
  },
}

const buttonStyle = css`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;

  button {
    width: 40%;
    border-radius: 20px;
  }
`

const ProjectCreateModal: FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const onChangeInput = (text: string) => {
    console.log(text)
  }

  const onClickButton = () => {
    console.log("hi")
  }
  return (
    <>
      <BaseButton text="+" bgColor={Colors.purple} onClickButton={openModal} />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <h2>Create a Workspace</h2>
        <div>
          <BaseInput type="text" hasLabel={true} onChangeText={onChangeInput} />
          <p>color</p>
          <BaseTextArea
            placeholder="Write some description for your workspace"
            onChangeText={onChangeInput}
          />
        </div>
        <div css={buttonStyle}>
          <BaseButton text="Close" bgColor={Colors.white} onClickButton={closeModal} />
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

export default ProjectCreateModal
