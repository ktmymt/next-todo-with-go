import { FC } from "react"
import { css } from "@emotion/react"

// styles
const projectSideStyle = css`
  background-color: #262a40;
  color: #3c3f53;
`

const ProjectSide: FC = () => {
  return (
    <div css={projectSideStyle}>
      <h2 className="text-4xl text-white">Hi Kota.</h2>
      <p className="text-gray-700">Welcome back to the workspace. We missed you!</p>
      <input
        type="text"
        className="bg-gray-700 text-gray-500 rounded"
        placeholder="Search Task or Project..."
      />
    </div>
  )
}

export default ProjectSide
