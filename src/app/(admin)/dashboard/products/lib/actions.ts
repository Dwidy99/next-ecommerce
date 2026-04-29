"use server";

import { refreshAndRedirect } from "@/lib/nextjs";
import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { checkFileExists, deleteFile, uploadFile } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { getErrorMessage, warnOnce } from "@/lib/error-message";
import type { ActionResult, AdminProductTableItem } from "@/app/(admin)/types";
import { Prisma, ProductStock } from "@prisma/client";
import { prisma } from "lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function warnProductFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`);
}

// ============================
// Prisma Error Handler
// ============================
function handlePrismaError(err: unknown): string {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") return "Product name or slug already exists.";
    if (err.code === "P2025") return "Product not found.";
  }
  return "Unexpected database error.";
}


// ============================
// Upload Images
// ============================
async function uploadImages(images: File[]) {
  const filenames: string[] = [];

  for (const image of images) {
    const filename = await uploadFile(image, "products");
    filenames.push(filename);
  }

  return filenames;
}


// ============================
// Delete Images
// ============================
async function deleteImages(images: string[]) {
  for (const image of images) {
    if (await checkFileExists(image, "products")) {
      await deleteFile(image, "products");
    }
  }
}

// ============================
// READ PRODUCTS
// ============================
export async function getProducts(): Promise<AdminProductTableItem[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        _count: {
          select: {
            orders: true,
          },
        },
        name: true,
        created_at: true,
        price: true,
        stock: true,
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
        images: true,
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      image_url: product.images[0] ?? "",
      category: product.category?.name ?? "Uncategorized",
      brand: product.brand?.name ?? "No brand",
      location: product.location?.name ?? "No location",
      price: Number(product.price),
      total_sales: product._count.orders,
      stock: product.stock,
      createdAt: product.created_at,
    }));
  } catch (error) {
    warnProductFallback("Products", error);
    return [];
  }
}

// ============================
// READ PRODUCT DETAIL
// ============================
export async function getProductById(id: number) {
  try {
    return await prisma.product.findUnique({
      where: { id },
    });
  } catch (error) {
    warnProductFallback("Product", error);
    return null;
  }
}

// ============================
// CREATE PRODUCT
// ============================
export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {

  const parse = schemaProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  });

  if (!parse.success) {
    return { error: parse.error.issues.map(i => i.message).join("\n") };
  }

  const filenames = await uploadImages(parse.data.images as File[]);
  const slug = slugify(parse.data.name);

  try {

    await prisma.product.create({
      data: {
        name: parse.data.name,
        slug,
        description: parse.data.description,
        category_id: Number(parse.data.category_id),
        location_id: Number(parse.data.location_id),
        brand_id: Number(parse.data.brand_id),
        price: Number(parse.data.price),
        stock: parse.data.stock as ProductStock,
        images: filenames,
      },
    });

  } catch (err) {
    return { error: handlePrismaError(err) };
  }

  refreshAndRedirect("/dashboard/products");
  return { error: "" };
}


// ============================
// UPDATE PRODUCT
// ============================
export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {

  const parse = schemaProductEdit.safeParse({
    id,
    name: formData.get("name")?.toString() ?? "",
    price: formData.get("price")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    stock: formData.get("stock")?.toString() ?? "",
    brand_id: formData.get("brand_id")?.toString() ?? "",
    category_id: formData.get("category_id")?.toString() ?? "",
    location_id: formData.get("location_id")?.toString() ?? "",
  });

  if (!parse.success) {
    return { error: parse.error.issues.map(i => i.message).join("\n") };
  }

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { error: "Product not found" };

  const uploadedImages = (formData.getAll("images") as File[])
    .filter(file => file instanceof File && file.size > 0);

  let filenames = product.images;

  if (uploadedImages.length > 0) {

    const parseImage = schemaProduct.pick({ images: true }).safeParse({
      images: uploadedImages,
    });

    if (!parseImage.success) {
      return { error: parseImage.error.issues.map(i => i.message).join("\n") };
    }

    await deleteImages(product.images);
    filenames = await uploadImages(uploadedImages);
  }

  const slug = slugify(parse.data.name);

  try {

    await prisma.product.update({
      where: { id },
      data: {
        name: parse.data.name,
        slug,
        description: parse.data.description,
        category_id: Number(parse.data.category_id),
        location_id: Number(parse.data.location_id),
        brand_id: Number(parse.data.brand_id),
        price: Number(parse.data.price),
        stock: parse.data.stock as ProductStock,
        images: filenames,
      },
    });

  } catch (err) {
    return { error: handlePrismaError(err) };
  }

  refreshAndRedirect("/dashboard/products");
  return { error: "" };
}


// ============================
// DELETE PRODUCT
// ============================
export async function deleteProduct(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!id) throw new Error("Invalid product ID");

  const product = await prisma.product.findUnique({
    where: { id },
    select: { images: true },
  });

  if (!product) throw new Error("Product not found");

  for (const image of product.images) {
    await deleteFile(image, "products");
  }

  await prisma.product.delete({ where: { id } });

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
