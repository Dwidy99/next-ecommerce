"use server";

import { prisma } from "lib/prisma";


/**
 * ✅ Memverifikasi token dari email
 */
export async function verifyEmailToken(token: string): Promise<boolean> {
    const record = await prisma.userToken.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!record || record.type !== "EMAIL_VERIFICATION") return false;
    if (record.expires < new Date()) return false;

    // Tandai user sudah verified
    await prisma.user.update({
        where: { id: record.userId },
        data: { emailVerified: new Date() },
    });

    // Hapus token setelah dipakai
    await prisma.userToken.delete({ where: { id: record.id } });

    return true;
}
