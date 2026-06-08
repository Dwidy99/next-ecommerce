import type { Category } from "@prisma/client";

export type AdminCategoryTableItem = Category & {
  _count: {
    products: number;
  };
};

export type AdminCategoryFormData = Category | null;

