"use server";

import { sendVerificationEmail } from "@/lib/mailer";
import {
    createEmailVerificationToken,
} from "./data";
import { prisma } from "lib/prisma";
import { TokenType } from "@prisma/client";
import { ActionResult } from "@/types";

/**
 * 🔹 Buat token + kirim email verifikasi
 */

export async function sendEmailVerification(
    userId: number,
    email: string,
    name?: string
) {
    const token = await createEmailVerificationToken(userId);
    await sendVerificationEmail(email, token, name);
}


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
 * 🔹 Kirim ulang verifikasi email
 */
export async function resendEmailVerification(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    const email = formData.get("email") as string;
    if (!email) return { error: "Email is required" };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "User not found" };

    await sendEmailVerification(user.id, user.email, user.name);
    return { error: "", message: "Verification link sent successfully." };
}
