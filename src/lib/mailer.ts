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
