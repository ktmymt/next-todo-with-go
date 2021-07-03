import { FC, Fragment, useState } from "react"
import Modal from "react-modal"
import { useSession } from "next-auth/client"
import { BaseButton, BaseText } from "../../atoms"
import { Colors } from "../../../styles/colors"
import { css } from "@emotion/react"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { useTodoContext } from "../../../contexts/TodoContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

interface Props {
  test: boolean
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

const modalAreaStyle = css`
  text-align: center;
  width: 100%;
  margin-left: 10px;
`

const iconStyle = css`
  font-size: 3.2rem;
`

const buttonStyle = css`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;

  button {
    width: 45%;
    height: 70px;
    border-radius: 15px;
  }
`

const DeleteProjectModal: FC<Props> = (props) => {
  const [session] = useSession()
  const { selectedProject, deleteProject, refreshProjects } = useProjectContext()
  const { refreshTodos } = useTodoContext()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isDeleteClicked, setIsDeleteClicked] = useState(false)

  const onClickDelete = async () => {
    const code = await deleteProject(selectedProject.id)
    if (code == 200) {
      refreshProjects(session.user.email)
    }
    refreshTodos(selectedProject.id)
    setModalIsOpen(false)
    setIsDeleteClicked(true)
  }

  return (
    <Fragment>
      <Modal
        isOpen={isDeleteClicked ? modalIsOpen : props.test}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div css={modalAreaStyle}>
          <FontAwesomeIcon icon={faExclamationTriangle} css={iconStyle} />
          <h2>Warning</h2>
          <BaseText text="Do you really want to delete this project?" />
          <div css={buttonStyle}>
            <BaseButton
              text="Cancel"
              bgColor={Colors.lightGray}
              textColor={Colors.white}
              onClickButton={() => setModalIsOpen(false)}
            />
            <BaseButton
              text="Delete"
              bgColor={Colors.red}
              textColor={Colors.white}
              onClickButton={onClickDelete}
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default DeleteProjectModal
