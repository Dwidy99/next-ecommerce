// app/(customer)/(index)/payment/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import PaymentStatus from "../_components/payment-status";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "failed" | "cancelled">(
    "failed"
  );
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      setStatus("failed");
      setLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/order/status?code=${code}`);
        const data = await res.json();

        if (data?.status === "success" || data?.status === "paid") {
          useCart.getState().resetCart();
          setStatus("success");
        } else if (data?.status === "cancelled") {
          useCart.getState().resetCart();
          setStatus("cancelled");
        } else {
          useCart.getState().resetCart();
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [code]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold mb-4">Checking your payment...</h1>
        <p className="text-gray-500">
          Please wait, this may take a few seconds
        </p>
      </main>
    );
  }

  return <PaymentStatus status={status} />;
}
