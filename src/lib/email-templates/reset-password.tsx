export function resetPasswordEmailTemplate({
  name,
  resetLink,
}: {
  name?: string;
  resetLink: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
    <body style="font-family: Arial, sans-serif;">
      <h1>Reset Your Password</h1>
      <p>Hi ${name || "there"},</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    </body>
  </html>`;
}
