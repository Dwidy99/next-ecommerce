'use server';
import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { checkFileExists, deleteFile, uploadFile } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { ActionResult } from "@/types";
import { Prisma, ProductStock } from "@prisma/client";
import { prisma } from "lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 🧩 Prisma error handler reusable
function handlePrismaError(err: unknown): string {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return "Product name or slug already exists.";
      case "P2025":
        return "Product not found.";
      default:
        return "Database error occurred.";
    }
  }
  return "Unexpected error occurred.";
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
    const messages = parse.error.issues.map((i) => i.message);
    return { error: messages.join("\n") };
  }

  const uploaded_images = parse.data.images as File[];
  const filenames: string[] = [];

  for (const image of uploaded_images) {
    const filename = await uploadFile(image, "products");
    filenames.push(filename);
  }

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
    console.error("Insert error:", err);
    return { error: handlePrismaError(err) };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
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
    const messages = parse.error.issues.map((i) => i.message);
    return { error: messages.join("\n") };
  }

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return { error: "Product not found" };

  const uploaded_images = formData.getAll("images") as File[];
  const valid_uploaded_images = uploaded_images.filter(
    (file) => file instanceof File && file.size > 0
  );

  let filenames = product.images;

  // 🧹 jika user upload gambar baru → hapus lama & upload baru
  if (valid_uploaded_images.length > 0) {
    const parseImage = schemaProduct.pick({ images: true }).safeParse({
      images: valid_uploaded_images,
    });

    if (!parseImage.success) {
      const messages = parseImage.error.issues.map((i) => i.message);
      return { error: messages.join("\n") };
    }

    // hapus gambar lama
    for (const filename of product.images) {
      if (await checkFileExists(filename, "products")) {
        await deleteFile(filename, "products");
      }
    }

    // upload baru
    filenames = [];
    for (const image of valid_uploaded_images) {
      const filename = await uploadFile(image, "products");
      filenames.push(filename);
    }
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
    console.error("Update error:", err);
    return { error: handlePrismaError(err) };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}


export async function deleteProduct(
  formData: FormData,
  id: number
): Promise<ActionResult> {

  const product = await prisma.product.findFirst({
    where: { id: id },
    select: { id: true, images: true }
  })

  if (!product) {
    return {
      error: "Product not found"
    }
  }

  try {
    for (const image of product.images) {
      console.log(image)
      await deleteFile(image, 'products')
    }

    await prisma.product.delete({
      where: {
        id
      }
    })
  } catch (err) {
    console.log(err)
    return {
      error: "Failed to delete data"
    }
  }
  // finally {}

  return redirect("/dashboard/products/")
}