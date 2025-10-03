"use client";

import React, { useActionState, useEffect } from "react";
import { ActionResult } from "@/types";
import { repayOrder } from "../lib/actions";

const initialState: ActionResult = { error: "" };

export default function RepayPayment({ code }: { code: string }) {
  const repayParams = (_: unknown, formData: FormData) => {
    formData.set("code", code);
    return repayOrder(_, formData);
  };

  const [state, formAction] = useActionState(repayParams, initialState);

  useEffect(() => {
    if (state?.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state?.redirectUrl]);

  return (
    <form action={formAction}>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold"
      >
        🔄 Pay Again
      </button>
    </form>
  );
}
