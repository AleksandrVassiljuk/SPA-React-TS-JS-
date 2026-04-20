import { useEffect, useMemo, useState } from "react";
import type { Car } from "./types/car";
import CarForm from "./components/CarForm";
import CarList from "./components/Carlist";

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("cars");
    if (saved) setCars(JSON.parse(saved));
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  // ADD
  function addCar(car: Car) {
    setCars((prev) => [...prev, car]);
  }

  // 🚨 FIXED DELETE (ID BAASIL)
  function deleteCar(id: number) {
    setCars((prev) => prev.filter((c) => c.id !== id));
  }

  // SELECT
  function selectCar(car: Car) {
    setSelectedCar(car);
  }

  // CLEAR
  function clearSelected() {
    setSelectedCar(null);
  }

  // FILTER + SORT
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

      {/* HEADER */}
      <h1>🚗 Car Collection</h1>

      {/* STATS */}
      <div className="stats">
        <p>📊 Autosid kokku: {cars.length}</p>
        <p>🔍 Filtreeritud: {filteredCars.length}</p>
      </div>

      {/* SEARCH + SORT */}
      <div className="top-bar">
        <input
          className="search"
          placeholder="Otsi autot või brandi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setSortAsc(!sortAsc)}>
          ↕ Sort {sortAsc ? "A-Z" : "Z-A"}
        </button>
      </div>

      {/* SELECTED CAR */}
      {selectedCar && (
        <div className="selected-box">
          <h3>🚘 Valitud auto</h3>
          <p>{selectedCar.name}</p>
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
        onDelete={deleteCar}
        onSelect={selectCar}
      />
    </div>
  );
}