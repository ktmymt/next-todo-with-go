import { FC } from "react"
import BaseText from "../../atoms/BaseText"
import ProjectCard from "./ProjectCard"

import { projects, IProject } from "../../../types/Project"
import { css } from "@emotion/react"

const projectCardListStyle = css`
  display: flex;
  justify-content: space-between;
`

const ProjectCardList: FC = () => {
  return (
    <div>
      <BaseText text="Projects" styles="white" />
      <div css={projectCardListStyle}>
        {projects.map((project: IProject) => {
          return <ProjectCard key={project.id} project={project} />
        })}
      </div>
    </div>
  )
}

export default ProjectCardList
