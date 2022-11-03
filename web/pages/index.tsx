interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {

  return (
    <div>
      <h1>Hello World</h1>
      <h1>{props.count}</h1>
    </div>
  )
}


//serve pra executar no serverSide do Next para construir a interface
export const getServerSideProps = async () => {
  const response = await fetch("http://127.0.0.1:3333/pools/count");
  const data = await response.json();

  console.log(data.count);


  return {
    props : {
      count: data.count
    }
  }
}
