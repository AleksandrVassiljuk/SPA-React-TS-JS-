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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !brand || !year) {
      setError("Täida kõik väljad!");
      return;
    }

    if (Number(year) < 1900 || Number(year) > 2026) {
      setError("Aasta peab olema 1900–2026");
      return;
    }

    const newCar: Car = {
      id: Date.now(),
      name,
      brand,
    };

    onAdd(newCar);

    setName("");
    setBrand("");
    setYear("");
    setFavorite(false);
    setError("");
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
      <h2>🚗 Lisa uus auto</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Auto nimi (nt Mustang)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Bränd (nt Ford)"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          placeholder="Aasta (nt 1967)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            checked={favorite}
            onChange={() => setFavorite(!favorite)}
          />
          💖 Lemmik auto
        </label>

        {error && <p className="error">{error}</p>}

        <div className="buttons">
          <button type="submit" disabled={!name || !brand || !year}>
            ➕ Lisa auto
          </button>

          <button type="button" onClick={clearForm}>
            🧹 Puhasta
          </button>
        </div>
      </form>
    </div>
  );
}