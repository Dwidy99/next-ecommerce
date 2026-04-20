import { prisma } from "lib/prisma"

export const dynamic = "force-dynamic"

const fallbackBaseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_REDIRECT_URL ||
    "https://example.com"

export default async function robots() {
    let baseUrl = fallbackBaseUrl

    try {
        const config = await prisma.configuration.findFirst({ where: { language: "ID" } })
        baseUrl = config?.website || fallbackBaseUrl
    } catch (error) {
        console.warn("Failed to load robots configuration, using fallback URL.", error)
    }

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: "GPTBot",
                disallow: "/",
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}
