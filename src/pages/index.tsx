import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import BaseText from '../components/BaseText';

const Home = todos => {
  return (
    <div>
      <TodoInput />
      <BaseText text="Today" className="today" />
      <TodoList todos={todos} />
      <BaseText text="Upcoming" className="upcoming" />
      <TodoList todos={todos} />
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:8000/api/todos");
  const json = await res.json();
  return json.data.map(todo => todo );
}

export default Home;
