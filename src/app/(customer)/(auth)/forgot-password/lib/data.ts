// src/app/(customer)/(auth)/forgot-password/lib/data.ts
"use server";

import { prisma } from "lib/prisma";

export async function findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, email: true, name: true },
    });
    return user;
}
