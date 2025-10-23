// src/lib/data/product.ts

import { getImageUrl } from "@/lib/supabase"
import { prisma } from "lib/prisma"

/**
 * Get product by ID with relations and formatted images.
 * @param id Product ID (string | number)
 * @returns Product object or null
 */
export async function getProductById(id: string | number) {
    const productId = Number(id)
    if (isNaN(productId)) return null

    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                category: { select: { name: true } },
                brand: { select: { name: true } },
                location: { select: { name: true } },
            },
        })

        if (!product) return null

        return {
            ...product,
            images: product.images.map((img) => getImageUrl(img, "products")),
        }
    } catch (error) {
        console.error("❌ Error fetching product:", error)
        return null
    }
}
