import { FC } from "react"
import BaseText from "../../atoms/BaseText"
import ProjectCard from "./ProjectCard"

import { IProject } from "../../../types/Project"
import { css } from "@emotion/react"
import { Colors } from "../../../styles/colors"

interface Props {
  projects: IProject[]
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
`

const projectCardListContentStyle = css`
  display: flex;
  justify-content: space-between;
`

const ProjectCardList: FC<Props> = (props) => {
  const recentActiveProjects = props.projects.sort((a, b) => {
    return a.active_at > b.active_at ? 1 : -1
  })

  return (
    <div css={projectCardListContainerStyle}>
      <div css={projectCardListHeaderStyle}>
        <BaseText text="Projects" styles="white sizeM" />
        <span>({props.projects.length})</span>
      </div>

      <div css={projectCardListContentStyle}>
        {recentActiveProjects.map((project: IProject) => {
          return <ProjectCard key={project.id} project={project} />
        })}
      </div>
    </div>
  )
}

export default ProjectCardList
