import { FC } from "react"
import { BaseText } from "../../atoms"
import CreateProjectModal from "./CreateProjectModal"
import MoreProjectsModal from "./MoreProjectsModal"
import ProjectCard from "./ProjectCard"

import { IProject } from "../../../types/Project"
import { css } from "@emotion/react"
import { Colors } from "../../../styles/colors"
import { useProjectContext } from "../../../contexts/ProjectContext"

const projectCardListContainerStyle = css`
  margin-top: 60px;
  width: 75%;
`

const projectCardListHeaderStyle = css`
  display: flex;
  flex-direction: row;
  p {
    margin-bottom: 40px;
    margin-right: 10px;
  }

  span {
    color: ${Colors.lightGray};
  }

  button {
    color: ${Colors.white};
    height: 50px;
    width: 50px;
    font-size: 1.6rem;
    border-radius: 15px;
    margin: 0 0 0 auto;
  }
`

const projectCardListStyle = css`
  display: flex;
  flex-wrap: wrap;
`

const projectCardContainerStyle = (leftAndRight) => css`
  ${leftAndRight};
`

const ProjectCardList: FC = () => {
  const { projects, selectedProject } = useProjectContext()

  // responsible対応
  const makeProjectCardResponsible = (index: number) => {
    if (index == 0) {
      return css`
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: auto;
      `
    }
    if (index == 1) {
      return css`
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 20px;
        margin-right: 20px;
      `
    }
    if (index == 2) {
      return css`
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: auto;
      `
    }
    if (index == 3) {
      return css`
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: auto;
      `
    }
    if (index == 4) {
      return css`
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 20px;
        margin-right: 20px;
      `
    }
  }

  return (
    <div css={projectCardListContainerStyle}>
      <div css={projectCardListHeaderStyle}>
        <BaseText text="Projects" color={Colors.white} optionStyles="sizeM" />
        <span>({projects && projects.length})</span>
        <CreateProjectModal />
      </div>

      {projects && projects.length > 0 && (
        <div css={projectCardListStyle}>
          {projects.slice(0, 5).map((project: IProject, index: number) => {
            return (
              <div
                css={projectCardContainerStyle(makeProjectCardResponsible(index))}
                key={project.id}
              >
                <ProjectCard project={project} isSelected={project == selectedProject} />
              </div>
            )
          })}
          {projects.length >= 5 && <MoreProjectsModal />}
        </div>
      )}
    </div>
  )
}

export default ProjectCardList
