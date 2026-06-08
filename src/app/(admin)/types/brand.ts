import type { Brand } from "@prisma/client";

export type AdminBrandTableItem = Brand & {
  _count: {
    products: number;
  };
};

export type AdminBrandFormData = Brand | null;

