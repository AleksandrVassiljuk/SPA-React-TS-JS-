import { useEffect, useState } from "react";
import type { Car } from "./types/car";
import CarForm from "./components/CarForm";
import CarList from "./components/Carlist";

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");

  // LOAD from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cars");
    if (saved) setCars(JSON.parse(saved));
  }, []);

  // SAVE to localStorage
  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  function addCar(car: Car) {
    setCars((prev) => [...prev, car]);
  }

  function deleteCar(id: number) {
    setCars((prev) => prev.filter((car) => car.id !== id));
  }

  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>🚗 Car Collection</h1>

      <input
        placeholder="Search car..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CarForm onAdd={addCar} />
      <CarList cars={filteredCars} onDelete={deleteCar} />
    </div>
  );
}