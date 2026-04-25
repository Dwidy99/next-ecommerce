"use client";

import { useFormState, useFormStatus } from "react-dom";
import { ActionResult } from "@/app/(customer)/types";
import { Lock } from "lucide-react";
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

export default function ResetPasswordForm({ token }: { token: string }) {
  const resetPassword = (_: ActionResult, formData: FormData) => {
    return ResetPasswordAction(token, formData);
  };

  const [state, formAction] = useFormState(resetPassword, initialState);

  return (
    <form
      action={formAction}
      className="flex w-full max-w-[500px] flex-col gap-5 rounded-3xl border border-[#E5E5E5] bg-white p-6 shadow-sm sm:p-[50px_30px]"
    >
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

      {state.error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded text-center">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3 rounded-2xl border border-[#E5E5E5] px-4 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] sm:rounded-full sm:px-5">
        <Lock size={18} className="text-gray-600" />
        <input
          type="password"
          name="password"
          required
          placeholder="New password"
          className="w-full appearance-none bg-transparent font-semibold text-black outline-none placeholder:text-[#616369]"
        />
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-[#E5E5E5] px-4 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] sm:rounded-full sm:px-5">
        <Lock size={18} className="text-gray-600" />
        <input
          type="password"
          name="confirm"
          required
          placeholder="Confirm password"
          className="w-full appearance-none bg-transparent font-semibold text-black outline-none placeholder:text-[#616369]"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
