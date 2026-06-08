import type { Product, ProductStock } from "@prisma/client";

export type AdminProductTableItem = {
  id: number;
  name: string;
  image_url: string;
  category: string;
  brand: string;
  location: string;
  price: number;
  total_sales: number;
  stock: ProductStock;
  createdAt: Date;
};

export type AdminProductFormData = Product | null;

export type AdminProductFormOption = {
  id: number;
  name: string;
};

export type AdminProductFormOptions = {
  categories: AdminProductFormOption[];
  brands: AdminProductFormOption[];
  locations: AdminProductFormOption[];
};

