import { FC } from "react"
import { css } from "@emotion/react"

import { ProjectInfo } from "../organisms/Project"
import { TodoList } from "../organisms/Todo"

import { Colors } from "../../styles/colors"

const todoSideStyle = css`
  background-color: ${Colors.white2};
  width: 50vw;
  height: 96vh;
  margin: 22px;
  border-radius: 20px;
  overflow: auto;
`

const todoSideContainerStyle = css`
  padding: 100px;
`

const TodoSide: FC = () => {
  return (
    <div css={todoSideStyle}>
      <div css={todoSideContainerStyle}>
        <ProjectInfo />
        <div>
          <TodoList title="Today" />
          <TodoList title="Upcoming" />
        </div>
      </div>
    </div>
  )
}

export default TodoSide
