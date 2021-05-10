import { FC } from "react"
import BaseText from "../../atoms/BaseText"
import ProjectCard from "./ProjectCard"

import { projects, IProject } from "../../../types/Project"
import { css } from "@emotion/react"

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
    color: #696c7b;
  }
`

const projectCardListContentStyle = css`
  display: flex;
  justify-content: space-between;
`

const ProjectCardList: FC = () => {
  return (
    <div css={projectCardListContainerStyle}>
      <div css={projectCardListHeaderStyle}>
        <BaseText text="Projects" styles="white sizeM" />
        <span>(13)</span>
      </div>

      <div css={projectCardListContentStyle}>
        {projects.map((project: IProject) => {
          return <ProjectCard key={project.id} project={project} />
        })}
      </div>
    </div>
  )
}

export default ProjectCardList