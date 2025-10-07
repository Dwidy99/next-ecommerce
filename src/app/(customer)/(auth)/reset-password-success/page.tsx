// src/app/(customer)/(auth)/reset-password-success/page.tsx
import Link from "next/link";

export default function ResetPasswordSuccessPage() {
  return (
    <div className="bg-[#EFF3FA] min-h-screen flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-3xl p-10 w-[450px] text-center shadow-sm">
        <img
          src="/assets/icons/check-circle.svg"
          alt="Success"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-[#110843] mb-2">
          Password Updated 🎉
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
    </div>
  );
}
