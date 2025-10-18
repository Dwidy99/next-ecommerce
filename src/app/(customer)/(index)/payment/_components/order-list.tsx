"use client";

import { Button } from "@/components/ui/button";
import { rupiahFormat } from "@/lib/utils";
import { TOrder } from "@/types";
import { Printer } from "lucide-react";
import React from "react";

interface OrdersListProps {
  orders?: TOrder[];
}

export default function OrdersList({ orders = [] }: OrdersListProps) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No orders found.</p>
      </div>
    );
  }

  const handlePrint = (order: TOrder) => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

    const subtotal = Array.isArray(order.products)
      ? order.products.reduce((acc, p) => acc + (Number(p?.subtotal) || 0), 0)
      : 0;

    const html = `
      <html>
        <head><title>Receipt #${order.code}</title></head>
        <body><p>Order ${order.code}</p></body>
      </html>
    `;

    newWindow.document.write(html);
    newWindow.document.close();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {orders.map((order) => (
        <div
          key={order.id}
          className="w-full max-w-[750px] border border-gray-200 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <h2 className="font-semibold text-[#110843] text-base md:text-lg">
              Order #{order.code}
            </h2>
            <span
              className={`text-xs md:text-sm px-3 py-1 rounded-full text-center ${
                order.status === "success"
                  ? "bg-green-100 text-green-700"
                  : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {order.status.toUpperCase()}
            </span>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>Total: Rp {rupiahFormat(Number(order.total))}</p>
          </div>

          <div className="flex justify-between items-center flex-wrap gap-3">
            <div className="text-xs text-gray-500">
              {order.status === "success"
                ? "Paid successfully"
                : order.status === "pending"
                  ? "Awaiting confirmation"
                  : "Payment failed or cancelled"}
            </div>

            {order.status === "success" && (
              <Button
                onClick={() => handlePrint(order)}
                className="flex items-center gap-2 bg-[#110843] text-white hover:bg-[#3a2086] transition-all rounded-full px-4 py-2 text-sm"
              >
                <Printer size={16} />
                Print Receipt
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
