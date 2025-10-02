"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); // ✅ AMBIL DARI URL, bukan localStorage

  useEffect(() => {
    if (!code) {
      setFailed(true);
      setLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/order/status?code=${code}`);
        const data = await res.json();
        console.log("🔥 /api/order/status response:", data);

        if (data?.status === "success" || data?.status === "paid") {
          useCart.getState().resetCart(); // ✅ Hapus cart saat payment sukses
          setFailed(false);
        } else {
          setFailed(true);
        }
      } catch (err) {
        console.error("Failed to fetch order status", err);
        setFailed(true);
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

  if (failed) {
    return (
      <main className="min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
        <p className="text-gray-500">
          We couldn’t verify your payment status. Please try again or contact
          support.
        </p>
        <button
          onClick={() => router.push("/payment/purchase-history")}
          className="mt-6 px-6 py-3 bg-[#110843] text-white rounded-full"
        >
          View Order
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold mb-4">Payment Successful 🎉</h1>
      <p className="text-gray-500">Thank you! Your order has been received.</p>
      <button
        onClick={() => router.push("/payment/purchase-history")}
        className="mt-6 px-6 py-3 bg-[#110843] text-white rounded-full"
      >
        View Order
      </button>
    </main>
  );
}
