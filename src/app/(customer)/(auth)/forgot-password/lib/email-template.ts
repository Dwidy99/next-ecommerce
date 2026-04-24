export function resetPasswordEmailTemplate({
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
