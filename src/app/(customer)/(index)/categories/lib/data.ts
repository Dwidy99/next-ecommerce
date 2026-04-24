import { getImageUrl } from "@/lib/supabase"
import { prisma } from "lib/prisma"
import type { CustomerProductItem } from "../../lib/data"

type CategoryWithProductsItem = {
    id: number
    name: string
    slug: string
    products: CustomerProductItem[]
}

function createCategorySlug(name: string, slug: string | null) {
    return slug ?? name.toLowerCase().replace(/\s+/g, "-")
}

function mapCategoryProduct(product: {
    id: number
    name: string
    price: bigint | number
    images?: string[] | null
    category: {
        name: string
    }
}): CustomerProductItem {
    return {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image_url: getImageUrl(product.images?.[0] ?? "", "products"),
        category_name: product.category.name,
    }
}

export function formatCategoryProducts(
    products: Array<{
        id: number
        name: string
        price: bigint | number
        images?: string[] | null
        category: {
            name: string
        }
    }>
): CustomerProductItem[] {
    return products.map(mapCategoryProduct)
}

export async function fetchCategoriesWithProducts() {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                products: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        price: true,
                        category: { select: { name: true } },
                        images: true,
                    },
                },
            },
            orderBy: { name: "asc" },
        })

        const formatted: CategoryWithProductsItem[] = categories.map((category) => ({
            id: category.id,
            name: category.name,
            slug: createCategorySlug(category.name, category.slug),
            products: formatCategoryProducts(category.products),
        }))

        return formatted
    } catch (error) {
        console.error("Error fetching categories:", error)
        return []
    }
}

export async function getCategoryBySlug(slug: string) {
    return await prisma.category.findUnique({
        where: { slug },
        select: {
            id: true,
            name: true,
            slug: true,
            created_at: true,
            updated_at: true,
            products: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    images: true,
                    category: true,
                },
            },
        },
    })
}

export async function getAllCategorySlugs() {
    const categories = await prisma.category.findMany({
        select: { slug: true },
    })

    return categories.map((category) => ({
        slug: category.slug,
    }))
}

export async function getCategoryMeta(slug: string) {
    return prisma.category.findUnique({
        where: { slug },
        select: { name: true },
    })
}
