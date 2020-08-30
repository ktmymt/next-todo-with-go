import Todo from "./Todo";

const TodoList = props => {
  return(
    <div>
      <ul>
       { Object.values(props.todos).map((todo: Todo, index) => {
          return (
            <li key={index}>
              <Todo title={todo.title} isDone={todo.isDone}/>
            </li>
          )
        }) }   
      </ul>
    </div>
  )
}

export default TodoList;
