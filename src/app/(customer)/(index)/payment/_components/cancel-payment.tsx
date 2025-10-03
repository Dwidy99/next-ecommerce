// app/_components/payment-cancel.tsx
"use client";

import React, { useActionState, useEffect } from "react";
import { ActionResult } from "@/types";
import { cancelOrder } from "../lib/actions";

const initialState: ActionResult = { error: "" };

export default function CancelPayment({ code }: { code: string }) {
  const cancelParams = (_: unknown, formData: FormData) => {
    return cancelOrder(_, code);
  };

  const [state, formAction] = useActionState(cancelParams, initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const ok = confirm("Are you sure you want to cancel this payment?");
    if (!ok) {
      e.preventDefault(); // stop submit kalau user klik Cancel
    }
  };

  // ✅ redirect ketika cancel berhasil
  useEffect(() => {
    if (state?.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state?.redirectUrl]);

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <button
        type="submit"
        className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold"
      >
        ❌ Cancel Payment
      </button>
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
    </form>
  );
}
