import { prisma } from "lib/prisma"


export type SiteConfig = {
    title: string
    shortName?: string
    tagline?: string
    description?: string
    keywords: string[]
    url: string
    logo?: string
    icon?: string
    social: {
        facebook?: string
        twitter?: string
        instagram?: string
    }
}

export async function getSiteConfig(lang: "ID" | "EN" = "ID"): Promise<SiteConfig> {
    const config = await prisma.configuration.findFirst({
        where: { language: lang },
    })

    if (!config) throw new Error("Site configuration not found")

    return {
        title: config.webname ?? "",
        shortName: config.short_name ?? "",
        tagline: config.tagline ?? "",
        description: config.description ?? "",
        // normalisasi keywords jadi array
        keywords: config.keywords
            ? config.keywords.split(",").map((k: string) => k.trim())
            : [],
        url: config.website && config.website.trim() !== ""
            ? config.website
            : "https://example.com",
        logo: config.logo ?? undefined,
        icon: config.icon ?? undefined,
        social: {
            facebook: config.facebook ?? undefined,
            twitter: config.twitter ?? undefined,
            instagram: config.instagram ?? undefined,
        },
    }
}
