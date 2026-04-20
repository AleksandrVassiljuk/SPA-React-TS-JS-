import { type Car } from "../types/car";
import CarItem from "./caritem";

export default function CarList({ cars }: { cars: Car[] }) {
  return (
    <div>
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
}