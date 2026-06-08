import type { Location } from "@prisma/client";

export type AdminLocationTableItem = Location & {
  _count: {
    products: number;
  };
};

export type AdminLocationFormData = Location | null;

