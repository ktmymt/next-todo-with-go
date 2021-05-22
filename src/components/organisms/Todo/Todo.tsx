import { FC, useState } from "react"
import { css } from "@emotion/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { Colors } from "../../../styles/colors"

// components
import { BaseText } from "../../atoms"

// types
import { ITodo } from "../../../types/Todo"
interface Props {
  todo: ITodo
}

// styles
const todoContainer = css`
  display: flex;
`

const iconStyle = css`
  padding: 10;
  font-size: 2rem;
  margin-right: 30px;
`

const checkIconStyle = (isDone: boolean) => css`
  ${iconStyle}
  color: ${Colors.lightGreen};
  display: ${isDone ? "block" : "none"};
`

const circleIconStyle = (isDone: boolean) => css`
  ${iconStyle}
  color: ${Colors.veryLightGray};
  display: ${isDone ? "none" : "block"};
`

const Todo: FC<Props> = (props) => {
  return (
    <div css={todoContainer}>
      <FontAwesomeIcon icon={faCheckCircle} css={checkIconStyle(props.todo.isDone)} />
      <FontAwesomeIcon icon={faCircle} css={circleIconStyle(props.todo.isDone)} />
      <BaseText text={props.todo.title} styles="" />
    </div>
  )
}

export default Todo
