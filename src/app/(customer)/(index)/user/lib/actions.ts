"use server";

import { getCustomerUser } from "@/lib/auth";
import {
  checkFileExists,
  deleteFile,
  getImageUrl,
} from "@/lib/supabase";
import { uploadFile } from "@/lib/upload-image";
import { ActionResult } from "@/app/(customer)/types";
import { z } from "zod";
import { prisma } from "lib/prisma";

const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file instanceof File && file.size > 0),
      "Invalid image file",
    ),
});

// UPDATE: Save the logged-in customer's profile changes.
export async function updateProfile(formData: FormData): Promise<ActionResult> {
  const { user } = await getCustomerUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = profileSchema.safeParse({
    name: formData.get("name")?.toString() ?? "",
    image: formData.get("image") as File | null,
  });

  if (!parsed.success) {
    return { error: getValidationMessage(parsed.error) };
  }

  const { name, image } = parsed.data;

  try {
    const oldUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { image: true },
    });

    if (!oldUser) return { error: "User not found" };

    let imageFilenameOrUrl = oldUser.image;

    if (image && image instanceof File && image.size > 0) {
      const oldFilename = oldUser.image?.split("/").pop();

      if (oldFilename && (await checkFileExists(oldFilename, "users"))) {
        await deleteFile(oldFilename, "users");
      }

      imageFilenameOrUrl = await uploadFile(image, "users");
    }

    const imageUrl = imageFilenameOrUrl
      ? getImageUrl(imageFilenameOrUrl, "users")
      : null;

    await prisma.user.update({
      where: { id: user.id },
      data: { name, image: imageUrl },
    });

    return { error: "" };
  } catch (error) {
    console.error("Failed to update customer profile:", error);
    return { error: "Failed to update profile" };
  }
}

// VALIDATION HELPER
function getValidationMessage(error: z.ZodError) {
  return error.issues.map((issue) => issue.message).join("\n");
}
