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
                image_url: p.images?.[0] ?? "/assets/products/placeholder.png",
                category_name: p.category.name,
            })),
        }))

        return formatted
    } catch (error) {
        console.error("❌ Error fetching categories:", error)
        return []
    }
}

// 🔹 Ambil semua slug untuk static params
export async function getAllCategorySlugs() {
    const categories = await prisma.category.findMany({
        select: { slug: true },
    })
    return categories.map((c) => ({ slug: c.slug }))
}

// 🔹 Ambil 1 kategori berdasarkan slug (beserta produk)
export async function getCategoryBySlug(slug: string) {
    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            products: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    category: { select: { name: true } },
                    images: true,
                },
            },
        },
    });

    if (!category) return null;

    // 🔧 Konversi nama file jadi URL publik Supabase
    const products = category.products.map((p) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        category_name: p.category.name,
        image_url: p.images?.[0]
            ? getImageUrl(p.images[0], "products")
            : "/assets/placeholder.png",
    }));
    console.log("✅ Produk kategori:", products)


    return { ...category, products };
}

// 🔹 Ambil nama kategori untuk metadata
export async function getCategoryMeta(slug: string) {
    return prisma.category.findUnique({
        where: { slug },
        select: { name: true },
    })
}
