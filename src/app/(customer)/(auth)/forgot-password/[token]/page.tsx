import ResetPasswordForm from "../_components/reset-password-form";
import { verifyResetToken } from "./lib/data";
import type { ResetPasswordPageProps } from "@/app/(customer)/types";

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const { token } = await params;
  const check = await verifyResetToken(token);

  if ("error" in check) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] px-4 py-8 sm:px-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-[#110843] mb-2">
            Token Invalid
          </h1>
          <p className="text-gray-600">{check.error}</p>
          <p className="mt-4 text-sm text-gray-500">
            If the problem continues, request a new reset link from the forgot
            password page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] px-4 py-8 sm:px-6">
      <ResetPasswordForm token={token} />
    </main>
  );
}
