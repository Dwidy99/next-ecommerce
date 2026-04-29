import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "../../_components/navbar";
import CarouselImages from "./_components/carousel-images";
import PriceInfo from "./_components/price-info";
import CustomerLoading from "@/app/(customer)/loading";
import ListProduct from "../../_components/list-product";
import { generatePageSEO } from "@/lib/seo/seo-utils";
import { getCustomerUser } from "@/lib/auth";
import { getProductById } from "../lib/data";
import type { DetailProductPageProps } from "@/app/(customer)/types";

export async function generateMetadata({ params }: DetailProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Next Commerce",
      description: "The product you are looking for does not exist.",
    };
  }

  return await generatePageSEO({
    title: product.name,
    description: product.description,
    keywords: [
      product.name,
      product.category?.name,
      product.brand?.name,
    ].filter(Boolean),
    image: product.images?.[0],
    url: `/detail-product/${product.id}`,
  });
}

export default async function DetailProduct({ params }: DetailProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) redirect("/catalogs");

  const { session } = await getCustomerUser();
  const categoryName = product.category?.name ?? "Product";
  const brandName = product.brand?.name ?? "Shopverse";
  const locationName = product.location?.name ?? "Online";

  return (
    <main className="min-h-screen bg-[#edf2f6] pb-16">
      {/* Top strip */}
      <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Shopverse Product</span>
          <span>Review details - compare value - checkout safely</span>
          <span className="text-[#FFC736]">Product detail</span>
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

            <div className="relative z-10 max-w-3xl text-white">
              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#FFC736] backdrop-blur">
                Product Detail
              </p>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                Review product images, specs, benefits, and checkout readiness
                before adding this item to your cart.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/catalogs"
                  className="rounded-full bg-[#FFC736] px-6 py-3 text-sm font-bold text-[#110843] shadow-lg shadow-yellow-950/20 transition hover:bg-[#ffda63]"
                >
                  Back to Catalog
                </Link>
                <span className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur">
                  {categoryName}
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
                Product Preview
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#110843] sm:text-3xl">
                Product Gallery
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-slate-500 md:justify-end">
              <span className="rounded-full bg-[#FFF4CC] px-4 py-2 font-semibold text-[#7d5c00]">
                {brandName}
              </span>
              <span className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-600">
                {locationName}
              </span>
            </div>
          </div>

          <CarouselImages images={product.images} />

          <section className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d99000]">
                About Product
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-[#110843]">
                Why this item is worth checking
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                {product.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["Category", categoryName],
                  ["Brand", brandName],
                  ["Location", locationName],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      {label}
                    </p>
                    <p className="mt-2 font-bold text-[#110843]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <PriceInfo
              isLogIn={!!session}
              item={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                category_name: categoryName,
                image_url: product.images[0],
              }}
            />
          </section>
        </div>

        {/* Recommendation */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:p-10">
          <Suspense fallback={<CustomerLoading />}>
            <ListProduct
              title={
                <>
                  Recommendations <br /> You May Need
                </>
              }
              isShowDetail={false}
            />
          </Suspense>
        </section>
      </section>
      </main>
  );
}
