export type Car = {
  id: number;
  name: string;
  brand: string;
  year: number;
  favorite: boolean;

  // pilt (optional, fallbackiga)
  image?: string;

  // lisainfo (UI jaoks parem)
  description?: string;

  // optional värv (kui tahad hiljem UI upgrade)
  color?: string;
};