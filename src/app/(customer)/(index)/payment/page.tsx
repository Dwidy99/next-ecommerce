// app/(customer)/(index)/payment/purchase-history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TOrder } from "@/types";
import { Button } from "@/components/ui/button";
import OrdersList from "./_components/order-list";

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

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center p-10">Error: {error}</p>;

  return (
    <main className="container max-w-[1130px] mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6">Purchase History</h1>
      <OrdersList orders={orders} />
      <div className="mt-10">
        <Button onClick={() => router.push("/")}>⬅️ Back to Shop</Button>
      </div>
    </main>
  );
}
