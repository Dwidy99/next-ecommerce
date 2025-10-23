// src/lib/seo/seo-utils.ts
import type { Metadata } from "next"
import { getSiteConfig } from "./config"

export async function generatePageSEO({
    title,
    description,
    keywords,
    image,
    url,
    lang = "ID",
}: {
    title?: string
    description?: string
    keywords?: (string | undefined | null)[]
    image?: string
    url?: string
    lang?: "EN" | "ID"
}): Promise<Metadata> {
    const site = await getSiteConfig(lang)

    const metaTitle = title ? `${title} | ${site.title}` : site.title
    const metaDescription = description || site.description
    const metaKeywords =
        keywords?.filter(Boolean).join(", ") || site.keywords?.join(", ") || ""

    const siteUrl = site.url || "https://example.com"
    const fullUrl = url
        ? url.startsWith("http")
            ? url
            : `${siteUrl}${url}`
        : siteUrl

    const imageUrl = image || site.logo || site.icon || `${siteUrl}/favicon.ico`
    const iconUrl = site.icon || `${siteUrl}/favicon.ico`

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: fullUrl,
            siteName: site.title,
            images: [{ url: imageUrl }],
            locale: lang === "ID" ? "id_ID" : "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: [imageUrl],
        },
        icons: { icon: iconUrl },
        metadataBase: new URL(siteUrl),
    }
}
