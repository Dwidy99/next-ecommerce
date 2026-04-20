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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#edf2f6] pb-10">
      <HomeTopStrip />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Navbar />
      </div>

      <HomeHero />
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
    </div>
  )
}
