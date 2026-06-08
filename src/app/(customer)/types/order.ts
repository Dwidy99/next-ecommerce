import type { LucideIcon } from "lucide-react";

export type TOrder = {
  id: number;
  code: string;
  total: number;
  status: "pending" | "success" | "failed" | "expired" | "cancelled";
  created_at: string;
  updated_at: string;
  detail?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    notes: string;
  } | null;
  products?: {
    id: number;
    quantity: number;
    subtotal: number;
    product: {
      id: number;
      name: string;
      price: number;
      images?: string[];
    };
  }[];
  orderDetail?: TOrder["detail"];
  orderProduct?: TOrder["products"];
};

export type OrderStatusConfig = {
  label: string;
  description: string;
  badgeClassName: string;
  icon: LucideIcon;
};

export type OrdersListProps = {
  orders?: TOrder[];
};

