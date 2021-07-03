import { FC } from "react"
import { css } from "@emotion/react"
import { motion } from "framer-motion"
import { ProjectInfo } from "../organisms/Project"
import { TodoList } from "../organisms/Todo"
import { useProjectContext } from "../../contexts/ProjectContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHandPointLeft } from "@fortawesome/free-regular-svg-icons"
import { Colors } from "../../styles/colors"

const todoSideStyle = css`
  background-color: ${Colors.white2};
  width: 50vw;
  height: 96vh;
  margin: 22px;
  border-radius: 20px;
  overflow: auto;
  position: relative;
`

const todoSideContainerStyle = css`
  padding: 100px;
`

const facilitateMessageStyle = css`
  font-size: 3.2rem;
  position: absolute;
  top: 30%;
  left: 15%;
`

const TodoSide: FC = () => {
  const { selectedProject } = useProjectContext()

  return (
    <div css={todoSideStyle}>
      {selectedProject && (
        <div css={todoSideContainerStyle}>
          <ProjectInfo />
          <div>
            <TodoList title="Today" />
            <TodoList title="Upcoming" />
          </div>
        </div>
      )}
      {!selectedProject && (
        <div css={facilitateMessageStyle}>
          Create your first Project!{" "}
          <motion.div
            style={{ fontSize: "5rem" }}
            animate={{
              x: [0, 40, 0],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <FontAwesomeIcon icon={faHandPointLeft} />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default TodoSide
