"use client";

import { useFormState, useFormStatus } from "react-dom";
import { ActionResult } from "@/types";
import { Lock } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { ResetPasswordAction } from "../[token]/lib/actions";

const initialState: ActionResult = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-[12px_24px] bg-[#110843] text-white rounded-full font-semibold hover:bg-[#3a2086] transition-all duration-200 disabled:bg-[#7c70b6]"
    >
      {pending ? "Updating..." : "Reset Password"}
    </button>
  );
}

export default function ResetPasswordForm() {
  const params = useParams<{ token: string }>();
  const token = params.token;

  const action = useCallback(
    (prevState: ActionResult, formData: FormData) =>
      ResetPasswordAction(token, formData),
    [token]
  );

  const [state, formAction] = useFormState(action, initialState);

  return (
    <form
      action={formAction}
      className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
    >
      {/* Header */}
      <div className="flex flex-col gap-2 items-center text-center">
        <img
          src="/assets/logos/logos-black.svg"
          alt="Logo"
          className="max-h-12 w-auto object-contain"
        />
        <h1 className="font-bold text-2xl text-[#110843] mt-2">
          Reset Your Password
        </h1>
        <p className="text-sm text-gray-500">Enter your new password below.</p>
      </div>

      {/* Error Message */}
      {state.error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded text-center">
          {state.error}
        </p>
      )}

      {/* New Password */}
      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736]">
        <Lock size={18} className="text-gray-600" />
        <input
          type="password"
          name="password"
          required
          placeholder="New password"
          className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
        />
      </div>

      {/* Confirm Password */}
      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736]">
        <Lock size={18} className="text-gray-600" />
        <input
          type="password"
          name="confirm"
          required
          placeholder="Confirm password"
          className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
        />
      </div>

      <SubmitButton />

      {state.error === "" && (
        <p className="text-sm text-green-600 text-center">
          ✅ Password reset successfully. Redirecting...
        </p>
      )}
    </form>
  );
}
