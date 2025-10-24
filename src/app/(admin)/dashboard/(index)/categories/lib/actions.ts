'use server';

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import { schemaCategory } from "@/lib/schema";
import { prisma } from "../../../../../../../lib/prisma";
import { slugify } from "@/lib/utils";
import { Prisma } from "@prisma/client";

function handlePrismaError(err: unknown): string {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return "Category name or slug already exists.";
    }
  }
  return "Failed to create category.";
}

export async function postCategory(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "");

  const validate = schemaCategory.safeParse({ name });
  if (!validate.success) {
    // tampilkan pesan Zod (bukan Prisma)
    return { error: validate.error.issues[0]?.message ?? "Invalid input" };
  }

  const slug = slugify(validate.data.name);

  try {
    await prisma.category.create({
      data: {
        name: validate.data.name,
        slug,
      },
    });
  } catch (err) {
    console.error("Prisma error:", err);
    const message = handlePrismaError(err);
    return { error: message };
  }

  redirect("/dashboard/categories");
}

export async function updateCategory(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return { error: validate.error.issues?.[0].message ?? "Invalid Input" };
  }

  if (id === undefined) {
    return { error: "Id is not found" };
  }

  try {
    const slug = slugify(validate.data.name);

    await prisma.category.update({
      where: { id },
      data: {
        name: validate.data.name,
        slug, // 👈 update slug juga
      },
    });

  } catch (err) {
    console.error(err);
    return { error: "Failed to update data" };
  }

  redirect("/dashboard/categories");
}

export async function deleteCategory(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const id = Number(formData.get("id"));

  if (!id) {
    return { error: "Invalid category ID" };
  }

  try {
    await prisma.category.delete({ where: { id } });
  } catch (err: any) {
    console.error("Delete error:", err);
    return { error: "Category could not be deleted. It may be linked to other data." };
  }

  redirect("/dashboard/categories");
}