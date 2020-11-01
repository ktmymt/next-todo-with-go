import React, { FC } from "react"

// styles
import { ProjectSideContainer } from "../../styles/ProjectSide.styles"

const ProjectSide: FC = () => {
  return (
    <ProjectSideContainer>
      <h2 className="text-4xl text-white">Hi Kota.</h2>
      <p className="text-gray-700">Welcome back to the workspace. We missed you!</p>
      <input
        type="text"
        className="bg-gray-700 text-gray-500 rounded"
        placeholder="Search Task or Project..."
      />
    </ProjectSideContainer>
  )
}

export default ProjectSide
