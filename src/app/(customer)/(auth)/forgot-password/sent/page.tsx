import Link from "next/link";

export default function ForgotPasswordSentPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] px-4 py-8 sm:px-6">
      <section className="grid w-full max-w-md gap-6 rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <img
          src="/assets/icons/mail-sent.svg"
          alt="Mail sent"
          className="mx-auto h-16 w-16"
        />
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold text-[#110843]">
            Check Your Email
          </h1>
          <p className="text-sm leading-6 text-gray-600">
            We've sent you a link to reset your password. Please check your
            inbox and follow the instructions.
          </p>
        </div>

        <Link
          href="/sign-in"
          className="inline-flex justify-center rounded-full bg-[#110843] px-6 py-3 font-semibold text-white transition hover:bg-[#24105e]"
        >
          Back to Sign In
        </Link>

        <p className="text-xs leading-5 text-gray-500">
          Didn't receive the email? Check your spam folder or{" "}
          <Link
            href="/forgot-password"
            className="text-[#110843] underline hover:text-[#FFC736]"
          >
            try again
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
