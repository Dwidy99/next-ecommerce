"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { useState } from "react";
import { ActionResult } from "@/types";
import { SignIn } from "../lib/actions";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const initialState: ActionResult = { error: "" };

// ✅ Tombol khusus agar useFormStatus() bisa mendeteksi pending
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="p-[12px_24px] bg-[#110843] text-white rounded-full font-semibold hover:bg-[#3a2086] transition-all duration-200 disabled:bg-[#7c70b6] disabled:cursor-not-allowed"
    >
      {pending ? "Signing in..." : "Sign In to My Account"}
    </button>
  );
}

export default function SignInForm() {
  const [state, formAction] = useFormState(SignIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      action={formAction}
      className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
    >
      {/* 🔹 Header */}
      <div className="flex flex-col gap-2 items-center text-center">
        <img
          src="/assets/logos/logos-black.svg"
          alt="Logo"
          className="max-h-12 w-auto object-contain"
        />
        <h1 className="font-bold text-2xl text-[#110843] mt-2">Sign In</h1>
        <p className="text-sm text-gray-500">Access your account below</p>
      </div>

      {/* 🔸 Error Message */}
      {state.error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded text-center">
          {state.error}
        </p>
      )}

      {/* 📨 Email Input */}
      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-200">
        <Mail size={18} className="text-gray-600" />
        <input
          type="email"
          name="email"
          required
          defaultValue="guest@gmail.com"
          placeholder="Write your email address"
          className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
        />
      </div>

      {/* 🔒 Password Input */}
      <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-200">
        <Lock size={18} className="text-gray-600" />
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          required
          defaultValue="qwerty12"
          placeholder="Write your password"
          className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="flex shrink-0 text-gray-500 hover:text-[#110843] hover:cursor-pointer transition"
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* 🔗 Forgot Password */}
      <div className="text-sm text-right">
        <Link
          href="#"
          className="text-[#616369] underline hover:text-[#110843] transition"
        >
          Forgot Password?
        </Link>
      </div>

      {/* 🔘 Submit (now inside dedicated component) */}
      <SubmitButton />

      {/* 🧭 Secondary Actions */}
      <div className="flex flex-col gap-3 text-center mt-2">
        <Link
          href="/sign-up"
          className="p-[12px_24px] bg-white rounded-full border border-[#E5E5E5] font-semibold hover:bg-[#FFF2B3] hover:text-[#110843] transition"
        >
          Create New Account
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
