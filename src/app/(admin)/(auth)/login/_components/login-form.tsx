"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { SignIn } from "@/app/(admin)/dashboard/sign-in/lib/actions";
import { ActionResult } from "@/types";

const initialState: ActionResult = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        w-full py-3 px-6
        bg-[#110843] text-white font-semibold rounded-xl
        hover:bg-[#3a2086] transition
        disabled:opacity-60
      "
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function SignInForm() {
  const [state, formAction] = useActionState(SignIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[#110843]">Admin Sign In</h1>
          <p className="text-gray-500 text-sm">Login to access the dashboard</p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          {/* Error */}
          {state.error && (
            <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 p-2 rounded">
              {state.error}
            </p>
          )}

          {/* Email */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition">
            <Mail size={18} className="text-gray-500" />
            <input
              type="email"
              name="email"
              required
              placeholder="admin@email.com"
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition">
            <Lock size={18} className="text-gray-500" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              className="w-full outline-none bg-transparent text-sm"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-[#110843]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
