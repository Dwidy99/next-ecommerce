// app/purchase-history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TOrder } from "@/types";
import { Button } from "@/components/ui/button";
import RepayPayment from "../_components/payment-repay";
import CancelPayment from "../_components/cancel-payment";

export default function PurchaseHistoryPage() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order/history", {
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch orders");
        setOrders(data.orders);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // 🔄 Handler repay (integrated with API repayOrder → Xendit testing)
  const handleRepay = async (code: string) => {
    try {
      const res = await fetch("/api/order/repay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok || data.error)
        throw new Error(data.error || "Failed to repay");

      // 🚀 Redirect ke Xendit Testing URL
      router.push(data.redirectUrl);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ❌ Handler cancel payment
  const handleCancel = async (code: string) => {
    try {
      const res = await fetch(`/api/order/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to cancel payment");

      // Refresh state orders → set jadi cancelled
      setOrders((prev) =>
        prev.map((o) => (o.code === code ? { ...o, status: "cancelled" } : o))
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center p-10">Error: {error}</p>;

  return (
    <main className="container max-w-[1130px] mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6">Purchase History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No transactions yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-xl p-5 bg-white shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold">
                  Payment Code:{" "}
                  <span className="text-blue-600">{order.code}</span>
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

              {/* Show action buttons if pending */}
              {order.status === "pending" && (
                <div className="mt-4 flex gap-3">
                  <RepayPayment code={order.code} />
                  <CancelPayment code={order.code} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Button onClick={() => router.push("/")}>⬅️ Back to Shop</Button>
      </div>
    </main>
  );
}
