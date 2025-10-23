import { prisma } from "lib/prisma"


export default async function robots() {
    const config = await prisma.configuration.findFirst({ where: { language: "ID" } })
    const baseUrl = config?.website || "https://example.com"

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
