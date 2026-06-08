import type { ProductStock } from "@prisma/client";

export type FilterOption = {
  id: number;
  name: string;
};

export type TFilter = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  stock?: ProductStock[];
  brands?: number[];
  locations?: number[];
  categories?: number[];
};

export type FilterKey = "stock" | "brands" | "locations" | "categories";

export type FilterCheckboxOption =
  | FilterOption
  | {
      id: ProductStock;
      name: string;
    };

export type FilterCheckboxListProps = {
  name: FilterKey;
  options: FilterCheckboxOption[];
};

