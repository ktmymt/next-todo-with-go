import { NextPage } from 'next'

type Props = {
  todos: Todo[]
}

type Todo = {
  id: Number
  title: string;
  description: string;
}

const Home: NextPage<Props> = props => {
  const TodoList = () => (
      <ul>
        {props.todos.map(todo => {
          {console.log(todo)}
          <li>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
          </li>
        })}
      </ul>
  )

  return (
    <div>
      <TodoList />
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:8000/todos');
  const json = await res.json();
  return {
    todos: json.data.map(todo => todo)
  };
}

export default Home;
