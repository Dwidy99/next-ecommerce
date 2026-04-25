"use server";

import { prisma } from "lib/prisma";

// READ DETAIL
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true },
  });
}
