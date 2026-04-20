import type { Car } from "../types/car";

type Props = {
  car: Car;

  // 🗑 delete auto
  onDelete?: (id: number) => void;

  // 👁 select / view auto
  onSelect?: (car: Car) => void;
};

export default function CarItem({ car, onDelete, onSelect }: Props) {

  // 🧠 badge logic
  const getBadge = () => {
    if (car.favorite) return "💖 Favorite";
    if (car.brand === "BMW") return "🔥 Premium";
    if (car.brand === "Audi") return "💎 Luxury";
    return "🚘 Standard";
  };

  return (
    <div className="car-item">

      {/* 📸 IMAGE */}
      <img
        className="car-img"
        src={
          car.image ||
          `https://source.unsplash.com/400x250/?${car.brand},car`
        }
        alt={car.name}
      />

      {/* INFO */}
      <div className="car-left">

        <h3 className="car-title">🚗 {car.name}</h3>

        <p className="car-brand">
          🏷 {car.brand}
        </p>

        <p className="car-year">
          📅 {car.year}
        </p>

        {/* BADGE */}
        <div className="badge">
          {getBadge()}
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="car-actions">

        {/* 👁 VIEW */}
        {onSelect && (
          <button
            className="view-btn"
            onClick={() => onSelect(car)}
          >
            👁 View
          </button>
        )}

        {/* 🗑 DELETE */}
        {onDelete && (
          <button
            className="delete-btn"
            onClick={() => onDelete(car.id)}
          >
            🗑 Delete
          </button>
        )}

      </div>

    </div>
  );
}