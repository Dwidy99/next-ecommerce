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
    keywords?: string[]
    image?: string
    url?: string
    lang?: "ID" | "EN"
}): Promise<Metadata> {
    const site = await getSiteConfig(lang)

    const metaTitle = title ? `${title} | ${site.title}` : site.title
    const metaDescription = description || site.description || ""
    const metaKeywords = keywords?.join(", ") || site.keywords.join(", ")
    const fullUrl = url ? new URL(url, site.url).toString() : site.url
    const imageUrl = image || site.logo || site.icon || ""

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
        alternates: {
            canonical: fullUrl,
            languages: {
                "id-ID": site.url.replace(/\/en$/, "") + url,
                "en-US": site.url.replace(/\/id$/, "") + url,
            },
        },
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
        icons: {
            icon: site.icon || undefined,
        },
        metadataBase: new URL(site.url),
    }
}
