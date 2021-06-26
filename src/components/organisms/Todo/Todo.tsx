import { FC, useState, useRef, useEffect } from "react"
import { css } from "@emotion/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-regular-svg-icons"
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Colors } from "../../../styles/colors"

// components
import { BaseText } from "../../atoms"

// types
import { ITodo, TODO_STATUS } from "../../../types/Todo"
import { useTodoContext } from "../../../contexts/TodoContext"
interface Props {
  todo: ITodo
}

// styles
const todoContainer = css`
  display: flex;
  line-height: 2.2;
`

const todoConfStyle = css`
  display: flex;
  margin-left: auto;
`

const checkIconStyle = (isDone: boolean) => css`
  padding: 10px;
  font-size: 1.8rem;
  margin-right: 20px;
  color: ${isDone ? Colors.lightGreen : Colors.veryLightGray};
`
const trashIconStyle = css`
  margin-left: 30px;
  margin-top: 15px;
  font-size: 1.1rem;
`

const statusLabelStyle = (colors) => css`
  background-color: ${colors.background};
  color: ${colors.text};
  padding: 1px 25px 1px 25px;
  margin-top: 10px;
  height: 0;
  border-radius: 20px;
  display: inline-table;
  text-align: center;
  font-size: 0.9rem;
  position: relative;
`

const statusSelectionStyle = css`
  position: absolute;
  width: 90px;
  z-index: 2;
  left: -7px;
  transform: scaleY(0);
  transform-origin: top;
  box-shadow: 1px 1px 8px ${Colors.offWhite};

  margin-top: 0.5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  transition: transform 0.2s;
`

const statusSelectionScaleStyle = css`
  ${statusSelectionStyle}
  transform: scaleY(1);
`

const statusSelectButtonStyle = (colors) => css`
  background-color: ${Colors.white};
  color: ${colors.text};
  border: none;
  width: 100%;
  font-size: 1rem;
  padding: 0;
  margin-top: 10px;

  :hover {
    border-bottom: ${Colors.offWhite} 1px solid;
  }
`

const Todo: FC<Props> = (props) => {
  const { todos, setTodosState, changeTodoActive, updateTodo, deleteTodo } = useTodoContext()
  const [isDone, setIsDone] = useState(false)
  const [isChangeStatus, setIsChangeStatus] = useState(false)
  const popupRef = useRef<any>()
  const documentClickHandler = useRef<any>()

  useEffect(() => {
    documentClickHandler.current = (e) => {
      if (popupRef.current.contains(e.target)) return

      setIsChangeStatus(false)
      removeDocumentClickHandler()
    }
  }, [])

  const removeDocumentClickHandler = () => {
    document.removeEventListener("click", documentClickHandler.current)
  }

  const handleToggleButtonClick = () => {
    if (isChangeStatus) return

    setIsChangeStatus(true)
    document.addEventListener("click", documentClickHandler.current)
  }

  const handleCloseButtonClick = (status: string) => {
    const schedule = status == TODO_STATUS.WAITING ? 1 : 0
    updateTodo({
      id: props.todo.id,
      projectId: props.todo.projectId,
      title: props.todo.title,
      isDone: props.todo.isDone,
      status: status,
      schedule: schedule,
    })
    // refresh todo
    setIsChangeStatus(false)
    removeDocumentClickHandler()
  }

  // check mark click event
  const onClickToggleCheck = () => {
    setIsDone(!isDone)
    changeTodoActive(props.todo.id)
    setTodosState(todos)
  }

  // status colors are stored in todo.ts
  const getTodoStatusColor = (status: string): { background: string; text: string } => {
    if (status == TODO_STATUS.APPROVED) {
      return Colors.todoStatus.approved
    }
    if (status == TODO_STATUS.PENDING) {
      return Colors.todoStatus.pending
    }
    if (status == TODO_STATUS.IN_PROGRESS) {
      return Colors.todoStatus.inProgress
    }
    if (status == TODO_STATUS.WAITING) {
      return Colors.todoStatus.waiting
    }
  }

  const onClickDelete = () => {
    deleteTodo(props.todo.id)
  }

  return (
    <div css={todoContainer}>
      <FontAwesomeIcon
        icon={isDone ? faCheckCircle : faCircle}
        css={checkIconStyle(isDone)}
        onClick={onClickToggleCheck}
      />
      <BaseText text={props.todo.title} size="1.2rem" color={Colors.veryDarkGray} />
      <div css={todoConfStyle}>
        <span
          css={statusLabelStyle(getTodoStatusColor(props.todo.status))}
          onClick={handleToggleButtonClick}
        >
          {props.todo.status}
          <div
            css={isChangeStatus ? statusSelectionScaleStyle : statusSelectionStyle}
            ref={popupRef}
          >
            {Object.entries(TODO_STATUS).map((status) => {
              if (status[1] != props.todo.status) {
                return (
                  <button
                    key={status[0]}
                    css={statusSelectButtonStyle(getTodoStatusColor(status[1]))}
                    onClick={() => handleCloseButtonClick(status[1])}
                  >
                    {status[1]}
                  </button>
                )
              }
            })}
          </div>
        </span>
        <FontAwesomeIcon icon={faTrash} css={trashIconStyle} onClick={onClickDelete} />
      </div>
    </div>
  )
}

export default Todo
