"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { rupiahFormat } from "@/lib/utils";
import { TOrder } from "@/app/(customer)/types";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Package2,
  Printer,
  ReceiptText,
  XCircle,
} from "lucide-react";

interface OrdersListProps {
  orders?: TOrder[];
}

type StatusConfig = {
  label: string;
  description: string;
  badgeClassName: string;
  icon: typeof CheckCircle2;
};

const statusMap: Record<TOrder["status"], StatusConfig> = {
  success: {
    label: "Paid",
    description: "Payment completed successfully.",
    badgeClassName: "border border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    description: "Waiting for payment confirmation.",
    badgeClassName: "border border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock3,
  },
  failed: {
    label: "Failed",
    description: "Payment failed or was not completed.",
    badgeClassName: "border border-rose-200 bg-rose-50 text-rose-700",
    icon: XCircle,
  },
  expired: {
    label: "Expired",
    description: "Payment window has expired.",
    badgeClassName: "border border-slate-200 bg-slate-100 text-slate-700",
    icon: XCircle,
  },
  cancelled: {
    label: "Cancelled",
    description: "This order was cancelled before completion.",
    badgeClassName: "border border-slate-200 bg-slate-100 text-slate-700",
    icon: XCircle,
  },
};

function formatOrderDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getProductCount(order: TOrder) {
  return (order.products ?? []).reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );
}

export default function OrdersList({ orders = [] }: OrdersListProps) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-[#dccfa2] bg-[#fffdf6] px-6 py-12 text-center text-[#5f6480]">
        <p>No orders found.</p>
      </div>
    );
  }

  const handlePrint = (order: TOrder) => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

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
    <div className="flex flex-col gap-5">
      {orders.map((order) => {
        const status = statusMap[order.status] ?? statusMap.pending;
        const StatusIcon = status.icon;
        const items = order.products ?? [];
        const primaryProduct = items[0]?.product;
        const extraProducts = Math.max(items.length - 1, 0);
        const productCount = getProductCount(order);

        return (
          <article
            key={order.id}
            className="overflow-hidden rounded-[1.75rem] border border-[#ece7d6] bg-[#fffdfa] shadow-[0_18px_50px_rgba(17,8,67,0.06)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-6 p-6 md:p-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-[#fff1b8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6500]">
                      Order #{order.code}
                    </span>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.badgeClassName}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#110843] md:text-2xl">
                      {primaryProduct?.name ?? "Order summary"}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5f6480] md:text-base">
                      {extraProducts > 0
                        ? `Includes ${extraProducts} more product${extraProducts > 1 ? "s" : ""} from the same checkout.`
                        : "Single-product checkout with clear payment tracking."}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-[#efe3b8] bg-[#fff8de] px-4 py-3 text-left lg:min-w-[220px]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b28700]">
                    Grand Total
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#110843]">
                    Rp {rupiahFormat(Number(order.total))}
                  </p>
                  <p className="mt-1 text-sm text-[#7a6f48]">{status.description}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.25rem] border border-[#ece7d6] bg-white p-4">
                  <div className="flex items-center gap-2 text-[#d99000]">
                    <CalendarDays className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                      Placed On
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#110843] md:text-base">
                    {formatOrderDate(order.created_at)}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-[#ece7d6] bg-white p-4">
                  <div className="flex items-center gap-2 text-[#d99000]">
                    <Package2 className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                      Items
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#110843] md:text-base">
                    {productCount} item{productCount > 1 ? "s" : ""}
                  </p>
                  <p className="mt-1 text-sm text-[#5f6480]">
                    {primaryProduct?.name ?? "Products unavailable"}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-[#ece7d6] bg-white p-4">
                  <div className="flex items-center gap-2 text-[#d99000]">
                    <MapPin className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                      Delivery
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#110843] md:text-base">
                    {order.detail?.name ?? "Recipient not available"}
                  </p>
                  <p className="mt-1 text-sm text-[#5f6480]">
                    {order.detail?.city ?? "Location not recorded yet"}
                  </p>
                </div>
              </div>

              {items.length > 0 && (
                <div className="rounded-[1.5rem] border border-[#ece7d6] bg-white p-4 md:p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d99000]">
                        Product Snapshot
                      </p>
                      <p className="mt-1 text-sm text-[#5f6480]">
                        A quick look at the products included in this checkout.
                      </p>
                    </div>
                    <span className="rounded-full bg-[#f8f4e4] px-3 py-1 text-xs font-medium text-[#6b623f]">
                      {items.length} line item{items.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {items.slice(0, 2).map((item) => {
                      const imageUrl = item.product.images?.[0] || "/assets/icons/no-data.svg";

                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-[1.25rem] border border-[#f0ead8] bg-[#fffdfa] p-3"
                        >
                          <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-[#f7f4ea]">
                            <Image
                              src={imageUrl}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#110843] md:text-base">
                              {item.product.name}
                            </p>
                            <p className="mt-1 text-sm text-[#5f6480]">
                              Qty {item.quantity} - Rp {rupiahFormat(Number(item.subtotal))}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 border-t border-[#ece7d6] pt-5 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#110843]">
                    <ReceiptText className="h-4 w-4 text-[#d99000]" />
                    Ready to review this order again anytime.
                  </div>
                  <p className="text-sm text-[#5f6480]">
                    Keep this page for payment follow-up, receipt printing, and quick order recall.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/catalogs">
                    <Button
                      variant="outline"
                      className="h-11 rounded-full border-[#110843]/15 px-5 text-[#110843] hover:bg-[#110843]/5"
                    >
                      Shop Again
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  {order.status === "success" && (
                    <Button
                      onClick={() => handlePrint(order)}
                      className="h-11 rounded-full bg-[#110843] px-5 text-white hover:bg-[#24105f]"
                    >
                      <Printer className="mr-2 h-4 w-4" />
                      Print Receipt
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
