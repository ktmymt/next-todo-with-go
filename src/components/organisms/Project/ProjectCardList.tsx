import { FC } from "react"
import { BaseText } from "../../atoms"
import ProjectCreateModal from "./ProjectCreateModal"
import ProjectCard from "./ProjectCard"

import { IProject } from "../../../types/Project"
import { css } from "@emotion/react"
import { Colors } from "../../../styles/colors"

interface Props {
  projects: IProject[]
  projectSelected: IProject
  onClickProject: (project: IProject) => void
}

const projectCardListContainerStyle = css`
  margin-top: 100px;
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

const projectCardListContentStyle = css`
  display: flex;
  justify-content: space-between;
`

const ProjectCardList: FC<Props> = (props) => {
  return (
    <div css={projectCardListContainerStyle}>
      <div css={projectCardListHeaderStyle}>
        <BaseText text="Projects" styles="white sizeM" />
        <span>({props.projects.length})</span>
        <ProjectCreateModal />
      </div>

      <div css={projectCardListContentStyle}>
        {props.projects.map((project: IProject) => {
          return (
            <ProjectCard
              key={project.id}
              project={project}
              onClickProject={props.onClickProject}
              isSelected={project == props.projectSelected}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ProjectCardList
