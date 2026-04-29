"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { rupiahFormat } from "@/lib/utils";
import type {
  OrdersListProps,
  OrderStatusConfig,
  TOrder,
} from "@/app/(customer)/types";
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

const statusMap: Record<TOrder["status"], OrderStatusConfig> = {
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

const receiptPrintStyles = `
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background: #f7f3e7;
            color: #110843;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.5;
          }

          .receipt-page {
            max-width: 860px;
            margin: 32px auto;
            padding: 24px;
          }

          .receipt-card {
            overflow: hidden;
            border: 1px solid #ece7d6;
            border-radius: 24px;
            background: #fffdfa;
            box-shadow: 0 20px 60px rgba(17, 8, 67, 0.08);
          }

          .receipt-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
            padding: 32px;
            background: linear-gradient(135deg, #110843 0%, #24105f 58%, #ffc736 160%);
            color: white;
          }

          .brand-label {
            margin: 0 0 8px;
            color: #ffc736;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }

          h1 {
            margin: 0;
            font-size: 34px;
            line-height: 1.1;
          }

          .receipt-code {
            margin: 10px 0 0;
            color: rgba(255, 255, 255, 0.78);
            font-size: 14px;
          }

          .status-pill {
            display: inline-flex;
            border: 1px solid rgba(255, 255, 255, 0.32);
            border-radius: 999px;
            padding: 8px 14px;
            background: rgba(255, 255, 255, 0.12);
            color: #fff6d6;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            white-space: nowrap;
          }

          .receipt-body {
            padding: 32px;
          }

          .summary-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin-bottom: 24px;
          }

          .summary-box {
            border: 1px solid #ece7d6;
            border-radius: 18px;
            padding: 16px;
            background: #ffffff;
          }

          .summary-label,
          .section-label {
            margin: 0;
            color: #b28700;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          .summary-value {
            margin: 8px 0 0;
            color: #110843;
            font-size: 15px;
            font-weight: 700;
          }

          .section {
            margin-top: 24px;
            border: 1px solid #ece7d6;
            border-radius: 20px;
            background: #ffffff;
            padding: 20px;
          }

          .detail-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
            margin-top: 16px;
          }

          .detail-item {
            border-radius: 14px;
            background: #fff8de;
            padding: 14px;
          }

          .detail-label {
            margin: 0;
            color: #7a6f48;
            font-size: 12px;
            font-weight: 700;
          }

          .detail-value {
            margin: 5px 0 0;
            color: #110843;
            font-size: 14px;
            font-weight: 700;
          }

          table {
            width: 100%;
            margin-top: 16px;
            border-collapse: collapse;
            overflow: hidden;
            border-radius: 14px;
          }

          th,
          td {
            border-bottom: 1px solid #ece7d6;
            padding: 13px 10px;
            vertical-align: top;
            font-size: 13px;
          }

          th {
            background: #fff8de;
            color: #6b623f;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-align: left;
            text-transform: uppercase;
          }

          tr:last-child td {
            border-bottom: 0;
          }

          .product-name {
            font-weight: 700;
          }

          .text-center {
            text-align: center;
          }

          .text-right {
            text-align: right;
          }

          .empty-row {
            color: #7a6f48;
            text-align: center;
          }

          .total-row {
            display: flex;
            justify-content: flex-end;
            margin-top: 18px;
          }

          .total-box {
            min-width: 280px;
            border-radius: 18px;
            background: #110843;
            padding: 18px;
            color: white;
          }

          .total-box p {
            margin: 0;
          }

          .total-box .label {
            color: #ffc736;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          .total-box .amount {
            margin-top: 8px;
            font-size: 28px;
            font-weight: 900;
          }

          .receipt-footer {
            margin-top: 22px;
            color: #5f6480;
            font-size: 13px;
            text-align: center;
          }

          .print-actions {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-top: 20px;
          }

          .print-actions button {
            border: 0;
            border-radius: 999px;
            padding: 12px 18px;
            background: #ffc736;
            color: #110843;
            cursor: pointer;
            font-weight: 800;
          }

          @media (max-width: 720px) {
            .receipt-page {
              margin: 0;
              padding: 12px;
            }

            .receipt-header,
            .receipt-body {
              padding: 22px;
            }

            .receipt-header,
            .detail-grid {
              grid-template-columns: 1fr;
            }

            .receipt-header {
              flex-direction: column;
            }

            .summary-grid {
              grid-template-columns: 1fr;
            }

            table {
              display: block;
              overflow-x: auto;
              white-space: nowrap;
            }

            .total-box {
              width: 100%;
              min-width: 0;
            }
          }

          @media print {
            @page {
              size: A4;
              margin: 8mm;
            }

            body {
              background: white;
            }

            .receipt-page {
              margin: 0;
              max-width: none;
              padding: 0;
            }

            .receipt-card {
              border-radius: 0;
              box-shadow: none;
            }

            .receipt-header {
              padding: 18px 22px;
            }

            h1 {
              font-size: 26px;
            }

            .brand-label {
              margin-bottom: 4px;
              font-size: 10px;
            }

            .receipt-code {
              margin-top: 6px;
              font-size: 12px;
            }

            .status-pill {
              padding: 5px 10px;
              font-size: 10px;
            }

            .receipt-body {
              padding: 16px 22px;
            }

            .summary-grid {
              gap: 10px;
              margin-bottom: 14px;
            }

            .summary-box {
              border-radius: 14px;
              padding: 11px;
            }

            .summary-label,
            .section-label {
              font-size: 9px;
              letter-spacing: 0.16em;
            }

            .summary-value {
              margin-top: 5px;
              font-size: 12px;
            }

            .section {
              margin-top: 14px;
              border-radius: 16px;
              padding: 14px;
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .detail-grid {
              gap: 8px;
              margin-top: 10px;
            }

            .detail-item {
              border-radius: 10px;
              padding: 9px;
            }

            .detail-label {
              font-size: 10px;
            }

            .detail-value {
              margin-top: 3px;
              font-size: 12px;
            }

            table {
              margin-top: 10px;
            }

            th,
            td {
              padding: 8px;
              font-size: 11px;
            }

            th {
              font-size: 9px;
            }

            .total-row {
              margin-top: 10px;
            }

            .total-box {
              min-width: 220px;
              border-radius: 14px;
              padding: 12px;
            }

            .total-box .label {
              font-size: 10px;
            }

            .total-box .amount {
              margin-top: 4px;
              font-size: 22px;
            }

            .receipt-footer {
              margin-top: 12px;
              font-size: 11px;
            }

            .print-actions {
              display: none;
            }
          }

`;

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

function escapeReceiptValue(value: unknown) {
  return String(value ?? "-")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildReceiptItemRows(items: NonNullable<TOrder["products"]>) {
  if (items.length === 0) {
    return `
      <tr>
        <td colspan="5" class="empty-row">No product data available.</td>
      </tr>
    `;
  }

  return items
    .map((item, index) => {
      const productName = escapeReceiptValue(item.product.name);
      const price = rupiahFormat(Number(item.product.price));
      const subtotal = rupiahFormat(Number(item.subtotal));

      return `
        <tr>
          <td>${index + 1}</td>
          <td class="product-name">${productName}</td>
          <td class="text-center">${escapeReceiptValue(item.quantity)}</td>
          <td class="text-right">Rp ${price}</td>
          <td class="text-right">Rp ${subtotal}</td>
        </tr>
      `;
    })
    .join("");
}

function buildReceiptHtml(order: TOrder) {
  const items = order.products ?? [];
  const status = statusMap[order.status] ?? statusMap.pending;
  const detail = order.detail;
  const itemRows = buildReceiptItemRows(items);

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Receipt #${escapeReceiptValue(order.code)}</title>
        <style>${receiptPrintStyles}</style>
      </head>
      <body>
        <main class="receipt-page">
          <section class="receipt-card">
            <header class="receipt-header">
              <div>
                <p class="brand-label">Shopverse Receipt</p>
                <h1>Payment Receipt</h1>
                <p class="receipt-code">Order #${escapeReceiptValue(order.code)}</p>
              </div>
              <span class="status-pill">${escapeReceiptValue(status.label)}</span>
            </header>

            <div class="receipt-body">
              <div class="summary-grid">
                <div class="summary-box">
                  <p class="summary-label">Order Date</p>
                  <p class="summary-value">${escapeReceiptValue(formatOrderDate(order.created_at))}</p>
                </div>
                <div class="summary-box">
                  <p class="summary-label">Payment Status</p>
                  <p class="summary-value">${escapeReceiptValue(status.description)}</p>
                </div>
                <div class="summary-box">
                  <p class="summary-label">Total Items</p>
                  <p class="summary-value">${escapeReceiptValue(getProductCount(order))} item(s)</p>
                </div>
              </div>

              <section class="section">
                <p class="section-label">Customer & Delivery</p>
                <div class="detail-grid">
                  <div class="detail-item">
                    <p class="detail-label">Recipient</p>
                    <p class="detail-value">${escapeReceiptValue(detail?.name)}</p>
                  </div>
                  <div class="detail-item">
                    <p class="detail-label">Phone</p>
                    <p class="detail-value">${escapeReceiptValue(detail?.phone)}</p>
                  </div>
                  <div class="detail-item">
                    <p class="detail-label">Address</p>
                    <p class="detail-value">${escapeReceiptValue(detail?.address)}</p>
                  </div>
                  <div class="detail-item">
                    <p class="detail-label">City & Postal Code</p>
                    <p class="detail-value">${escapeReceiptValue(`${detail?.city ?? "-"} ${detail?.postal_code ?? ""}`.trim())}</p>
                  </div>
                  <div class="detail-item">
                    <p class="detail-label">Notes</p>
                    <p class="detail-value">${escapeReceiptValue(detail?.notes || "-")}</p>
                  </div>
                </div>
              </section>

              <section class="section">
                <p class="section-label">Purchased Products</p>
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Product</th>
                      <th class="text-center">Qty</th>
                      <th class="text-right">Price</th>
                      <th class="text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>${itemRows}</tbody>
                </table>

                <div class="total-row">
                  <div class="total-box">
                    <p class="label">Grand Total</p>
                    <p class="amount">Rp ${escapeReceiptValue(rupiahFormat(Number(order.total)))}</p>
                  </div>
                </div>
              </section>

              <p class="receipt-footer">
                Thank you for shopping with Shopverse. Please keep this receipt for your records.
              </p>

              <div class="print-actions">
                <button type="button" onclick="window.print()">Print Receipt</button>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  `;
}

function printReceipt(order: TOrder) {
  const newWindow = window.open("", "_blank");
  if (!newWindow) return;

  newWindow.document.write(buildReceiptHtml(order));
  newWindow.document.close();
  newWindow.focus();

  newWindow.addEventListener("load", () => {
    newWindow.print();
  });
}

function EmptyOrders() {
  return (
    <div className="rounded-3xl border border-dashed border-[#dccfa2] bg-[#fffdf6] px-6 py-12 text-center text-[#5f6480]">
      <p>No orders found.</p>
    </div>
  );
}

function OrderMetricCard({
  icon,
  label,
  title,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#ece7d6] bg-white p-4">
      <div className="flex items-center gap-2 text-[#d99000]">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-[0.22em]">
          {label}
        </p>
      </div>
      <p className="mt-3 text-sm font-semibold text-[#110843] md:text-base">
        {title}
      </p>
      {description && (
        <p className="mt-1 text-sm text-[#5f6480]">{description}</p>
      )}
    </div>
  );
}

function OrderProductSnapshot({ order }: { order: TOrder }) {
  const items = order.products ?? [];
  if (items.length === 0) return null;

  return (
    <div className="rounded-3xl border border-[#ece7d6] bg-white p-4 md:p-5">
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
              className="flex items-center gap-3 rounded-2xl border border-[#f0ead8] bg-[#fffdfa] p-3"
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
  );
}

function OrderActions({ order }: { order: TOrder }) {
  return (
    <div className="flex flex-col gap-4 border-t border-[#ece7d6] pt-5 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium text-[#110843]">
          <ReceiptText className="h-4 w-4 text-[#d99000]" />
          Ready to review this order again anytime.
        </div>
        <p className="text-sm text-[#5f6480]">
          Keep this page for payment follow-up, receipt printing, and quick
          order recall.
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
            onClick={() => printReceipt(order)}
            className="h-11 rounded-full bg-[#110843] px-5 text-white hover:bg-[#24105f]"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: TOrder }) {
  const status = statusMap[order.status] ?? statusMap.pending;
  const StatusIcon = status.icon;
  const items = order.products ?? [];
  const primaryProduct = items[0]?.product;
  const extraProducts = Math.max(items.length - 1, 0);
  const productCount = getProductCount(order);

  return (
    <article className="overflow-hidden rounded-3xl border border-[#ece7d6] bg-[#fffdfa] shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col gap-6 p-6 md:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3">
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

          <div className="rounded-2xl border border-[#efe3b8] bg-[#fff8de] px-4 py-3 text-left lg:min-w-56">
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
          <OrderMetricCard
            icon={<CalendarDays className="h-4 w-4" />}
            label="Placed On"
            title={formatOrderDate(order.created_at)}
          />
          <OrderMetricCard
            icon={<Package2 className="h-4 w-4" />}
            label="Items"
            title={`${productCount} item${productCount > 1 ? "s" : ""}`}
            description={primaryProduct?.name ?? "Products unavailable"}
          />
          <OrderMetricCard
            icon={<MapPin className="h-4 w-4" />}
            label="Delivery"
            title={order.detail?.name ?? "Recipient not available"}
            description={order.detail?.city ?? "Location not recorded yet"}
          />
        </div>

        <OrderProductSnapshot order={order} />
        <OrderActions order={order} />
      </div>
    </article>
  );
}

export default function OrdersList({ orders = [] }: OrdersListProps) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="flex flex-col gap-5">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
