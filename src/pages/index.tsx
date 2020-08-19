import { NextPage } from 'next'

interface Props {
  data: {
    title: string;
    description: string;
  }
}

const Home: NextPage<Props> = props => {
  console.log(props);
  return (
    <div>
      <p>{props.data.title}</p>
      <p>{props.data.description}</p>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:8000/todo');
  const json = await res.json();
  return {
    data: {
      title: json.title,
      description: json.descritpion
    }
  };
}

export default Home;
