"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { ActionResult } from "@/types";
import { SignUp } from "../sign-in/lib/actions";

const initialState: ActionResult = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-[12px_24px] bg-[#110843] text-white rounded-full font-semibold hover:bg-[#24105e] transition-all duration-200 disabled:bg-[#7c70b6] disabled:cursor-not-allowed"
    >
      {pending ? "Creating account..." : "Create My Account"}
    </button>
  );
}

export default function SignUpPage() {
  const [state, formAction] = useFormState(SignUp, initialState);

  return (
    <div className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col">
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <form
          action={formAction}
          className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
        >
          {/* 🔹 Logo Centered */}
          <div className="flex flex-col items-center text-center gap-2">
            <img
              src="/assets/logos/logos-black.svg"
              alt="Logo"
              className="max-h-12 w-auto object-contain"
            />
            <h1 className="font-bold text-2xl leading-[34px] text-[#110843] mt-2">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500">Create your account below</p>
          </div>

          {/* 🔸 Error Message */}
          {state.error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded text-center">
              {state.error}
            </p>
          )}

          {/* 🧍 Full Name */}
          <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-200">
            <img
              src="/assets/icons/profile-circle.svg"
              alt="name"
              className="w-5 h-5"
            />
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Write your complete name"
              className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
            />
          </div>

          {/* ✉️ Email */}
          <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-200">
            <img src="/assets/icons/sms.svg" alt="email" className="w-5 h-5" />
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Write your email address"
              className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
            />
          </div>

          {/* 🔒 Password */}
          <div className="flex items-center gap-3 rounded-full border border-[#E5E5E5] px-5 py-3 focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-200">
            <img
              src="/assets/icons/lock.svg"
              alt="password"
              className="w-5 h-5"
            />
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Write your password"
              className="appearance-none outline-none w-full placeholder:text-[#616369] font-semibold text-black bg-transparent"
            />
            <button
              type="button"
              className="flex shrink-0 opacity-70 hover:opacity-100 transition"
            >
              <img src="/assets/icons/eye.svg" alt="show" className="w-5 h-5" />
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
      </div>
    </div>
  );
}
