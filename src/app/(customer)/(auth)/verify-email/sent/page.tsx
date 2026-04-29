import Link from "next/link";

export default function VerifyEmailSentPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] px-4 py-8 text-center sm:px-6">
      <section className="grid w-full max-w-md gap-6 rounded-3xl border border-[#E5E5E5] bg-white p-6 shadow-sm sm:p-10">
        <img
          src="/assets/logos/logos-black.svg"
          alt="Logo"
          className="mx-auto max-h-12"
        />

        <div className="grid gap-2">
          <h1 className="text-2xl font-bold text-[#110843]">
            Verify Your Email
          </h1>
          <p className="text-sm leading-6 text-gray-600">
            We have sent a verification link to your email address. Please check
            your inbox to complete your registration.
          </p>
          <p className="text-xs text-gray-500">
            Did not receive it? Try checking your spam folder.
          </p>
        </div>

        <Link
          href="/sign-in"
          className="inline-flex justify-center rounded-full bg-[#110843] px-6 py-3 font-semibold text-white transition hover:bg-[#24105e]"
        >
          Go to Sign In
        </Link>
      </section>
    </main>
  );
}
