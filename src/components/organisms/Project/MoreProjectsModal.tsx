import { FC, useState } from "react"
import Modal from "react-modal"
import { BaseButton } from "../../atoms"
import ProjectCard from "./ProjectCard"
import { Colors } from "../../../styles/colors"
import { css } from "@emotion/react"
import { IProject } from "../../../types/Project"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { useWindowDimensions } from "../../../hooks/windowSize"

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
    width: "1000px",
    height: "800px",
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

const moreProjectsStyle = (leftAndRight: string) => css`
  button {
    width: 128px;
    height: 128px;
    margin: 10px ${leftAndRight};
    border-radius: 23px;
    text-align: center;
    font-size: 1.8rem;
  }
`

const projectCardListStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const projectCardContainerStyle = css`
  width: 120px;
  margin: 40px;
`

const MoreProjectsModal: FC = () => {
  const { projects, selectedProject } = useProjectContext()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { width } = useWindowDimensions()

  const responseModalButton = () => {
    if (width <= 1585 && width >= 1462) {
      return "60px"
    }
    if (width <= 1461) {
      return "40px"
    }
  }

  return (
    <div css={moreProjectsStyle(responseModalButton())}>
      <BaseButton
        text={projects.length - 5 + "+"}
        textColor={Colors.white}
        bgColor={Colors.lightGray}
        onClickButton={() => setModalIsOpen(true)}
      />
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles}>
        <div css={projectCardListStyle}>
          {projects.map((project: IProject, index: number) => {
            return (
              <div
                key={project.id}
                css={projectCardContainerStyle}
                onClick={() => setModalIsOpen(false)}
              >
                <ProjectCard
                  project={project}
                  isSelected={project == selectedProject}
                  projectIndex={index}
                />
              </div>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}

export default MoreProjectsModal
