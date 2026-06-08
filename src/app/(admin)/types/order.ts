import type { StatusOrder } from "@prisma/client";

export type AdminOrderProductColumn = {
  name: string;
  image: string;
};

export type AdminOrderColumn = {
  id: number;
  code: string;
  createdAt: Date;
  products: AdminOrderProductColumn[];
  customer_name: string | undefined;
  customer_email: string | undefined;
  total_items: number;
  price: number;
  status: StatusOrder;
};

