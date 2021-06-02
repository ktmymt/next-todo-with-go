import { FC, useState } from "react"
import Modal from "react-modal"
import { BaseButton, BaseInput, BaseTextArea } from "../../atoms"
import { Colors } from "../../../styles/colors"

// スタイリング
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
    width: "500px",
    height: "300px",
    transform: "translate(-50%, -50%)",
  },
}

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
      <BaseButton text="+" color={Colors.purple} onClickButton={openModal} />
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <h2>Create a Workspace</h2>
        <BaseInput type="text" onChangeText={onChangeInput} />
        <BaseTextArea
          placeholder="Write some description for your workspace"
          onChangeText={onChangeInput}
        />
        <BaseButton text="Create" color={Colors.purple} onClickButton={onClickButton} />
        <BaseButton text="Close" color={Colors.white} onClickButton={closeModal} />
      </Modal>
    </>
  )
}

export default ProjectCreateModal
