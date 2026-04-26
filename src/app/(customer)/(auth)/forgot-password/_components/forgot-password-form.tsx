"use client";

import { ActionResult } from "@/app/(customer)/types";
import Link from "next/link";
import { useActionState } from "react";
import { ForgotPasswordAction } from "../lib/actions";

const initialState: ActionResult = { error: "" };

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    ForgotPasswordAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="flex w-full max-w-lg flex-col gap-5 rounded-3xl border border-[#E5E5E5] bg-white p-6 shadow-sm sm:px-8 py-10"
    >
      <h1 className="font-bold text-2xl text-[#110843] text-center">
        Forgot Password
      </h1>
      <p className="text-sm text-gray-500 text-center">
        Enter your registered email and we'll send a reset link.
      </p>

      {state.error && (
        <p className="rounded border border-red-200 bg-red-50 p-2 text-center text-sm text-red-500">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3 rounded-2xl border border-[#E5E5E5] px-4 py-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-[#FFC736] sm:rounded-full sm:px-5">
        <input
          type="email"
          name="email"
          required
          placeholder="Write your email address"
          className="w-full appearance-none bg-transparent font-semibold text-black outline-none placeholder:text-[#616369]"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-[#110843] px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#24105e] disabled:cursor-not-allowed disabled:bg-[#7c70b6]"
      >
        {isPending ? "Sending..." : "Send Reset Link"}
      </button>

      <Link
        href="/sign-in"
        className="inline-block rounded-full border border-[#110843] bg-white px-6 py-3 text-center font-semibold text-[#110843] transition-all duration-200 hover:bg-[#f3f3f3]"
      >
        Back
      </Link>
    </form>
  );
}
