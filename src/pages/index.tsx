import TodoList from '../components/TodoList'

const Home = todos => {
  return (
    <div>
      <TodoList todos={todos}/>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:8000/todos");
  const json = await res.json();
  return { todos: json.data.map(todo => todo )};
}

export default Home;
