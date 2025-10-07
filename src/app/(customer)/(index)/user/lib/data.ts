"use server";

import { getUser } from "@/lib/auth";
import { prisma } from "lib/prisma";
import type { ProfileResult } from "@/types";

export async function getProfile(): Promise<ProfileResult> {
    const { user } = await getUser();
    if (!user) return { error: "Unauthorized" };

    try {
        const found = await prisma.user.findUnique({
            where: { id: user.id },
            select: { name: true, email: true, image: true, created_at: true, },
        });

        if (!found) return { error: "User not found" };

        return {
            name: found.name,
            email: found.email,
            image: found.image ?? null,
            created_at: found.created_at,
        };
    } catch (err) {
        console.error("Error fetching profile:", err);
        return { error: "Failed to fetch profile" };
    }
}
