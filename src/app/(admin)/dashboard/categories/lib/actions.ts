'use server';

import { ActionResult } from "@/app/(admin)/types";
import { redirect } from "next/navigation";
import { schemaCategory } from "@/lib/schema";
import { prisma } from "../../../../../../lib/prisma";
import { slugify } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { refreshAndRedirect } from "@/lib/nextjs";
import { getErrorMessage, warnOnce } from "@/lib/error-message";

function warnCategoryFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`);
}

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
  } catch (error) {
    warnCategoryFallback("Categories", error);
    return [];
  }
}

export async function getCategoryById(id: string) {
  try {
    return await prisma.category.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
  } catch (error) {
    warnCategoryFallback("Category", error);
    return null;
  }
}

function handlePrismaError(err: unknown): string {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return "Category name or slug already exists.";
    }

    if (err.code === "P2003") {
      return "This category is still used by products. Move or delete those products first.";
    }
  }
  return "Failed to save category.";
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
    console.error("[category:create]", err);
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
    console.error("[category:update]", err);
    return { error: handlePrismaError(err) };
  }

  redirect("/dashboard/categories");
}

export async function deleteCategory(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));

  if (!id) {
    throw new Error("Invalid category ID");
  }

  try {
    await prisma.category.delete({
      where: { id },
    });
  } catch (err) {
    console.error("[category:delete]", err);
    throw new Error(handlePrismaError(err));
  }

  refreshAndRedirect("/dashboard/categories");
}
