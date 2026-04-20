import type { Car } from "../types/car";
import CarItem from "./caritem";

type Props = {
  cars: Car[];
  onDelete?: (id: number) => void;
  onSelect?: (car: Car) => void;
  loading?: boolean;
};

export default function CarList({
  cars,
  onDelete,
  onSelect,
  loading = false,
}: Props) {

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="empty">
        <div>⏳</div>
        <p>Laen autosid...</p>
      </div>
    );
  }

  // 🚫 EMPTY
  if (cars.length === 0) {
    return (
      <div className="empty">
        <h3>🚫 Pole autosid</h3>
        <p>Lisa esimene auto vormi kaudu</p>
      </div>
    );
  }

  const favoriteCount = cars.filter(c => c.favorite).length;

  return (
    <div className="car-list">

      {/* 📊 HEADER */}
      <div className="stats">
        <div>🚗 <b>{cars.length}</b> autot</div>
        <div>💖 <b>{favoriteCount}</b> lemmikut</div>
      </div>

      {/* 🧱 LIST */}
      <div className="car-grid">

        {cars.map((car) => (
          <div
            key={car.id}
            className={`car-wrapper ${car.favorite ? "favorite" : ""}`}
          >

            <CarItem
              car={car}
              onSelect={onSelect}
              onDelete={onDelete}
            />

            {/* 📅 EXTRA INFO */}
            <div className="car-meta">
              <span>📅 {car.year}</span>

              {car.favorite && (
                <span className="fav-badge">❤️ lemmik</span>
              )}
            </div>

          </div>
        ))}

      </div>

      {/* 📦 FOOTER */}
      <div className="footer">
        📦 Andmed salvestuvad automaatselt
      </div>

    </div>
  );
}