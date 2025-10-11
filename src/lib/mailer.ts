import { Resend } from "resend";
import { resetPasswordEmailTemplate } from "./email-templates/reset-password";

if (!process.env.RESEND_API_KEY) {
  throw new Error("❌ Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetPasswordEmail(to: string, token: string, name?: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/forgot-password/${token}`;

  try {
    const data = await resend.emails.send({
      from: process.env.NODE_ENV === "production"
        ? "Shopverse Studio <no-reply@shopverse.com>"
        : "Shopverse Studio <onboarding@resend.dev>",
      to,
      subject: "Reset your password",
      html: resetPasswordEmailTemplate({ name, resetLink }),
    });

    console.log("✅ Email sent:", data);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

export async function sendVerificationEmail(to: string, token: string, name?: string) {
  const verifyLink = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/verify-email/${token}`;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
    <style>
      body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #f8f9fb;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 520px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 20px;
        border: 1px solid #eee;
        padding: 40px 30px;
        text-align: center;
      }
      .logo {
        width: 120px;
        margin-bottom: 20px;
      }
      h1 {
        color: #110843;
        font-size: 22px;
        margin-bottom: 10px;
      }
      p {
        color: #616369;
        font-size: 15px;
        line-height: 1.6;
      }
      a.button {
        display: inline-block;
        background-color: #110843;
        color: #ffffff !important;
        padding: 12px 28px;
        border-radius: 30px;
        text-decoration: none;
        font-weight: 600;
        margin-top: 20px;
      }
      a.button:hover {
        background-color: #24105e;
      }
      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img src="https://shopverse.com/assets/logos/logos-black.svg" alt="Shopverse Logo" class="logo" />
      <h1>Verify Your Email</h1>
      <p>Hi ${name ?? "there"},</p>
      <p>
        Welcome to <strong>Shopverse</strong>! <br />
        Please click the button below to verify your email address and activate your account.
      </p>
      <p>
        <a href="${verifyLink}" target="_blank" class="button">Verify Email</a>
      </p>
      <p style="margin-top:30px;color:#999;font-size:13px">
        If you didn’t request this, you can safely ignore this email. <br />
        This link will expire in <strong>1 hour</strong>.
      </p>
      <div class="footer">— Shopverse Team —</div>
    </div>
  </body>
  </html>
  `;

  const data = await resend.emails.send({
    from: "Shopverse <onboarding@resend.dev>",
    to,
    subject: "Verify your email address",
    html,
  });

  console.log("✅ Verification email sent:", data);
}





