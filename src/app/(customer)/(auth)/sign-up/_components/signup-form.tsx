"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useState } from "react";
import { ActionResult } from "@/types";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { SignUp } from "../lib/actions";

const initialState: ActionResult = { error: "", message: "" };

// ✅ Tombol submit
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-[12px_24px] bg-[#110843] text-white rounded-full font-semibold hover:bg-[#3a2086] transition-all duration-200 disabled:bg-[#7c70b6] disabled:cursor-not-allowed"
    >
      {pending ? "Creating account..." : "Create My Account"}
    </button>
  );
}

export default function SignUpForm() {
  const [state, formAction] = useFormState(SignUp, initialState);
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
      className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
    >
      {/* 🔹 Header */}
      <div className="flex flex-col gap-2 items-center text-center">
        <img
          src="/assets/logos/logos-black.svg"
          alt="Logo"
          className="max-h-12 w-auto object-contain"
        />
        <h1 className="font-bold text-2xl text-[#110843] mt-2">Sign Up</h1>
        <p className="text-sm text-gray-500">Create your account below</p>
      </div>

      {/* 🔸 Error Message */}
      {state.error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded text-center">
          {state.error}
        </p>
      )}

      {/* 🟢 Success Message */}
      {state.message && (
        <p className="text-green-600 text-sm bg-green-50 border border-green-200 p-2 rounded text-center">
          {state.message}
        </p>
      )}

      {/* 👤 Full Name */}
      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition">
        <User size={18} className="text-gray-600" />
        <input
          type="text"
          name="name"
          required
          placeholder="Write your full name"
          className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
        />
      </div>

      {/* 📨 Email */}
      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition">
        <Mail size={18} className="text-gray-600" />
        <input
          type="email"
          name="email"
          required
          placeholder="Write your email address"
          className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
        />
      </div>

      {/* 🔒 Password */}
      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition">
        <Lock size={18} className="text-gray-600" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          required
          placeholder="Write your password"
          className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="flex shrink-0 text-gray-500 hover:text-[#110843] transition"
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* 🔒 Confirm Password */}
      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition">
        <Lock size={18} className="text-gray-600" />
        <input
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          required
          placeholder="Confirm your password"
          className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
        />
        <button
          type="button"
          onClick={toggleConfirm}
          className="flex shrink-0 text-gray-500 hover:text-[#110843] transition"
        >
          {showConfirm ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* 🔘 Submit */}
      <SubmitButton />

      {/* 🧭 Secondary Actions */}
      <div className="flex flex-col gap-3 text-center mt-2">
        <Link
          href="/sign-in"
          className="p-[12px_24px] bg-white rounded-full border border-[#E5E5E5] font-semibold hover:bg-[#FFF2B3] hover:text-[#110843] transition"
        >
          Sign In Instead
        </Link>

        <Link
          href="/catalogs"
          className="text-[#110843] font-semibold underline underline-offset-4 hover:text-[#FFC736] transition"
        >
          Go to shop →
        </Link>
      </div>
    </form>
  );
}
