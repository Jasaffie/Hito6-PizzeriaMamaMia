import Header from "../components/Header.jsx";
import CardPizza from "../components/CardPizza.jsx";
import { useContext } from "react";
import { PizzasContext } from "../context/PizzasContext.jsx";

const Home = () => {
   const { data } = useContext(PizzasContext)

  return (
    <>
      <Header></Header>
      <div className="products container-fluid">
        <CardPizza pizzas = {data}/>
      </div>
    </>
  );
};

export default Home;