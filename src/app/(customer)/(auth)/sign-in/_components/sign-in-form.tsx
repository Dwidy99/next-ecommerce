"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useActionState, useState } from "react";
import { usePathname } from "next/navigation";
import { ActionResult } from "@/app/(customer)/types";
import { SignIn } from "../lib/actions";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const initialState: ActionResult = { error: "" };
const defaultCustomerEmail = "guest@gmail.com";
const defaultCustomerPassword = "qwerty12";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-[#110843] px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#3a2086] disabled:cursor-not-allowed disabled:bg-[#7c70b6]"
    >
      {pending ? "Signing in..." : "Sign In to My Account"}
    </button>
  );
}

function LoginLoadingOverlay() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/85 px-6 text-center backdrop-blur-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF4CC] text-[#110843]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </span>
      <div>
        <p className="font-bold text-[#110843]">Signing you in...</p>
        <p className="mt-1 text-sm text-gray-500">
          Please wait while we prepare your account.
        </p>
      </div>
    </div>
  );
}

export default function SignInForm() {
  const [state, formAction] = useActionState(SignIn, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();
  const redirectTo = pathname === "/sign-in" ? "" : pathname;

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      action={formAction}
      className="relative flex flex-col gap-5 rounded-3xl border border-[#E5E5E5] bg-white px-6 py-8 shadow-sm transition-all sm:px-10 sm:py-10"
    >
      <LoginLoadingOverlay />
      {redirectTo && (
        <input type="hidden" name="redirectTo" value={redirectTo} />
      )}

      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src="/assets/logos/logos-black.svg"
          alt="Logo"
          className="max-h-10 w-auto object-contain sm:max-h-12"
        />
        <h1 className="mt-2 text-2xl font-bold text-[#110843] sm:text-3xl">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 sm:text-base">
          Access your account below
        </p>
      </div>

      {state.error && (
        <p className="rounded border border-red-200 bg-red-50 p-2 text-center text-sm text-red-500">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 transition focus-within:ring-2 focus-within:ring-[#FFC736]">
        <Mail size={18} className="text-gray-600" />
        <input
          type="email"
          name="email"
          required
          defaultValue={defaultCustomerEmail}
          placeholder="Write your email address"
          className="w-full appearance-none bg-transparent text-sm font-semibold text-black outline-none placeholder:text-[#616369] sm:text-base"
        />
      </div>

      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 transition focus-within:ring-2 focus-within:ring-[#FFC736]">
        <Lock size={18} className="text-gray-600" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          required
          defaultValue={defaultCustomerPassword}
          placeholder="Write your password"
          className="w-full appearance-none bg-transparent text-sm font-semibold text-black outline-none placeholder:text-[#616369] sm:text-base"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="flex shrink-0 text-gray-500 transition hover:text-[#110843]"
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>

      <div className="text-right text-sm">
        <Link
          href="/forgot-password"
          className="text-[#616369] underline transition hover:text-[#110843]"
        >
          Forgot Password?
        </Link>
      </div>

      <SubmitButton />

      <div className="rounded-2xl border border-[#FFE08A] bg-[#FFF8D8] px-4 py-3 text-center text-xs leading-5 text-[#6B4A00]">
        <p className="font-semibold text-[#110843]">Default customer login</p>
        <p>Email: {defaultCustomerEmail}</p>
        <p>Password: {defaultCustomerPassword}</p>
      </div>

      <div className="mt-2 flex flex-col gap-3 text-center">
        <Link
          href="/sign-up"
          className="rounded-full border border-[#E5E5E5] bg-white px-6 py-3 font-semibold transition hover:bg-[#FFF2B3] hover:text-[#110843]"
        >
          Create New Account
        </Link>
        <Link
          href="/"
          className="rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[#616369] transition hover:bg-[#F8F8F8] hover:text-[#110843]"
        >
          Back to Home
        </Link>
      </div>
    </form>
  );
}

