"use server";

import { prisma } from "lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { ActionResult } from "@/app/(customer)/types";

// UPDATE: Replace the old password with a new hashed password.
export async function ResetPasswordAction(
  token: string,
  formData: FormData,
): Promise<ActionResult> {
  const password = String(formData.get("password") ?? "").trim();
  const confirm = String(formData.get("confirm") ?? "").trim();

  if (!password || !confirm) return { error: "All fields are required" };
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }
  if (password !== confirm) return { error: "Passwords do not match" };

  try {
    const record = await prisma.userToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!record) return { error: "Invalid or expired reset token" };
    if (record.expires < new Date()) return { error: "Token has expired" };

    const hash = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: record.userId },
      data: { password: hash },
    });

    await prisma.userToken.delete({
      where: { id: record.id },
    });
  } catch (error) {
    console.error("Failed to reset customer password:", error);

    return {
      error:
        "We could not reset your password right now. Please try again later.",
    };
  }

  return redirect("/reset-password-success");
}
