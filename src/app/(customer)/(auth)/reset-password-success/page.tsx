import Link from "next/link";

export default function ResetPasswordSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] px-4 py-8 sm:px-6">
      <div className="w-full max-w-[450px] rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <img
          src="/assets/icons/check-circle.svg"
          alt="Success"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-[#110843] mb-2">
          Password Updated
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Your password has been successfully reset. You can now sign in with
          your new credentials.
        </p>

        <Link
          href="/sign-in"
          className="inline-block p-[12px_24px] bg-[#110843] text-white rounded-full font-semibold hover:bg-[#24105e] transition"
        >
          Go to Sign In
        </Link>
      </div>
    </main>
  );
}
