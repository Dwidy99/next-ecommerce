"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TOrder } from "@/app/(customer)/types";
import OrdersList from "../_components/order-list";
import {
  ArrowBigLeftDash,
  BadgeCheck,
  Clock3,
  ReceiptText,
  ShoppingCart,
  TriangleAlert,
} from "lucide-react";
import Loading from "../../_components/loading-skeleton";
import EmptyState from "../_components/empty-state";

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PurchaseHistoryClient() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const fetchOrders = async () => {
    try {
      setError("");
      setUnauthorized(false);

      const res = await fetch("/api/order/history", { cache: "no-store" });
      const data = await res.json();

      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch orders");
      }

      setOrders(data.orders ?? []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch orders";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const paidOrders = orders.filter((order) => order.status === "success").length;
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const latestOrder = orders[0];

  if (loading) {
    return (
      <main className="bg-[#f7f4ea] px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center">
          <div className="w-full max-w-5xl rounded-[2rem] border border-[#f1d78a] bg-white p-6 shadow-[0_24px_80px_rgba(17,8,67,0.08)] md:p-8">
            <Loading count={3} type="list" />
          </div>
        </div>
      </main>
    );
  }

  if (unauthorized) {
    return (
      <main className="bg-[#f7f4ea] px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center">
          <div className="w-full overflow-hidden rounded-[2rem] border border-[#f1d78a] bg-white shadow-[0_24px_80px_rgba(17,8,67,0.08)]">
            <div className="bg-[#110843] px-6 py-10 text-center text-white md:px-10">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC736]">
                Purchase History
              </span>
              <h1 className="mt-5 text-3xl font-bold md:text-4xl">
                Sign in to see your orders.
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/75 md:text-base">
                Your receipts, order timeline, and payment updates will appear
                here once you are logged in.
              </p>
            </div>

            <div className="space-y-5 px-6 py-8 text-center md:px-10">
              <p className="text-sm leading-7 text-[#5f6480] md:text-base">
                Please{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-[#110843] underline decoration-[#FFC736] decoration-2 underline-offset-4"
                >
                  sign in
                </Link>{" "}
                to view your purchase history and continue tracking your
                purchases.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/sign-in">
                  <Button className="h-12 rounded-full bg-[#110843] px-6 text-white hover:bg-[#24105f]">
                    View My Orders
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="h-12 rounded-full border-[#110843]/15 px-6 text-[#110843] hover:bg-[#110843]/5"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Back to Shop
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#f7f4ea] px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center">
          <div className="w-full rounded-[2rem] border border-[#ffd4cf] bg-white p-8 text-center shadow-[0_24px_80px_rgba(17,8,67,0.08)] md:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3f1] text-[#d14b3f]">
              <TriangleAlert className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-[#110843] md:text-3xl">
              We couldn&apos;t load your purchase history.
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#5f6480] md:text-base">
              {error}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                onClick={fetchOrders}
                className="h-12 rounded-full bg-[#110843] px-6 text-white hover:bg-[#24105f]"
              >
                Try Again
              </Button>
              <Link href="/catalogs">
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-[#110843]/15 px-6 text-[#110843] hover:bg-[#110843]/5"
                >
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No purchases yet"
        message="Looks like you have not made any transactions yet. Explore the catalog and save your favorite items for the next checkout."
        actionLabel="Browse Products"
        actionHref="/catalogs"
        showBackButton
      />
    );
  }

  return (
    <main className="bg-[#f7f4ea] px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-[#f1d78a] bg-[#110843] text-white shadow-[0_28px_90px_rgba(17,8,67,0.16)]">
          <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1.45fr_0.95fr] lg:items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC736]">
                Payment Center
              </span>
              <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                Track every checkout with a cleaner purchase history.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                Review completed payments, pending transactions, and recent
                order activity in one organized place.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/catalogs">
                  <Button className="h-12 rounded-full bg-[#FFC736] px-6 text-[#110843] hover:bg-[#ffcf56]">
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-white hover:bg-white/10"
                >
                  <ArrowBigLeftDash className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-[#FFC736]">
                  <ReceiptText className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                    Total Orders
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold">{orders.length}</p>
                <p className="mt-1 text-sm text-white/65">
                  All purchase records tied to your account.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-[#FFC736]">
                  <BadgeCheck className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                    Paid Orders
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold">{paidOrders}</p>
                <p className="mt-1 text-sm text-white/65">
                  Successfully completed transactions.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-[#FFC736]">
                  <Clock3 className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                    Latest Activity
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold">
                  {latestOrder ? formatShortDate(latestOrder.created_at) : "-"}
                </p>
                <p className="mt-1 text-sm text-white/65">
                  {pendingOrders > 0
                    ? `${pendingOrders} order${pendingOrders > 1 ? "s" : ""} still pending.`
                    : "No pending payments right now."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#f1d78a] bg-white p-6 shadow-[0_24px_80px_rgba(17,8,67,0.08)] md:p-8">
          <div className="mb-8 flex flex-col gap-3 border-b border-[#ece7d6] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d99000]">
                Order Timeline
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#110843] md:text-3xl">
                Recent Purchases
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5f6480] md:text-base">
                Each card highlights order status, product summary, and the
                important details you usually need most.
              </p>
            </div>
            <div className="rounded-full bg-[#fff7dc] px-4 py-2 text-sm font-medium text-[#7d5c00]">
              Sorted from newest to oldest
            </div>
          </div>

          <OrdersList orders={orders} />
        </section>
      </div>
    </main>
  );
}

