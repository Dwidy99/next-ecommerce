import { Resend } from "resend";

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

function resetPasswordEmailTemplate({
  name,
  resetLink,
}: {
  name?: string;
  resetLink: string;
}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <body style="font-family: Arial, sans-serif; background: #f8f9fb; margin: 0; padding: 32px;">
      <main style="max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #eeeeee; border-radius: 20px; padding: 32px;">
        <h1 style="color: #110843; margin: 0 0 16px;">Reset Your Password</h1>
        <p style="color: #616369; line-height: 1.6;">Hi ${name || "there"},</p>
        <p style="color: #616369; line-height: 1.6;">
          Click the button below to create a new password for your Shopverse account.
        </p>
        <p style="margin: 28px 0;">
          <a href="${resetLink}" style="display: inline-block; background: #110843; color: #ffffff; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 700;">
            Reset Password
          </a>
        </p>
        <p style="color: #999999; font-size: 13px; line-height: 1.6;">
          This link will expire in 1 hour. If you did not request this, you can safely ignore this email.
        </p>
      </main>
    </body>
  </html>`;
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
