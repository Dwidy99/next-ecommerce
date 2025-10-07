'use server'
import { findUserByEmail } from "./data";
import { prisma } from "lib/prisma";
import crypto from "crypto";
import { sendResetPasswordEmail } from "@/lib/mailer";
import { redirect } from "next/navigation";

export async function ForgotPasswordAction(
    _: unknown,
    formData: FormData
) {
    const email = String(formData.get("email") ?? "").trim();
    if (!email) return { error: "Email is required" };

    const user = await findUserByEmail(email);
    if (!user) return { error: "No account found with this email" };

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.passwordResetToken.upsert({
        where: { userId: user.id },
        update: { token, expires },
        create: { userId: user.id, token, expires },
    });

    await sendResetPasswordEmail(user.email, token, user.name);
    redirect("/forgot-password/sent");
}
