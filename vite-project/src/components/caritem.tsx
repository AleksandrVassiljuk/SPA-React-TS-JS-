import { type Car } from "../types/car";

export default function CarItem({ car }: { car: Car }) {
  return (
    <div>
      <h3>{car.name}</h3>
      <p>{car.brand}</p>
    </div>
  );
}