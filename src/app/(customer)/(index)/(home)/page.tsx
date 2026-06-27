import { generatePageSEO } from "@/lib/seo/seo-utils"
import LandingPage from "./_components/landing-page"

export const dynamic = "force-dynamic"

export async function generateMetadata() {
  return await generatePageSEO({
    title: "Home",
    description:
      "Shop quality gadgets, accessories, and setup bundles with a clean customer shopping experience.",
    keywords: ["home", "shop", "gadgets", "catalog"],
    url: "/",
  })
}

export default function HomePage() {
  return <LandingPage />
}
