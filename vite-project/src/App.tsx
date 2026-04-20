import { useState } from "react";
import { type Car } from "./types/car";
import CarForm from "./components/Carform";
import CarList from "./components/Carlist";

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);

  function addCar(car: Car) {
    setCars([...cars, car]);
  }

  return (
    <div>
      <h1>Car Collection</h1>
      <CarForm onAdd={addCar} />
      <CarList cars={cars} />
    </div>
  );
}