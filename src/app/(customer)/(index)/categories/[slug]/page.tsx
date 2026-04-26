import React from "react";
import Navbar from "../../_components/navbar";
import CardProduct from "../../_components/card-product";
import NoData from "../../_components/no-data";
import { formatCategoryProducts, getCategoryBySlug } from "../lib/data";
import { generatePageSEO } from "@/lib/seo/seo-utils";
import Link from "next/link";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;

  return await generatePageSEO({
    title: `Category: ${slug}`,
    description: "Dynamic category page",
    url: `/categories/${slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return (
      <main className="min-h-screen bg-[#edf2f6] px-4 py-10 sm:px-6">
        <section className="mx-auto flex min-h-screen max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="mx-auto mb-4 inline-flex rounded-full bg-[#FFF4CC] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d99000]">
              Category
            </p>
            <h1 className="text-2xl font-extrabold text-[#110843] sm:text-3xl">
              Category not found
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              The category you're looking for doesn't exist or is no longer
              available.
            </p>
            <Link
              href="/catalogs"
              className="mt-6 inline-flex rounded-full bg-[#110843] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#24105e]"
            >
              Back to Catalog
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const products = formatCategoryProducts(category.products ?? []);
  const productCount = products.length;

  return (
    <main className="min-h-screen bg-[#edf2f6] pb-16">
      {/* Top strip */}
      <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Shopverse Category</span>
          <span>Browse focused products - compare faster</span>
          <span className="text-[#FFC736]">Yellow deals</span>
        </div>
      </div>

      {/* Header and hero */}
      <header className="bg-[#FFC736] px-4 pb-10 pt-1 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Navbar />

          <section className="relative mt-6 overflow-hidden rounded-3xl bg-[#110843] p-7 shadow-xl md:p-10">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FFC736]/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute right-10 top-10 hidden h-28 w-28 rounded-full border border-white/10 lg:block" />
            <div className="absolute bottom-10 right-28 hidden h-14 w-14 rounded-full bg-[#FFC736]/20 lg:block" />

            <div className="relative z-10 max-w-3xl text-white">
              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#FFC736] backdrop-blur">
                Category Collection
              </p>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
                {category.name}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                Explore products from this category with a cleaner layout,
                focused browsing, and a consistent Shopverse experience.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/catalogs"
                  className="rounded-full bg-[#FFC736] px-6 py-3 text-sm font-bold text-[#110843] shadow-lg shadow-yellow-950/20 transition hover:bg-[#ffda63]"
                >
                  Browse All Catalog
                </Link>
                <span className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur">
                  {productCount} {productCount === 1 ? "product" : "products"}
                </span>
              </div>
            </div>
          </section>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-8 lg:px-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
          <div className="mb-7 flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d99000]">
                Collection
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#110843] sm:text-3xl">
                {category.name} Products
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500 md:text-right">
              Showing products available in this category. Open a product card
              to view details and checkout options.
            </p>
          </div>

          {products.length === 0 ? (
            <NoData
              title="No products in this category"
              message="Please check another category or browse the full catalog."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {products.map((item) => (
                <CardProduct key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
