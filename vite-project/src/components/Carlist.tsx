import { useMemo, useState } from "react";
import type { Car } from "../types/car";
import CarItem from "./caritem";

type Props = {
  cars: Car[];
  onDelete?: (name: string) => void;
  onSelect?: (car: Car) => void;
};

export default function CarList({ cars, onDelete, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  // FILTER + SORT (optimeeritud)
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
    <div>
      {/* TOP BAR */}
      <div className="carlist-top">
        <input
          className="search-input"
          placeholder="🔍 Otsi autot või brandi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="sort-btn"
          onClick={() => setSortAsc(!sortAsc)}
        >
          ↕ Sort {sortAsc ? "A-Z" : "Z-A"}
        </button>

        <span className="count">
          🚗 Autosid: {filteredCars.length}
        </span>
      </div>

      {/* LIST */}
      <div className="car-list">
        {filteredCars.length === 0 ? (
          <div className="empty-box">
            😕 Midagi ei leitud
          </div>
        ) : (
          filteredCars.map((car) => (
            <CarItem
              key={car.name}
              car={car}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </div>
  );
}