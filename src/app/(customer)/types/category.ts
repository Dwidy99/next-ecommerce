import type { CustomerProductItem } from "./product";

export type CustomerCategoryItem = {
  id: number;
  name: string;
  slug: string | null;
  productCount: number;
};

export type CategoryProductSource = {
  id: number;
  name: string;
  price: bigint | number;
  images?: string[] | null;
  category: {
    name: string;
  };
};

export type CategoryWithProductsItem = {
  id: number;
  name: string;
  slug: string;
  products: CustomerProductItem[];
};

