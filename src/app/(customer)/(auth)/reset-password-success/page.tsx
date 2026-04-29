import Link from "next/link";

export default function ResetPasswordSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] px-4 py-8 sm:px-6">
      <section className="grid w-full max-w-md gap-6 rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <img
          src="/assets/icons/check-circle.svg"
          alt="Success"
          className="mx-auto h-16 w-16"
        />
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold text-[#110843]">
            Password Updated
          </h1>
          <p className="text-sm leading-6 text-gray-600">
            Your password has been successfully reset. You can now sign in with
            your new credentials.
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
