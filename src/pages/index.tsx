import { NextPage } from 'next'

 interface Props {
  todos: Todo[]
}

type Todo = {
  id: string;
  title: string;
  description: string;
}

const Home: NextPage<Props> = props => {
  return (
    <div>
      <ul>
        {props.todos.map((todo, index) => {
          return (
            <li key={index}>
              <p>{todo.title}</p>
              <p>{todo.description}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:8000/todos');
  const json = await res.json();
  return { todos: json.data.map(todo => todo) };
}

export default Home;
