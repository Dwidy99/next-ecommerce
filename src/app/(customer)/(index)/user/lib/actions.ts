"use server";

import { z } from "zod";
import { getUser } from "@/lib/auth";
import { prisma } from "lib/prisma";
import { ActionResult } from "@/types";
import {
    checkFileExists,
    deleteFile,
    uploadFile,
    getImageUrl,
} from "@/lib/supabase"; // asumsi kamu taruh di sini

// ✅ Schema Validation
const schemaProfile = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    image: z
        .any()
        .optional()
        .refine(
            (file) => !file || (file instanceof File && file.size > 0),
            "Invalid image file"
        ),
});

export async function updateProfile(
    formData: FormData
): Promise<ActionResult> {
    // 🔐 Check user session
    const { user } = await getUser();
    if (!user) return { error: "Unauthorized" };

    // ✅ Parse form data
    const parse = schemaProfile.safeParse({
        name: formData.get("name")?.toString() ?? "",
        image: formData.get("image") as File | null,
    });

    if (!parse.success) {
        const messages = parse.error.issues.map(
            (issue, index) => `${index + 1}. ${issue.message}`
        );
        return { error: messages.join("\n") };
    }

    const { name, image } = parse.data;

    try {
        // 🔍 Get old user data
        const oldUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { image: true },
        });

        if (!oldUser) {
            return { error: "User not found" };
        }

        let newFilename = oldUser.image;

        // 📸 If user uploads a new file
        if (image && image instanceof File && image.size > 0) {
            const oldFilename = oldUser.image?.split("/").pop();

            // 🧹 Delete old image from Supabase
            if (oldFilename && (await checkFileExists(oldFilename, "users"))) {
                await deleteFile(oldFilename, "users");
            }

            // 📤 Upload new image
            newFilename = await uploadFile(image, "users");
        }

        // 🧠 Get public URL for the image
        const imageUrl = newFilename ? getImageUrl(newFilename, "users") : null;

        // 📝 Update user info
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                image: imageUrl,
            },
        });

        return { error: "" };
    } catch (err) {
        console.error("❌ Profile update error:", err);
        return { error: "Failed to update profile" };
    }
}
