import { FC } from "react"
import { BaseText } from "../../atoms"
import CreateProjectModal from "./CreateProjectModal"
import MoreProjectsModal from "./MoreProjectsModal"
import ProjectCard from "./ProjectCard"

import { IProject } from "../../../types/Project"
import { css } from "@emotion/react"
import { Colors } from "../../../styles/colors"
import { useProjectContext } from "../../../contexts/ProjectContext"
import { useWindowDimensions } from "../../../hooks/windowSize"

const projectCardListContainerStyle = css`
  margin-top: 90px;
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
    margin-right: auto;
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

const projectCardContainerStyle = (leftAndRight: string) => css`
  margin: 10px ${leftAndRight};
`

const ProjectCardList: FC = () => {
  const { projects, selectedProject } = useProjectContext()
  const { width } = useWindowDimensions()

  // responsible対応
  const makeProjectCardResponsible = (index: number) => {
    if (width <= 1585 && width >= 1462) {
      return "60px"
    }
    if (width <= 1461) {
      return "40px"
    }
    if (projects.length == 2 && index == 0) {
      return "30px"
    }
    if (projects.length == 2 && index == 1) {
      return "30px"
    }
    if (projects.length >= 3 && index == 1) {
      return "auto"
    }
    if (projects.length >= 5 && index == 4) {
      return "auto"
    }
  }

  return (
    <div css={projectCardListContainerStyle}>
      <div css={projectCardListHeaderStyle}>
        <BaseText text="Projects" color={Colors.white} optionStyles="sizeM" />
        <span>({projects && projects.length})</span>
        <CreateProjectModal />
      </div>

      {projects.length > 0 && (
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
