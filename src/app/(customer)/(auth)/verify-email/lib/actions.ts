"use server";

import { sendVerificationEmail } from "@/lib/mailer";
import { createEmailVerificationToken } from "./data";
import { prisma } from "lib/prisma";
import { TokenType } from "@prisma/client";
import { ActionResult } from "@/types";

/**
 * 🔹 Utility — Kirim email verifikasi langsung via user data
 * (dipakai di server, bukan dari form)
 */
export async function sendEmailVerificationDirect(
    userId: number,
    email: string,
    name?: string
) {
    const token = await createEmailVerificationToken(userId);
    await sendVerificationEmail(email, token, name);
}

/**
 * 🔹 Server Action — Untuk form (useFormState)
 */
export async function sendEmailVerification(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    const email = String(formData.get("email") ?? "").trim();

    if (!email) return { error: "Email is required" };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "No account found with this email" };

    // Gunakan versi direct di sini
    await sendEmailVerificationDirect(user.id, user.email, user.name);

    return { error: "", message: "Verification link sent successfully." };
}

/**
 * 🔹 Verifikasi token
 */
export async function verifyEmailToken(token: string) {
    const record = await prisma.userToken.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!record || record.type !== TokenType.EMAIL_VERIFICATION) return false;
    if (record.expires < new Date()) return false;

    await prisma.user.update({
        where: { id: record.userId },
        data: { emailVerified: new Date() },
    });

    await prisma.userToken.delete({ where: { id: record.id } });

    return true;
}

/**
 * 🔹 Kirim ulang verifikasi email (manual trigger)
 */
export async function resendEmailVerification(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    const email = formData.get("email") as string;
    if (!email) return { error: "Email is required" };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "User not found" };

    // ✅ Pakai versi direct, bukan server action
    await sendEmailVerificationDirect(user.id, user.email, user.name);
    return { error: "", message: "Verification link sent successfully." };
}
