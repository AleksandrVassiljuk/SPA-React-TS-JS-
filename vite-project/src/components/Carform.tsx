import { useState } from "react";
import type { Car } from "../types/car";

type Props = {
  onAdd: (car: Car) => void;
};

export default function CarForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // ❌ VALIDATION
    if (!name || !brand || !year) {
      setError("❌ Täida kõik väljad!");
      return;
    }

    const yearNum = Number(year);

    if (isNaN(yearNum)) {
      setError("❌ Aasta peab olema number!");
      return;
    }

    if (yearNum < 1900 || yearNum > 2026) {
      setError("❌ Aasta peab olema 1900–2026");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newCar: Car = {
        id: Date.now(),
        name: name.trim(),
        brand: brand.trim(),
        year: yearNum,
        favorite,
      };

      onAdd(newCar);

      setName("");
      setBrand("");
      setYear("");
      setFavorite(false);
      setError("");
      setLoading(false);
    }, 300);
  }

  function clearForm() {
    setName("");
    setBrand("");
    setYear("");
    setFavorite(false);
    setError("");
  }

  return (
    <div className="form-container">

      {/* TITLE */}
      <h2>🚗 Lisa uus auto</h2>

      <p className="subtitle">
        Ehita oma garaaž – lisa autod ja tee kollektsioon 💖
      </p>

      <form onSubmit={handleSubmit} className="form">

        {/* NAME */}
        <input
          placeholder="🚘 Auto nimi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* BRAND */}
        <input
          placeholder="🏷 Bränd"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        {/* YEAR */}
        <input
          placeholder="📅 Aasta"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        {/* FAVORITE */}
        <label className="checkbox">
          <input
            type="checkbox"
            checked={favorite}
            onChange={() => setFavorite(!favorite)}
          />
          💖 Lisa lemmikuks
        </label>

        {/* ERROR */}
        {error && <div className="error">{error}</div>}

        {/* BUTTONS */}
        <div className="buttons">

          <button
            type="submit"
            disabled={loading}
            className="add-btn"
          >
            {loading ? "⏳ Lisamine..." : "➕ Lisa auto"}
          </button>

          <button
            type="button"
            onClick={clearForm}
            className="clear-btn"
          >
            🧹 Puhasta
          </button>

        </div>

      </form>
    </div>
  );
}