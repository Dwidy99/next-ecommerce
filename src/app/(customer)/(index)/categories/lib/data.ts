import { getImageUrl } from "@/lib/supabase"
import { prisma } from "lib/prisma"

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

        const formatted = categories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            // 🧩 Fallback jika slug null
            slug: cat.slug ?? cat.name.toLowerCase().replace(/\s+/g, "-"),
            products: cat.products.map((p) => ({
                id: p.id,
                name: p.name,
                price: Number(p.price),
                image_url: getImageUrl(p.images?.[0] ?? "", "products"),
                category_name: p.category.name,
            })),
        }))

        return formatted
    } catch (error) {
        console.error("❌ Error fetching categories:", error)
        return []
    }
}

// 🔹 Ambil 1 kategori berdasarkan slug (beserta produk)
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
    return categories.map((c) => ({ slug: c.slug }))
}

// 🔹 Ambil nama kategori untuk metadata
export async function getCategoryMeta(slug: string) {
    return prisma.category.findUnique({
        where: { slug },
        select: { name: true },
    })
}
