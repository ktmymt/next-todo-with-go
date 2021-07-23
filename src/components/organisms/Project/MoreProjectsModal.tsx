import { FC, Fragment, useState } from "react"
import Modal from "react-modal"
import { BaseButton } from "../../atoms"
import ProjectCard from "./ProjectCard"
import { Colors } from "../../../styles/colors"
import { css, ClassNames } from "@emotion/react"
import { IProject } from "../../../types/Project"
import { useProjectContext } from "../../../contexts/ProjectContext"

const moreProjectsStyle = css`
  margin-left: auto;
  margin-top: 10px;

  button {
    @media screen and (min-width: 500px) {
      width: 120px;
      height: 120px;
    }

    @media screen and (min-width: 800px) {
      width: 70px;
      height: 70px;
      font-size: 1.2rem;
      top: 10px;
    }

    @media screen and (min-width: 1200px) {
      width: 80px;
      height: 80px;
      font-size: 1.1rem;
      top: 17px;
    }

    @media screen and (min-width: 1326px) {
      width: 90px;
      height: 90px;
      font-size: 1.5rem;
      top: 17px;
    }

    @media screen and (min-width: 1441px) {
      width: 115px;
      height: 115px;
      font-size: 1.6rem;
      top: 15px;
    }

    @media screen and (min-width: 1600px) {
      width: 125px;
      height: 125px;
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

  @media screen and (min-width: 1024px) {
    padding: 10px 0;
  }

  @media screen and (min-width: 1440px) {
    padding: 10px 0;
  }

  @media screen and (min-width: 1680px) {
    padding: 10px 70px;
  }

  @media screen and (min-width: 1920px) {
    padding: 10px 30px;
  }
`

const projectCardContainerStyle = css`
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
      <ClassNames>
        {({ css, cx }) => (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
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
                transition-duration: 200ms;
                transition-timing-function: ease-in;
              }

              .content-after {
                width: 60%;
                height: 65%;
                border-radius: 20px;
                background-color: #3d3d40;
              }
            `}
          >
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
        )}
      </ClassNames>
    </Fragment>
  )
}

export default MoreProjectsModal
