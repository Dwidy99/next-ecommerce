"use client";

import { Button } from "@/components/ui/button";
import { rupiahFormat } from "@/lib/utils";
import { TOrder } from "@/types";
import { Printer } from "lucide-react";
import Link from "next/link";
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

    // ✅ Hitung subtotal dari field yang benar
    const subtotal = Array.isArray(order.products)
      ? order.products.reduce((acc, p) => acc + (Number(p?.subtotal) || 0), 0)
      : 0;

    const html = `
  <html>
    <head>
      <title>Receipt #${order.code}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f7f8fa;
          padding: 20px;
          color: #111;
        }
        .receipt {
          max-width: 520px;
          margin: 0 auto;
          background: white;
          border-radius: 18px;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #FFC736, #ffeb99);
          padding: 25px;
          text-align: center;
          color: #110843;
        }
        .header img {
          height: 55px;
          margin-bottom: 8px;
        }
        .header h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
        }
        .order-info {
          padding: 20px;
          font-size: 14px;
          border-bottom: 1px solid #eee;
        }
        .items {
          padding: 20px;
        }
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px dashed #ddd;
          padding: 10px 0;
        }
        .item img {
          width: 45px;
          height: 45px;
          object-fit: cover;
          border-radius: 8px;
          margin-right: 10px;
        }
        .item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .item-name {
          font-weight: 600;
          font-size: 14px;
          color: #111;
        }
        .item-price {
          font-size: 13px;
          color: #666;
        }
        .item-subtotal {
          font-weight: 600;
          color: #110843;
          font-size: 14px;
          text-align: right;
        }
        .summary {
          padding: 20px;
          border-top: 1px solid #eee;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 14px;
        }
        .summary-row.total {
          font-weight: 700;
          border-top: 2px solid #FFC736;
          padding-top: 10px;
          font-size: 15px;
        }
        .footer {
          text-align: center;
          background: #f8f9fb;
          padding: 18px;
          font-size: 13px;
          color: #555;
          border-top: 1px solid #eee;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <img src="/assets/logos/logos-black.svg" alt="Shopverse" />
          <h2>Payment Receipt</h2>
          <p>Order Code: <b>${order.code}</b></p>
        </div>

        <div class="order-info">
          <p><b>Status:</b> ✅ Success</p>
          <p><b>Date:</b> ${new Date(order.created_at).toLocaleString()}</p>
        </div>

        <div class="items">
          <h4 style="font-size:15px;font-weight:600;margin-bottom:10px;color:#110843;">Items Purchased</h4>
          ${
            order.products
              ?.map(
                (p) => `
                  <div class="item">
                    <div class="item-info">
                      <span class="item-name">${p.product.name}</span>
                      <span class="item-price">Rp ${rupiahFormat(Number(p.product.price))} × ${p.quantity}</span>
                    </div>
                    <div class="item-subtotal">Rp ${rupiahFormat(Number(p.subtotal))}</div>
                  </div>
                `
              )
              .join("") ?? ""
          }
        </div>

        <div class="summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>Rp ${rupiahFormat(subtotal)}</span>
          </div>
          <div class="summary-row total">
            <span>Total Paid</span>
            <span>Rp ${rupiahFormat(Number(order.total))}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for shopping with <b>Shopverse 💛</b></p>
          <p>shopverse.id | Printed on ${new Date().toLocaleString()}</p>
        </div>
      </div>
      <script>window.print()</script>
    </body>
  </html>
`;

    newWindow.document.write(html);
    newWindow.document.close();
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-[#E5E5E5] bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-[#110843] text-lg">
              Order #{order.code}
            </h2>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
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

          <div className="flex justify-between items-center">
            {order.status === "success" && (
              <Button
                onClick={() => handlePrint(order)}
                className="flex items-center gap-2 bg-[#110843] text-white hover:bg-[#3a2086] transition-all rounded-full px-4 py-2"
              >
                <Printer size={18} />
                Print Receipt
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
