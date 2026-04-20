import { prisma } from "lib/prisma"

export const dynamic = "force-dynamic"

const fallbackBaseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_REDIRECT_URL ||
    "https://example.com"

export default async function sitemap() {
    try {
        const site = await prisma.configuration.findFirst({ where: { language: "ID" } })

        const baseUrl = site?.website || fallbackBaseUrl

        const products = await prisma.product.findMany({ select: { id: true, updated_at: true } })
        const categories = await prisma.category.findMany({ select: { slug: true, updated_at: true } })

        return [
            {
                url: baseUrl,
                lastModified: new Date(),
            },
            ...products.map((p) => ({
                url: `${baseUrl}/detail-product/${p.id}`,
                lastModified: p.updated_at,
            })),
            ...categories.map((c) => ({
                url: `${baseUrl}/categories/${c.slug}`,
                lastModified: c.updated_at,
            })),
        ]
    } catch (error) {
        console.warn("Failed to load sitemap data, using fallback sitemap.", error)

        return [
            {
                url: fallbackBaseUrl,
                lastModified: new Date(),
            },
        ]
    }
}
