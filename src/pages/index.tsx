import ProjectSide from '../components/ProjectSide';
import TodoSide from '../components/TodoSide';

const Home = todos => {
  return (
    <div>
      <ProjectSide />
      <TodoSide todos={todos} /> 
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:8000/api/todos");
  const json = await res.json();
  return json.data.map(todo => todo );
}

export default Home;
