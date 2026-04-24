import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function sendVerificationEmail(
  to: string,
  token: string,
  name?: string,
) {
  const verifyLink = `${getAppBaseUrl()}/verify-email/${token}`;

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
        If you did not request this, you can safely ignore this email. <br />
        This link will expire in <strong>1 hour</strong>.
      </p>
      <div class="footer">Shopverse Team</div>
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

  console.log("Verification email sent:", data);
}
