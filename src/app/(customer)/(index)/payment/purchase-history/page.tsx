"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TOrder } from "@/types";
import OrdersList from "../_components/order-list";
import { ArrowBigLeftDash, ShoppingCart } from "lucide-react";
import Loading from "../../_components/loading";
import EmptyState from "../_components/empty-state";

export default function PurchaseHistoryPage() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/order/history", { cache: "no-store" });
      const data = await res.json();

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

  // Loading
  if (loading)
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <Loading />
      </main>
    );

  // Unauthorized
  if (unauthorized)
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-[#110843]">
          No transaction yet...
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
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
          className="flex items-center gap-2 mt-2"
        >
          <ShoppingCart className="w-4 h-4 text-[#110843]" />
          Back to Shop
        </Button>
      </main>
    );

  // Error
  if (error)
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4 text-center">
        <p className="text-red-500 font-medium text-sm md:text-base">
          Error: {error}
        </p>
      </main>
    );

  if (orders.length === 0)
    return (
      <EmptyState
        title="No purchases yet"
        message="Looks like you haven’t made any transactions. Let’s find something awesome in our catalog!"
        actionLabel="Browse Products"
        actionHref="/catalogs"
        showBackButton
      />
    );

  // ✅ With Orders
  return (
    <main className="w-full flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-[780px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-[#110843] text-center">
          Purchase History
        </h1>
        <OrdersList orders={orders} />

        <div className="mt-12 flex justify-center">
          <Button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 bg-[#110843] text-white hover:bg-[#2b127a] rounded-full px-6 py-3"
          >
            <ArrowBigLeftDash className="w-4 h-4" /> Back to Shop
          </Button>
        </div>
      </div>
    </main>
  );
}
