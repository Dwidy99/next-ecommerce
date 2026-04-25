"use server";

import { getImageUrl } from "@/lib/supabase";
import { prisma } from "lib/prisma";

// READ DETAIL
export async function getProductById(id: string | number) {
  const productId = Number(id);
  if (Number.isNaN(productId)) return null;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: { select: { name: true } },
        brand: { select: { name: true } },
        location: { select: { name: true } },
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.images.map((image) => getImageUrl(image, "products")),
    };
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    return null;
  }
}
