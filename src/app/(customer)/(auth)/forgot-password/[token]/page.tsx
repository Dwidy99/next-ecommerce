import ResetPasswordForm from "../_components/reset-password-form";
import { verifyResetToken } from "./lib/data";

type Props = {
  params: { token: string };
};

export default async function ResetPasswordPage({ params }: Props) {
  const check = await verifyResetToken(params.token);

  if ("error" in check) {
    return (
      <div className="bg-[#EFF3FA] min-h-screen flex items-center justify-center">
        <div className="bg-white border border-gray-200 p-8 rounded-2xl text-center w-[400px]">
          <h1 className="text-2xl font-bold text-[#110843] mb-2">
            Token Invalid
          </h1>
          <p className="text-gray-600">{check.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col items-center justify-center">
      <ResetPasswordForm />
    </div>
  );
}
