import { FC, Fragment, useState } from "react"
import Modal from "react-modal"
import { BaseButton } from "../../atoms"
import ProjectCard from "./ProjectCard"
import { Colors } from "../../../styles/colors"
import { css } from "@emotion/react"
import { IProject } from "../../../types/Project"
import { useProjectContext } from "../../../contexts/ProjectContext"

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

const moreProjectsStyle = css`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto;

  button {
    @media screen and (min-width: 500px) {
      width: 120px;
      height: 120px;
    }

    @media screen and (min-width: 800px) {
      width: 90px;
      height: 90px;
      font-size: 1.4rem;
      top: 10px;
    }

    @media screen and (min-width: 1326px) {
      width: 110px;
      height: 110px;
      font-size: 1.5rem;
      top: 17px;
    }

    @media screen and (min-width: 1441px) {
      width: 125px;
      height: 125px;
      font-size: 1.6rem;
      top: 15px;
    }

    @media screen and (min-width: 1600px) {
      width: 135px;
      height: 135px;
      font-size: 1.8rem;
      top: 20px;
    }
    border-radius: 23px;
    text-align: center;
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

  return (
    <Fragment>
      <div css={moreProjectsStyle}>
        <BaseButton
          text={projects.length - 5 + "+"}
          textColor={Colors.white}
          bgColor={Colors.lightGray}
          onClickButton={() => setModalIsOpen(true)}
        />
      </div>
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
    </Fragment>
  )
}

export default MoreProjectsModal
