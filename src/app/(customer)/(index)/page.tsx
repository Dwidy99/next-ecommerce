import { generatePageSEO } from "@/lib/seo/seo-utils"
import { Suspense } from "react"
import Navbar from "./_components/navbar"
import Loading from "./_components/loading-skeleton"
import {
  ArticleSection,
  BenefitStrip,
  CollaborationSection,
  CompactCategoryGrid,
  HomeHero,
  HomeTopStrip,
  ProductScroller,
  PromoMosaic,
} from "./_components/home-showcase"

export async function generateMetadata() {
  return await generatePageSEO({
    title: "Home",
    description:
      "Shop quality gadgets, accessories, and setup bundles with a clean customer shopping experience.",
    keywords: ["home", "shop", "gadgets", "catalog"],
    url: "/",
  })
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#edf2f6] pb-10">
      {/* Top strip */}
      <HomeTopStrip />

      {/* Header */}
      <header className="mx-auto max-w-7xl px-4 md:px-6">
        <Navbar />
      </header>

      {/* Hero */}
      <HomeHero />

      {/* Main content */}
      <BenefitStrip />

      <Suspense fallback={<Loading />}>
        <CompactCategoryGrid />
      </Suspense>

      <PromoMosaic />

      <Suspense fallback={<Loading />}>
        <ProductScroller />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <CollaborationSection />
      </Suspense>

      <ArticleSection />
    </main>
  )
}
