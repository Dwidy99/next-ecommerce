"use server";

import { sendVerificationEmail } from "@/lib/mailer";
import { ActionResult } from "@/types";
import { TokenType } from "@prisma/client";
import { prisma } from "lib/prisma";
import { createEmailVerificationToken } from "./data";

export async function sendEmailVerificationDirect(
  userId: number,
  email: string,
  name?: string,
) {
  const token = await createEmailVerificationToken(userId);
  await sendVerificationEmail(email, token, name);
}

export async function sendEmailVerification(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Email is required" };

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "No account found with this email" };

    await sendEmailVerificationDirect(user.id, user.email, user.name);

    return { error: "", message: "Verification link sent successfully." };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { error: "Failed to send verification email" };
  }
}

export async function verifyEmailToken(token: string) {
  try {
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
  } catch (error) {
    console.error("Failed to verify email token:", error);
    return false;
  }
}

export async function resendEmailVerification(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Email is required" };

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "User not found" };

    await sendEmailVerificationDirect(user.id, user.email, user.name);

    return { error: "", message: "Verification link sent successfully." };
  } catch (error) {
    console.error("Failed to resend verification email:", error);
    return { error: "Failed to resend verification email" };
  }
}
