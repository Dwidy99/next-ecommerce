import Link from "next/link";

export default function ForgotPasswordSentPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] px-4 py-8 sm:px-6">
      <div className="w-full max-w-[450px] rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <img
          src="/assets/icons/mail-sent.svg"
          alt="Mail sent"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-[#110843] mb-2">
          Check Your Email
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          We've sent you a link to reset your password. Please check your inbox
          and follow the instructions.
        </p>

        <Link
          href="/sign-in"
          className="inline-block p-[12px_24px] bg-[#110843] text-white rounded-full font-semibold hover:bg-[#24105e] transition"
        >
          Back to Sign In
        </Link>

        <p className="text-xs text-gray-500 mt-4">
          Didn't receive the email? Check your spam folder or{" "}
          <Link
            href="/forgot-password"
            className="text-[#110843] underline hover:text-[#FFC736]"
          >
            try again
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
