import { FC, useState } from "react"
import TodoList from "./TodoList"

const TodoInput: FC = () => {
  const [inputTodo, setInputTodo] = useState("")

  const handleInput = (e) => {
    setInputTodo(e.target.value)
  }

  const addTodo = () => {
    fetch("http://localhost:8000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputTodo,
      }),
    }).then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
      <input type="text" placeholder="write something" onChange={handleInput} />
      <button onClick={addTodo}>Add</button>
    </div>
  )
}

export default TodoInput
