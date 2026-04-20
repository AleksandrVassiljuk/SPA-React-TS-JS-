import type { Car } from "../types/car";

type Props = {
  car: Car;
  onDelete?: (name: string) => void;
  onSelect?: (car: Car) => void;
};

export default function CarItem({ car, onDelete, onSelect }: Props) {
  return (
    <div className="car-item">
      {/* HEADER */}
      <div className="car-header">
        <div>
          <h3 className="car-name">🚘 {car.name}</h3>
          <p className="car-brand">🏷️ {car.brand}</p>
        </div>

        <div className="car-actions">
          {onSelect && (
            <button
              className="select-btn"
              onClick={() => onSelect(car)}
            >
              👁 Vaata
            </button>
          )}

          {onDelete && (
            <button
              className="delete-btn"
              onClick={() => onDelete(car.name)}
            >
              ❌ Kustuta
            </button>
          )}
        </div>
      </div>

      {/* INFO BOX */}
      <div className="car-info-box">
        <p>📌 Auto nimi: <b>{car.name}</b></p>
        <p>🏭 Bränd: <b>{car.brand}</b></p>
      </div>

      {/* STATUS BADGE (näide lisafunktsioonist) */}
      <div className="car-badge">
        {car.brand === "BMW" && <span className="badge bmw">Premium</span>}
        {car.brand === "Audi" && <span className="badge audi">Luxury</span>}
        {car.brand !== "BMW" && car.brand !== "Audi" && (
          <span className="badge normal">Standard</span>
        )}
      </div>
    </div>
  );
}