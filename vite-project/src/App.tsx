import { useEffect, useMemo, useState } from "react";
import type { Car } from "./types/car";
import CarForm from "./components/CarForm";
import CarList from "./components/Carlist";

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // LOAD from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cars");
    if (saved) setCars(JSON.parse(saved));
  }, []);

  // SAVE to localStorage
  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  // ADD CAR
  function addCar(car: Car) {
    setCars((prev) => [...prev, car]);
  }

  // DELETE CAR (ID BAASIL ✔️)
  function deleteCar(id: number) {
    setCars((prev) => prev.filter((car) => car.id !== id));
  }

  // SELECT CAR
  function selectCar(car: Car) {
    setSelectedCar(car);
  }

  // CLEAR SELECTED
  function clearSelected() {
    setSelectedCar(null);
  }

  // FILTER + SORT (OPTIMIZED)
  const filteredCars = useMemo(() => {
    return cars
      .filter(
        (car) =>
          car.name.toLowerCase().includes(search.toLowerCase()) ||
          car.brand.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        sortAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  }, [cars, search, sortAsc]);

  return (
    <div className="app">

      {/* TITLE */}
      <h1>🚗 Car Collection</h1>

      {/* STATS */}
      <div className="stats">
        <span>📊 Kokku: {cars.length}</span>
        <span>🔍 Näidatud: {filteredCars.length}</span>
        <span>⭐ Valitud: {selectedCar ? "1" : "0"}</span>
      </div>

      {/* SEARCH + SORT */}
      <div className="top-bar">

        <input
          className="search"
          placeholder="Otsi auto või brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setSortAsc(!sortAsc)}>
          ↕ {sortAsc ? "A-Z" : "Z-A"}
        </button>

      </div>

      {/* SELECTED CAR BOX */}
      {selectedCar && (
        <div className="empty">
          <h3>🚘 Valitud auto</h3>
          <p><b>{selectedCar.name}</b></p>
          <p>{selectedCar.brand}</p>

          <button onClick={clearSelected}>
            Sulge
          </button>
        </div>
      )}

      {/* FORM */}
      <CarForm onAdd={addCar} />

      {/* LIST */}
      <CarList
        cars={filteredCars}
        onSelect={selectCar}
      />
    </div>
  );
}