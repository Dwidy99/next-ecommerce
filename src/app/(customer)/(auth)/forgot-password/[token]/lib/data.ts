// src/app/(customer)/(auth)/reset-password/[token]/lib/data.ts
"use server";

import { prisma } from "lib/prisma";

export async function verifyResetToken(token: string) {
    const record = await prisma.passwordResetToken.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!record) return { error: "Invalid or expired reset token" };
    if (record.expires < new Date()) return { error: "Reset token has expired" };

    return { user: record.user };
}
