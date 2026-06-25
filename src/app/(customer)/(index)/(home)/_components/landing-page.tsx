import { Suspense } from "react"

import CustomerLoading from "@/app/(customer)/loading"
import {
  ArticleSection,
  BenefitStrip,
  CollaborationSection,
  CompactCategoryGrid,
  HomeHero,
  HomeTopStrip,
  ProductScroller,
  PromoMosaic,
} from "./home-showcase"
import Navbar from "../../_components/navbar"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#edf2f6] pb-10">
      <HomeTopStrip />

      <header className="mx-auto max-w-7xl px-4 md:px-6">
        <Navbar />
      </header>

      <Suspense fallback={<CustomerLoading variant="section" />}>
        <HomeHero />
      </Suspense>

      <Suspense fallback={<CustomerLoading variant="section" />}>
        <BenefitStrip />
      </Suspense>

      <Suspense fallback={<CustomerLoading variant="section" />}>
        <CompactCategoryGrid />
      </Suspense>

      <Suspense fallback={<CustomerLoading variant="section" />}>
        <PromoMosaic />
      </Suspense>

      <Suspense fallback={<CustomerLoading variant="section" />}>
        <ProductScroller />
      </Suspense>

      <Suspense fallback={<CustomerLoading variant="section" />}>
        <CollaborationSection />
      </Suspense>

      <Suspense fallback={<CustomerLoading variant="section" />}>
        <ArticleSection />
      </Suspense>
    </main>
  )
}
