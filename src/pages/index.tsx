import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList'

const Home = todos => {
  return (
    <div>
      <TodoInput />
      <TodoList todos={todos}/>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:8000/api/todos");
  const json = await res.json();
  return json.data.map(todo => todo );
}

export default Home;
