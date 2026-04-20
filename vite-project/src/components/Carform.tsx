import { useState } from "react";
import { type Car } from "../types/car";

type Props = {
  onAdd: (car: Car) => void;
};

export default function CarForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newCar: Car = {
      id: Date.now(),
      name,
      brand,
    };

    onAdd(newCar);
    setName("");
    setBrand("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Car name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
      <button type="submit">Add car</button>
    </form>
  );
}