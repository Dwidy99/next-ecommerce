"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock3, XCircle, Ban, ShoppingBag } from "lucide-react";

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
      icon: <CheckCircle2 className="text-green-600" />,
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
      icon: <Clock3 className="text-yellow-500" />,
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
      icon: <XCircle className="text-red-600" />,
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
      icon: <Ban className="text-gray-500" />,
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
      className={`min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b ${config.bg}`}
    >
      {/* 🌟 Center Card Layout */}
      <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-2xl rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 text-center flex flex-col items-center">
        {/* 🔹 Icon */}
        <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 shadow-inner mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12">{config.icon}</div>
        </div>

        {/* 🔹 Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#110843] mb-3">
          {config.title}
        </h1>

        {/* 🔹 Message */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-md">
          {config.message}
        </p>

        {/* 🔹 Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto">
          <Link href={config.button.href} className="w-full sm:w-auto">
            <Button
              className={`rounded-full w-full sm:w-auto px-6 py-3 ${config.button.color}`}
            >
              {config.button.text}
            </Button>
          </Link>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="rounded-full border-[#110843] text-[#110843] hover:bg-[#110843]/5 px-6 py-3 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </div>

        {/* 🔹 Order Code (optional) */}
        {code && (
          <p className="text-xs text-gray-500 mt-6">
            Order Code: <span className="font-semibold">{code}</span>
          </p>
        )}
      </div>
    </main>
  );
}
