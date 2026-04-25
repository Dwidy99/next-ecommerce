"use server";

import { TokenType } from "@prisma/client";
import crypto from "crypto";
import { prisma } from "lib/prisma";

const EMAIL_VERIFICATION_EXPIRES_IN_MS = 1000 * 60 * 60;

// CREATE
export async function createEmailVerificationToken(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + EMAIL_VERIFICATION_EXPIRES_IN_MS);

  await prisma.userToken.upsert({
    where: { userId_type: { userId, type: "EMAIL_VERIFICATION" } },
    update: { token, expires },
    create: { userId, token, type: "EMAIL_VERIFICATION", expires },
  });

  return token;
}

// READ DETAIL
export async function findEmailVerificationToken(token: string) {
  return prisma.userToken.findUnique({ where: { token } });
}

// UPDATE + DELETE
export async function completeEmailVerification(tokenId: number, userId: number) {
  await prisma.user.update({
    where: { id: userId },
    data: { emailVerified: new Date() },
  });

  await prisma.userToken.delete({ where: { id: tokenId } });
}

// QUERY WORKFLOW
export async function verifyEmailToken(token: string): Promise<boolean> {
  const record = await prisma.userToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record || record.type !== TokenType.EMAIL_VERIFICATION) return false;
  if (record.expires < new Date()) return false;

  await completeEmailVerification(record.id, record.userId);

  return true;
}
