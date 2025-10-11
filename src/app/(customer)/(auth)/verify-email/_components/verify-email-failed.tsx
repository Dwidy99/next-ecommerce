"use client";

import Link from "next/link";

export default function VerifyFailed() {
  return (
    <div className="w-[400px] bg-white p-8 rounded-3xl border border-[#E5E5E5] text-center">
      <img
        src="/assets/logos/logos-black.svg"
        alt="Logo"
        className="max-h-10 mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold text-[#110843] mb-2">
        Verification Failed ❌
      </h1>
      <p className="text-gray-600 text-sm mb-4">
        The verification link is invalid or has expired.
        <br />
        Please request a new verification email.
      </p>
      <Link
        href="/verify-email"
        className="inline-block bg-[#110843] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#24105e] transition"
      >
        Resend Verification
      </Link>
    </div>
  );
}
