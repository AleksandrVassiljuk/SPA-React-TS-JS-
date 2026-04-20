import type { Car } from "../types/car";
import CarItem from "./CarItem";

type Props = {
  cars: Car[];
  onDelete?: (name: string) => void;
  onSelect?: (car: Car) => void;
  loading?: boolean;
};

export default function CarList({
  cars,
  onDelete,
  onSelect,
  loading = false,
}: Props) {

  if (loading) {
    return <div className="empty">⏳ Laen autosid...</div>;
  }

  if (cars.length === 0) {
    return (
      <div className="empty">
        🚫 Ühtegi autot pole lisatud
        <p>Lisa esimene auto vormi kaudu</p>
      </div>
    );
  }

  return (
    <div className="car-list">

      {/* STATS */}
      <div className="stats">
        <span>🚗 Autosid: {cars.length}</span>
        <span>💖 Lemmikuid: {cars.filter(c => c.favorite).length}</span>
      </div>

      {/* LIST */}
      {cars.map((car) => (
        <div
          key={car.id}
          className={`car-wrapper ${car.favorite ? "favorite" : ""}`}
        >
          <CarItem
            car={car}
            onDelete={onDelete}
            onSelect={onSelect}
          />

          <div className="car-meta">
            <small>📅 Aasta: {car.year}</small>

            {car.favorite && (
              <span className="fav-badge">💖 FAVORITE</span>
            )}
          </div>
        </div>
      ))}

      {/* FOOTER */}
      <div className="footer">
        📦 Andmed salvestatakse automaatselt
      </div>

    </div>
  );
}