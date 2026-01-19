import { createContext, useState, useEffect } from "react";

export const PizzasContext = createContext();

const PizzasProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const getData = async (url) => {
    const response = await fetch(url);
    const pizzas = await response.json();
    const nuevaPizza = pizzas.map((pizza) => ({ ...pizza, count: 0 }));
    setData(nuevaPizza);
  };
  useEffect(() => {
    getData("http://localhost:5002/api/pizzas");
  }, []);

  const filtrarPizzas = data.filter((e) => e.count > 0);
  const suma = (id) => {
    const sumaPizza = data.map((pizza) => {
      if (pizza.id === id) {
        return { ...pizza, count: pizza.count + 1 };
      }
      return pizza;
    });
    setData(sumaPizza);
  };

  const resta = (id) => {
    const restaPizza = data.map((pizza) => {
      if (pizza.id === id) {
        return { ...pizza, count: pizza.count - 1 };
      }
      return pizza;
    });
    setData(restaPizza);
  };
  const totalPizzas = data
    .reduce((total, pizza) => total + pizza.price * pizza.count, 0)
    .toLocaleString("es-CL");
  const globalState = { data, filtrarPizzas, suma, resta, totalPizzas };

  return (
    <PizzasContext.Provider value={globalState}>
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;
