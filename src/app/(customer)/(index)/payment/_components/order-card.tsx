// app/(customer)/(index)/payment/purchase-history/_components/order-card.tsx
"use client";

import { TOrder } from "@/types";
import RepayPayment from "./payment-repay";
import CancelPayment from "./cancel-payment";

export default function OrderCard({ order }: { order: TOrder }) {
  return (
    <div className="border border-gray-300 rounded-xl p-5 bg-white shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="text-lg font-semibold">
          Payment Code: <span className="text-blue-600">{order.code}</span>
        </div>
        <div
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            order.status === "success"
              ? "bg-green-100 text-green-700"
              : order.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : order.status === "cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {order.status.toUpperCase()}
        </div>
      </div>
      <div className="text-sm text-gray-600">
        Total: Rp{order.total.toLocaleString("id-ID")}
        <br />
        Created: {new Date(order.created_at).toLocaleString("id-ID")}
      </div>

      {order.status === "pending" && (
        <div className="mt-4 flex gap-3">
          <RepayPayment code={order.code} />
          <CancelPayment code={order.code} />
        </div>
      )}
    </div>
  );
}
