import Link from "next/link";

export default function VerifyEmailSentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF3FA] text-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-md w-full max-w-md border border-[#E5E5E5]">
        {/* 🔹 Logo */}
        <img
          src="/assets/logos/logos-black.svg"
          alt="Logo"
          className="max-h-12 mx-auto mb-4"
        />

        {/* 🔹 Title */}
        <h1 className="text-2xl font-bold text-[#110843] mb-2">
          Verify Your Email
        </h1>

        {/* 🔹 Description */}
        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email address.
          <br />
          Please check your inbox to complete your registration.
        </p>

        <p className="text-sm text-gray-400 mb-8">
          Didn’t receive it? Try checking your spam folder.
        </p>

        {/* 🔹 Link ke login */}
        <Link
          href="/sign-in"
          className="text-[#110843] font-semibold underline underline-offset-4 hover:text-[#FFC736] transition"
        >
          Go to Login →
        </Link>
      </div>
    </div>
  );
}
