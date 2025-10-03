// app/(customer)/(index)/payment/success/_components/payment-status.tsx
"use client";

import { useRouter } from "next/navigation";

export default function PaymentStatus({
  status,
}: {
  status: "success" | "failed" | "cancelled";
}) {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center flex-col">
      {status === "success" && (
        <>
          <h1 className="text-3xl font-bold mb-4">Payment Successful 🎉</h1>
          <p className="text-gray-500">
            Thank you! Your order has been received.
          </p>
        </>
      )}

      {status === "failed" && (
        <>
          <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
          <p className="text-gray-500">
            We couldn’t verify your payment status. Please try again or contact
            support.
          </p>
        </>
      )}

      {status === "cancelled" && (
        <>
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-gray-500">You have cancelled this payment.</p>
        </>
      )}

      <button
        onClick={() => router.push("/payment/purchase-history")}
        className="mt-6 px-6 py-3 bg-[#110843] text-white rounded-full"
      >
        View Order
      </button>
    </main>
  );
}
