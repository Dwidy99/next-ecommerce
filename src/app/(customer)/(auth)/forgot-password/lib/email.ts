import { Resend } from "resend";
import { resetPasswordEmailTemplate } from "./email-template";

function getAppBaseUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_REDIRECT_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000";

  try {
    const url = new URL(rawUrl);
    url.pathname = "";
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:3000";
  }
}

function createResetPasswordUrl(token: string) {
  return `${getAppBaseUrl()}/forgot-password/${token}`;
}

function getResetPasswordSender() {
  return (
    process.env.RESEND_FROM_EMAIL || "Shopverse Studio <onboarding@resend.dev>"
  );
}

export async function sendResetPasswordEmail(
  to: string,
  token: string,
  name?: string,
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY in environment variables");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const resetLink = createResetPasswordUrl(token);

  const result = await resend.emails.send({
    from: getResetPasswordSender(),
    to,
    subject: "Reset your password",
    html: resetPasswordEmailTemplate({ name, resetLink }),
  });

  if (result.error) {
    throw new Error(result.error.message || "Failed to send reset email");
  }

  console.log("Reset password email sent:", result.data?.id);
}
