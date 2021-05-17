import { FC } from "react"
import { css } from "@emotion/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

// components
import { BaseText } from "../../atoms"

// types
import { ITodo } from "../../../types/Todo"
interface Props {
  todo: ITodo
}

// styles
const todoContainer = css``

const Todo: FC<Props> = (props) => {
  return (
    <div css={todoContainer}>
      <FontAwesomeIcon icon={faChevronRight} />
      <BaseText text={props.todo.title} styles="" />
    </div>
  )
}

export default Todo
