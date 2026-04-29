"use client";

import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useActionState, useState } from "react";
import { ActionResult } from "@/app/(customer)/types";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { SignUp } from "../lib/actions";

const initialState: ActionResult = { error: "", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-[#110843] px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#3a2086] disabled:cursor-not-allowed disabled:bg-[#7c70b6]"
    >
      {pending ? "Creating account..." : "Create My Account"}
    </button>
  );
}

export default function SignUpForm() {
  const [state, formAction] = useActionState(SignUp, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const toggleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowConfirm((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    const form = e.currentTarget as HTMLFormElement;
    const password = (
      form.querySelector('[name="password"]') as HTMLInputElement
    )?.value;
    const confirm = (
      form.querySelector('[name="confirmPassword"]') as HTMLInputElement
    )?.value;

    if (password !== confirm) {
      e.preventDefault();
      alert("Passwords do not match!");
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-[#E5E5E5] bg-white px-6 py-8 shadow-sm transition-all sm:px-10 sm:py-10"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src="/assets/logos/logos-black.svg"
          alt="Logo"
          className="max-h-10 w-auto object-contain sm:max-h-12"
        />
        <h1 className="mt-2 text-2xl font-bold text-[#110843] sm:text-3xl">
          Sign Up
        </h1>
        <p className="text-sm text-gray-500 sm:text-base">
          Create your account below
        </p>
      </div>

      {state.error && (
        <p className="rounded border border-red-200 bg-red-50 p-2 text-center text-sm text-red-500">
          {state.error}
        </p>
      )}

      {state.message && (
        <p className="rounded border border-green-200 bg-green-50 p-2 text-center text-sm text-green-600">
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 transition focus-within:ring-2 focus-within:ring-[#FFC736]">
        <User size={18} className="text-gray-600" />
        <input
          type="text"
          name="name"
          required
          placeholder="Write your full name"
          className="w-full appearance-none bg-transparent text-sm font-semibold outline-none placeholder:text-[#616369] sm:text-base"
        />
      </div>

      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 transition focus-within:ring-2 focus-within:ring-[#FFC736]">
        <Mail size={18} className="text-gray-600" />
        <input
          type="email"
          name="email"
          required
          placeholder="Write your email address"
          className="w-full appearance-none bg-transparent text-sm font-semibold outline-none placeholder:text-[#616369] sm:text-base"
        />
      </div>

      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 transition focus-within:ring-2 focus-within:ring-[#FFC736]">
        <Lock size={18} className="text-gray-600" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          required
          placeholder="Write your password"
          className="w-full appearance-none bg-transparent text-sm font-semibold outline-none placeholder:text-[#616369] sm:text-base"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="shrink-0 text-gray-500 transition hover:text-[#110843]"
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 transition focus-within:ring-2 focus-within:ring-[#FFC736]">
        <Lock size={18} className="text-gray-600" />
        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          required
          placeholder="Confirm your password"
          className="w-full appearance-none bg-transparent text-sm font-semibold outline-none placeholder:text-[#616369] sm:text-base"
        />
        <button
          type="button"
          onClick={toggleConfirm}
          className="shrink-0 text-gray-500 transition hover:text-[#110843]"
        >
          {showConfirm ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>

      <SubmitButton />

      <div className="mt-2 flex flex-col gap-3 text-center">
        <Link
          href="/sign-in"
          className="rounded-full border border-[#E5E5E5] bg-white px-6 py-3 font-semibold transition hover:bg-[#FFF2B3] hover:text-[#110843]"
        >
          Sign In Instead
        </Link>
      </div>
    </form>
  );
}
