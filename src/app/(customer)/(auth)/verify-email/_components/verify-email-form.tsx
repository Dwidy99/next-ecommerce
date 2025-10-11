"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendEmailVerificationAction } from "../../sign-up/lib/actions";
import { ActionResult } from "@/types";
import { Mail } from "lucide-react";
import Link from "next/link";

const initialState: ActionResult = { error: "", message: "" };

export default function VerifyEmailForm() {
  const [state, formAction] = useFormState(
    sendEmailVerificationAction,
    initialState
  );
  const { pending } = useFormStatus();

  return (
    <form
      action={formAction}
      className="w-[400px] bg-white p-8 rounded-3xl border border-[#E5E5E5] flex flex-col gap-5 text-center shadow-sm"
    >
      {/* 🔹 Logo & Title */}
      <img
        src="/assets/logos/logos-black.svg"
        alt="Logo"
        className="max-h-10 mx-auto mb-2 object-contain"
      />
      <h1 className="text-2xl font-bold text-[#110843]">Verify Your Email</h1>
      <p className="text-sm text-gray-500 mb-2">
        Enter your email to receive a new verification link.
      </p>

      {/* 🔸 Error Message */}
      {state.error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded">
          {state.error}
        </p>
      )}

      {/* 🟢 Success Message */}
      {state.message && (
        <p className="text-green-600 text-sm bg-green-50 border border-green-200 p-2 rounded">
          {state.message}
        </p>
      )}

      {/* ✉️ Input Field */}
      <div className="flex items-center gap-3 border border-[#E5E5E5] rounded-full px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition">
        <Mail size={18} className="text-gray-500" />
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="outline-none w-full font-semibold text-black placeholder:text-[#616369] bg-transparent"
        />
      </div>

      {/* 🔘 Submit Button */}
      <button
        type="submit"
        disabled={pending}
        className="p-[12px_24px] bg-[#110843] text-white rounded-full font-semibold hover:bg-[#24105e] transition disabled:bg-[#7c70b6] disabled:cursor-not-allowed"
      >
        {pending ? "Sending..." : "Send Verification Email"}
      </button>

      {/* 🔗 Navigation Links */}
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <Link
          href="/sign-in"
          className="text-[#110843] font-semibold underline underline-offset-4 hover:text-[#FFC736] transition"
        >
          Back to Sign In
        </Link>
        <Link
          href="/sign-up"
          className="text-[#616369] hover:text-[#110843] transition"
        >
          Don’t have an account? Sign Up
        </Link>
      </div>
    </form>
  );
}
