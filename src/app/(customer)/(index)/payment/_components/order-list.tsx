"use client";

import { Button } from "@/components/ui/button";
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
    console.log("order:", order);
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

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
              max-width: 480px;
              margin: 0 auto;
              background: white;
              border-radius: 16px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #FFC736, #ffea96);
              padding: 25px;
              text-align: center;
              color: #110843;
            }
            .header img {
              height: 50px;
              margin-bottom: 10px;
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
            .order-info p {
              margin: 5px 0;
            }
            .items {
              padding: 20px;
            }
            .item {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              margin-bottom: 10px;
            }
            .item span:first-child {
              color: #333;
            }
            .total {
              font-weight: 700;
              border-top: 2px solid #FFC736;
              padding-top: 10px;
              display: flex;
              justify-content: space-between;
              font-size: 15px;
              margin-top: 10px;
            }
            .footer {
              text-align: center;
              background: #f8f9fb;
              padding: 15px;
              font-size: 13px;
              color: #555;
              border-top: 1px solid #eee;
            }
            .footer b {
              color: #110843;
            }
            @media print {
              button { display: none; }
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
              <p><b>Customer:</b> ${order.orderDetail?.name ?? "-"}</p>
              <p><b>Address:</b> ${order.orderDetail?.address ?? "-"}</p>
              <p><b>Phone:</b> ${order.orderDetail?.phone ?? "-"}</p>
            </div>
            <div class="items">
              ${
                order.orderProduct
                  ?.map(
                    (p) => `
                    <div class="item">
                      <span>${p.product.name} (x${p.quantity})</span>
                      <span>Rp ${Number(p.subtotal).toLocaleString("id-ID")}</span>
                    </div>
                  `
                  )
                  .join("") ?? ""
              }
              <div class="total">
                <span>Total</span>
                <span>Rp ${Number(order.total).toLocaleString("id-ID")}</span>
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
            <p>Total: Rp {Number(order.total).toLocaleString("id-ID")}</p>
          </div>

          <div className="flex justify-between items-center">
            <Link
              href={`/payment/${order.code}`}
              className="text-[#110843] font-semibold hover:underline"
            >
              View Details →
            </Link>

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
