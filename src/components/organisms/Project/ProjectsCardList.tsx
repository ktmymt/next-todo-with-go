import { FC } from "react"
import { BaseText } from "../../atoms"
import CreateProjectModal from "./CreateProjectModal"
import MoreProjectsModal from "./MoreProjectsModal"
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

const projectCardListStyle = css`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const projectCardContainerStyle = css`
  margin: 10px 21px;
`

const ProjectCardList: FC<Props> = (props) => {
  return (
    <div css={projectCardListContainerStyle}>
      <div css={projectCardListHeaderStyle}>
        <BaseText text="Projects" color={Colors.white} optionStyles="sizeM" />
        <span>({props.projects.length})</span>
        <CreateProjectModal />
      </div>

      <div css={projectCardListStyle}>
        {props.projects.slice(0, 5).map((project: IProject) => {
          return (
            <div css={projectCardContainerStyle} key={project.id}>
              <ProjectCard
                project={project}
                onClickProject={props.onClickProject}
                isSelected={project == props.projectSelected}
              />
            </div>
          )
        })}
        {props.projects.length >= 5 && (
          <MoreProjectsModal
            num={props.projects.length - 5}
            projects={props.projects}
            onClickProject={props.onClickProject}
          />
        )}
      </div>
    </div>
  )
}

export default ProjectCardList
