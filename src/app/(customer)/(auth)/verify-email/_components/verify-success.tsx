"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function VerifySuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/sign-in");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-[400px] bg-white p-8 rounded-3xl border border-[#E5E5E5] text-center">
      <img
        src="/assets/logos/logos-black.svg"
        alt="Logo"
        className="max-h-10 mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold text-[#110843] mb-2">
        Email Verified 🎉
      </h1>
      <p className="text-gray-600 text-sm mb-4">
        Your email has been successfully verified.
        <br />
        You can now sign in to your account.
      </p>
      <Link
        href="/sign-in"
        className="inline-block bg-[#110843] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#24105e] transition"
      >
        Go to Sign In
      </Link>
    </div>
  );
}
