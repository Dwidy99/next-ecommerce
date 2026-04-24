import ResetPasswordForm from "../_components/reset-password-form";
import { verifyResetToken } from "./lib/data";

type Props = {
  params: { token: string };
};

export default async function ResetPasswordPage({ params }: Props) {
  const check = await verifyResetToken(params.token);

  if ("error" in check) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] px-4 py-8 sm:px-6">
        <div className="w-full max-w-[400px] rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-[#110843] mb-2">
            Token Invalid
          </h1>
          <p className="text-gray-600">{check.error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] px-4 py-8 sm:px-6">
      <ResetPasswordForm token={params.token} />
    </main>
  );
}
