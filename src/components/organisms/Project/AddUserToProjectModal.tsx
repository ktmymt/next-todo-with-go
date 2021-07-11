import { FC, Fragment, useState } from "react"
import Modal from "react-modal"
import { BaseButton, BaseInput, BaseText } from "../../atoms"
import { Colors } from "../../../styles/colors"
import { css } from "@emotion/react"

interface Props {
  closeMenu: () => void
}

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
    width: "500px",
    height: "300px",
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

const modalAreaStyle = (validated: boolean) => css`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin-left: 10px;
  position: relative;
  padding-top: 10px;

  input {
    position: absolute;
    top: 70px;
    width: 90%;
    background-color: ${Colors.lightGray};
  }

  p:nth-child(3) {
    display: ${validated ? "none" : "block"};
    position: absolute;
    top: 140px;
    left: 120px;
  }

  button {
    font-size: 1rem;
    width: 40%;
    height: 55px;
    border-radius: 20px;
    margin: 0 auto;
    position: absolute;
    top: 220px;
    left: 140px;
  }
`

const AddUserToProjectModal: FC<Props> = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [inputEmail, setInputEmail] = useState("")
  const [validated, setValidated] = useState(true)

  const onClickAddUser = () => {
    props.closeMenu
    setModalIsOpen(true)
  }

  const onClickAdd = () => {
    if (inputEmail.includes("@")) {
      setValidated(true)
      // add project to email

      setModalIsOpen(false)
    } else {
      setValidated(false)
    }
  }

  const onChangeInputEmail = (text: string) => {
    setValidated(true)
    setInputEmail(text)
  }

  return (
    <Fragment>
      <BaseButton text="Add User" bgColor={Colors.white} onClickButton={onClickAddUser} />
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
        <div css={modalAreaStyle(validated)}>
          <BaseText text="Add people to your project" size="1.4rem" />
          <BaseInput type="text" placeholder="taski@email.com" onChangeText={onChangeInputEmail} />
          <BaseText text="Please enter correct email" />
          <BaseButton text="Add" bgColor={Colors.white} onClickButton={onClickAdd} />
        </div>
      </Modal>
    </Fragment>
  )
}

export default AddUserToProjectModal
