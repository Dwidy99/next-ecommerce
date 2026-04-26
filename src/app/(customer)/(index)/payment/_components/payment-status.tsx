"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ban, CheckCircle2, Clock3, ShoppingBag, XCircle } from "lucide-react";

type PaymentStatusProps = {
  status: "success" | "pending" | "failed" | "cancelled";
  code?: string;
};

export default function PaymentStatus({ status, code }: PaymentStatusProps) {
  const config = {
    success: {
      title: "Payment Successful!",
      message:
        "Thank you for your purchase. Your payment has been confirmed and your order is being processed.",
      icon: <CheckCircle2 className="h-full w-full text-green-600" />,
      bg: "from-green-50 to-white",
      button: {
        text: "View Purchase History",
        color: "bg-[#110843] text-white hover:bg-[#2b127a]",
        href: "/payment/purchase-history",
      },
    },
    pending: {
      title: "Payment Pending",
      message:
        "Your payment is still being processed. Please wait a moment or refresh this page later.",
      icon: <Clock3 className="h-full w-full text-yellow-500" />,
      bg: "from-yellow-50 to-white",
      button: {
        text: "Refresh Status",
        color: "bg-[#FFC736] text-[#110843] hover:bg-[#f5b400]",
        href: "/payment/purchase-history",
      },
    },
    failed: {
      title: "Payment Failed",
      message:
        "Oops! Something went wrong. You can retry your payment or contact support for help.",
      icon: <XCircle className="h-full w-full text-red-600" />,
      bg: "from-red-50 to-white",
      button: {
        text: "Retry Payment",
        color: "bg-[#FFC736] text-[#110843] hover:bg-[#f5b400]",
        href: "/payment/purchase-history",
      },
    },
    cancelled: {
      title: "Payment Cancelled",
      message:
        "This payment has been cancelled. You can always place a new order anytime.",
      icon: <Ban className="h-full w-full text-gray-500" />,
      bg: "from-gray-50 to-white",
      button: {
        text: "Go Shopping Again",
        color: "bg-[#110843] text-white hover:bg-[#2b127a]",
        href: "/catalogs",
      },
    },
  }[status];

  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-gradient-to-b px-4 py-16 ${config.bg}`}
    >
      <section className="flex w-full max-w-2xl flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg md:p-10">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 shadow-inner md:h-24 md:w-24">
          <div className="h-10 w-10 md:h-12 md:w-12">{config.icon}</div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-[#110843] md:text-3xl">
          {config.title}
        </h1>
        <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-600 md:text-base">
          {config.message}
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href={config.button.href} className="w-full sm:w-auto">
            <Button
              className={`w-full rounded-full px-6 py-3 sm:w-auto ${config.button.color}`}
            >
              {config.button.text}
            </Button>
          </Link>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2 rounded-full border-[#110843] px-6 py-3 text-[#110843] hover:bg-[#110843]/5 sm:w-auto"
            >
              <ShoppingBag className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {code && (
          <p className="mt-6 text-xs text-gray-500">
            Order Code: <span className="font-semibold">{code}</span>
          </p>
        )}
      </section>
    </main>
  );
}
