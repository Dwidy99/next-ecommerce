// app/(customer)/(index)/payment/purchase-history/_components/orders-list.tsx
"use client";

import { TOrder } from "@/types";
import OrderCard from "./order-card";

export default function OrdersList({ orders }: { orders: TOrder[] }) {
  if (orders.length === 0) {
    return <p className="text-gray-600">No transactions yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
