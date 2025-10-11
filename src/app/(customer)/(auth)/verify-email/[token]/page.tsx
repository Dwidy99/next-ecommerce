// src/app/(customer)/(auth)/verify-email/[token]/page.tsx
import Link from "next/link";
import { verifyEmailToken } from "../lib/actions";

export default async function VerifyEmailPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = await params;
  const verified = await verifyEmailToken(token);

  if (!verified) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#EFF3FA]">
        <div className="w-[400px] bg-white border border-[#E5E5E5] rounded-2xl p-8 text-center">
          <img
            src="/assets/logos/logos-black.svg"
            alt="Logo"
            className="max-h-10 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-[#110843] mb-2">
            Verification Failed ❌
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            The link is invalid or has expired.
          </p>
          <Link
            href="/sign-in"
            className="inline-block bg-[#110843] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#24105e]"
          >
            Back to Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#EFF3FA]">
      <div className="w-[400px] bg-white border border-[#E5E5E5] rounded-2xl p-8 text-center">
        <img
          src="/assets/logos/logos-black.svg"
          alt="Logo"
          className="max-h-10 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-[#110843] mb-2">
          Email Verified ✅
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          Your email has been successfully verified. You can now sign in.
        </p>
        <Link
          href="/sign-in"
          className="inline-block bg-[#110843] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#24105e]"
        >
          Go to Sign In
        </Link>
      </div>
    </main>
  );
}
