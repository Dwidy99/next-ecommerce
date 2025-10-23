import { prisma } from "lib/prisma"

export default async function sitemap() {
    const site = await prisma.configuration.findFirst({ where: { language: "ID" } })

    const baseUrl = site?.website || process.env.NEXT_PUBLIC_BASE_URL || "https://google.com"

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
}