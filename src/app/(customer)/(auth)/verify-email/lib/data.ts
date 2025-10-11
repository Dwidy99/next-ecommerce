"use server";

import { TokenType } from "@prisma/client";
import crypto from "crypto";
import { prisma } from "lib/prisma";


/**
 * ✅ Membuat token verifikasi email baru
 */
export async function createEmailVerificationToken(userId: number): Promise<string> {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 jam

    await prisma.userToken.upsert({
        where: { userId_type: { userId, type: "EMAIL_VERIFICATION" } },
        update: { token, expires },
        create: { userId, token, type: "EMAIL_VERIFICATION", expires },
    });

    return token;
}

// Ambil token dari DB
export async function findEmailVerificationToken(token: string) {
    return prisma.userToken.findUnique({ where: { token } });
}

// Tandai user verified & hapus token
export async function completeEmailVerification(tokenId: number, userId: number) {
    await prisma.user.update({
        where: { id: userId },
        data: { emailVerified: new Date() },
    });

    await prisma.userToken.delete({ where: { id: tokenId } });
}


export async function verifyEmailToken(token: string): Promise<boolean> {
    const record = await prisma.userToken.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!record || record.type !== TokenType.EMAIL_VERIFICATION) return false;
    if (record.expires < new Date()) return false;

    // Tandai user sudah verified
    await prisma.user.update({
        where: { id: record.userId },
        data: { emailVerified: new Date() },
    });

    // Hapus token setelah digunakan
    await prisma.userToken.delete({ where: { id: record.id } });

    return true;
}