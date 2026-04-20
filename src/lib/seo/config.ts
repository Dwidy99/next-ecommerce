import { prisma } from "lib/prisma"
import { getErrorMessage, warnOnce } from "@/lib/error-message"


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

const fallbackSiteConfig: SiteConfig = {
    title: "Shopverse",
    shortName: "Shopverse",
    tagline: "Next-gen shopping experience",
    description: "Next-gen shopping experience",
    keywords: ["shop", "store", "ecommerce"],
    url:
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.NEXT_PUBLIC_REDIRECT_URL ||
        "https://example.com",
    icon: "/favicon.ico",
    social: {},
}

export async function getSiteConfig(lang: "ID" | "EN" = "ID"): Promise<SiteConfig> {
    try {
        const config = await prisma.configuration.findFirst({
            where: { language: lang },
        })

        if (!config) return fallbackSiteConfig

        return {
            title: config.webname ?? fallbackSiteConfig.title,
            shortName: config.short_name ?? fallbackSiteConfig.shortName,
            tagline: config.tagline ?? fallbackSiteConfig.tagline,
            description: config.description ?? fallbackSiteConfig.description,
            // normalisasi keywords jadi array
            keywords: config.keywords
                ? config.keywords.split(",").map((k: string) => k.trim())
                : fallbackSiteConfig.keywords,
            url: config.website && config.website.trim() !== ""
                ? config.website
                : fallbackSiteConfig.url,
            logo: config.logo ?? undefined,
            icon: config.icon ?? fallbackSiteConfig.icon,
            social: {
                facebook: config.facebook ?? undefined,
                twitter: config.twitter ?? undefined,
                instagram: config.instagram ?? undefined,
            },
        }
    } catch (error) {
        warnOnce(
            `Failed to load site configuration, using fallback config. ${getErrorMessage(error)}`,
        )
        return fallbackSiteConfig
    }
}
