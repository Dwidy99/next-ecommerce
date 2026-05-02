"use server"

import type { ActionResult } from "@/app/(admin)/types"
import { refreshAndRedirect } from "@/lib/nextjs"
import { schemaProduct, schemaProductEdit } from "@/lib/schema"
import { checkFileExists, deleteFile } from "@/lib/supabase"
import { uploadFile } from "@/lib/upload-image"
import { slugify } from "@/lib/utils"
import { Prisma, ProductStock } from "@prisma/client"
import { prisma } from "lib/prisma"

function handleProductError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return "Product name or slug already exists."
    }

    if (error.code === "P2003") {
      return "Selected category, brand, or location is not available."
    }

    if (error.code === "P2025") {
      return "Product not found."
    }
  }

  return "Failed to save product. Please try again."
}

function getValidationMessage(error: { issues: Array<{ message: string }> }) {
  return error.issues.map((issue) => issue.message).join("\n")
}

function buildProductData(data: {
  name: string
  description: string
  price: string | number
  stock: string
  brand_id: string | number
  category_id: string | number
  location_id: string | number
  images: string[]
}) {
  return {
    name: data.name,
    slug: slugify(data.name),
    description: data.description,
    price: Number(data.price),
    stock: data.stock as ProductStock,
    brand_id: Number(data.brand_id),
    category_id: Number(data.category_id),
    location_id: Number(data.location_id),
    images: data.images,
  }
}

async function uploadProductImages(images: File[]) {
  const filenames: string[] = []

  for (const image of images) {
    const filename = await uploadFile(image, "products")
    filenames.push(filename)
  }

  return filenames
}

async function deleteProductImages(images: string[]) {
  for (const image of images) {
    if (await checkFileExists(image, "products")) {
      await deleteFile(image, "products")
    }
  }
}

/* CREATE */

export async function createProduct(
  _: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = schemaProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  })

  if (!parsed.success) {
    return {
      error: getValidationMessage(parsed.error),
    }
  }

  try {
    const images = await uploadProductImages(parsed.data.images as File[])

    await prisma.product.create({
      data: buildProductData({
        ...parsed.data,
        images,
      }),
    })
  } catch (error) {
    console.error("[product:create]", error)
    return {
      error: handleProductError(error),
    }
  }

  refreshAndRedirect("/dashboard/products")
  return { error: "" }
}

/* UPDATE */

export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number | undefined,
): Promise<ActionResult> {
  if (id === undefined) {
    return {
      error: "Product ID is required",
    }
  }

  const parsed = schemaProductEdit.safeParse({
    id,
    name: formData.get("name")?.toString() ?? "",
    price: formData.get("price")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    stock: formData.get("stock")?.toString() ?? "",
    brand_id: formData.get("brand_id")?.toString() ?? "",
    category_id: formData.get("category_id")?.toString() ?? "",
    location_id: formData.get("location_id")?.toString() ?? "",
  })

  if (!parsed.success) {
    return {
      error: getValidationMessage(parsed.error),
    }
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { images: true },
    })

    if (!product) {
      return { error: "Product not found" }
    }

    const uploadedImages = (formData.getAll("images") as File[]).filter(
      (file) => file instanceof File && file.size > 0,
    )

    let images = product.images

    if (uploadedImages.length > 0) {
      const parsedImages = schemaProduct.pick({ images: true }).safeParse({
        images: uploadedImages,
      })

      if (!parsedImages.success) {
        return {
          error: getValidationMessage(parsedImages.error),
        }
      }

      await deleteProductImages(product.images)
      images = await uploadProductImages(uploadedImages)
    }

    await prisma.product.update({
      where: { id },
      data: buildProductData({
        ...parsed.data,
        images,
      }),
    })
  } catch (error) {
    console.error("[product:update]", error)
    return {
      error: handleProductError(error),
    }
  }

  refreshAndRedirect("/dashboard/products")
  return { error: "" }
}

/* DELETE */

export async function deleteProduct(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"))

  if (!id) {
    throw new Error("Invalid product ID")
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { images: true },
    })

    if (!product) {
      throw new Error("Product not found")
    }

    await deleteProductImages(product.images)

    await prisma.product.delete({
      where: { id },
    })
  } catch (error) {
    console.error("[product:delete]", error)
    throw new Error(handleProductError(error))
  }

  refreshAndRedirect("/dashboard/products")
}
