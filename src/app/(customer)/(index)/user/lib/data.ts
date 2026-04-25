"use server";

import { getUser } from "@/lib/auth";
import type { ProfileResult } from "@/types";
import { prisma } from "lib/prisma";

// READ DETAIL
export async function getProfile(): Promise<ProfileResult> {
  const { user } = await getUser();
  if (!user) return { error: "Unauthorized" };

  try {
    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        email: true,
        image: true,
        created_at: true,
      },
    });

    if (!profile) return { error: "User not found" };

    return {
      name: profile.name,
      email: profile.email,
      image: profile.image ?? null,
      created_at: profile.created_at,
    };
  } catch (error) {
    console.error("Failed to fetch customer profile:", error);
    return { error: "Failed to fetch profile" };
  }
}
