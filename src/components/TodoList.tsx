import Todo from "./Todo";

const TodoList = props => {
  return(
    <div>
      <ul>
       { props.todos.todos.map((todo, index) => {
          return (
            <li key={index}>
              <Todo title={todo.title} description={todo.description} isDone={todo.isDone}/>
            </li>
          )
        }) }   
      </ul>
    </div>
  )
}

export default TodoList;
