"use server";

import { prisma } from "lib/prisma";

// READ DETAIL
export async function verifyResetToken(token: string) {
  try {
    const record = await prisma.userToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!record) return { error: "Invalid or expired reset token" };
    if (record.expires < new Date()) {
      return { error: "Reset token has expired" };
    }

    return { user: record.user };
  } catch (error) {
    console.error("Failed to verify reset password token:", error);

    return {
      error:
        "We could not verify this reset link right now. Please try again later.",
    };
  }
}
