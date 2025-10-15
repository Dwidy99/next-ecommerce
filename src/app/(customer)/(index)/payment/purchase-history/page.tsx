"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TOrder } from "@/types";
import OrdersList from "../_components/order-list";
import { ArrowBigLeftDash, ShoppingCart } from "lucide-react";
import Loading from "../../_components/loading";

export default function PurchaseHistoryPage() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  // 🟡 Tambahkan console.log di dalam fungsi fetchOrders
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/order/history", { cache: "no-store" });
      const data = await res.json();

      // 🧾 Tambahkan ini untuk melihat hasil dari API
      console.log("🧾 API Response:", data);

      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }

      if (!res.ok) throw new Error(data.error || "Failed to fetch orders");

      setOrders(data.orders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🌀 Loading State
  if (loading)
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loading />
      </main>
    );

  // 🔐 Not Logged In
  if (unauthorized)
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-2xl font-semibold">No transaction yet...</h1>
        <p className="text-gray-600">
          Please{" "}
          <Link
            href="/sign-in"
            className="text-[#110843] font-semibold hover:underline"
          >
            sign in
          </Link>{" "}
          to view your purchase history.
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="mt-4"
        >
          <ShoppingCart className="text-blue-400" /> Back to Shop
        </Button>
      </main>
    );

  // ❌ Other Errors
  if (error)
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-red-500 font-medium">Error: {error}</p>
      </main>
    );

  // 🛍️ Logged In but No Orders
  if (orders.length === 0)
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-2xl font-semibold">No transaction yet...</h1>
        <p className="text-gray-600">You haven’t made any purchases yet.</p>
        <Button onClick={() => router.push("/catalogs")} className="mt-4">
          <ShoppingCart /> Go Shopping
        </Button>
      </main>
    );

  // ✅ Logged In and Has Orders
  return (
    <main className="container max-w-[1130px] px-8 py-20">
      <h1 className="text-3xl font-bold mb-6">Purchase History</h1>
      <OrdersList orders={orders} />
      <div className="mt-10">
        <Button onClick={() => router.push("/")}>
          <ArrowBigLeftDash /> Back to Shop
        </Button>
      </div>
    </main>
  );
}
