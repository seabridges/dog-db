export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Match {
  match: string;
}

export type SortOptions = "asc" | "desc";
export type OrderOptions = "breed" | "name" | "age";

export type SearchParams = { [key: string]: string | undefined };
