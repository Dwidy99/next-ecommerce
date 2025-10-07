"use client";

import { useActionState } from "react";
import { ForgotPasswordAction } from "../lib/actions";
import { ActionResult } from "@/types";

const initialState: ActionResult = { error: "" };

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    ForgotPasswordAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="w-[500px] bg-white p-[40px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
    >
      <h1 className="font-bold text-2xl text-[#110843] text-center">
        Forgot Password
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Enter your registered email and we’ll send a reset link.
      </p>

      {state.error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded text-center">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-200">
        <input
          type="email"
          name="email"
          required
          placeholder="Write your email address"
          className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="p-[12px_24px] bg-[#110843] text-white rounded-full font-semibold hover:bg-[#24105e] transition-all duration-200 disabled:bg-[#7c70b6] disabled:cursor-not-allowed"
      >
        {isPending ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}
