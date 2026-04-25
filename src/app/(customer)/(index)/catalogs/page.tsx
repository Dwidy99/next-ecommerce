import { generatePageSEO } from "@/lib/seo/seo-utils";
import Image from "next/image";
import Navbar from "../_components/navbar";
import SearchBar from "../_components/search-bar";
import FilterSidebar from "./_components/filter/filter-sidebar";
import ProductListing from "./_components/product-listing";
import ResponsiveLayout from "./_components/responsive-layout";

export async function generateMetadata() {
  return await generatePageSEO({
    title: "All Product",
    description: "Jelajahi seluruh produk berkualitas terbaik dari kami.",
    keywords: ["products", "shop", "catalog"],
    url: "/catalogs",
  });
}

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#edf2f6] pb-12">
      <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Shopverse Catalog</span>
          <span>Browse products - filter faster - checkout safely</span>
          <span className="text-[#FFC736]">Yellow deals</span>
        </div>
      </div>

      <header className="bg-[#FFC736] px-4 pb-10 pt-1 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Navbar />

          <section className="relative mt-6 overflow-hidden rounded-[28px] bg-[#110843] p-7 shadow-xl md:p-10">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FFC736]/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 max-w-2xl text-white">
              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#FFC736] backdrop-blur">
                Product Catalog
              </p>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
                Find the right gadget without digging through noise.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                Filter by price, stock, brand, location, and category with a
                cleaner catalog experience that still fits Shopverse.
              </p>
            </div>

            <div className="absolute bottom-0 right-6 hidden w-[360px] opacity-90 lg:block">
              <Image
                src="/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png"
                alt="Featured gadget"
                width={580}
                height={360}
                className="h-auto w-full object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </section>
        </div>
      </header>

      <div className="mt-8">
        <SearchBar title="Explore Shopverse Catalog" />
      </div>

      <ResponsiveLayout
        filters={<FilterSidebar />}
        products={
          <>
            <div className="mb-5 flex flex-col justify-between gap-2 border-b border-slate-200 pb-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d99000]">
                  Collection
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#110843] md:text-2xl">
                  Products
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                Updated dynamically from your product catalog.
              </p>
            </div>
            <ProductListing />
          </>
        }
      />
    </main>
  );
}
