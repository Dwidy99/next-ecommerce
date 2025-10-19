import React from "react";
import Navbar from "../../_components/navbar";
import CardProduct from "../../_components/card-product";
import NoData from "../../_components/no-data";
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getCategoryMeta,
} from "../lib/data";

export async function generateStaticParams() {
  return getAllCategorySlugs();
}

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryMeta(slug);

  return {
    title: category ? `${category.name} - Shopverse` : "Category not found",
    description: `Explore products in ${category?.name ?? "this category"}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return (
      <main className="container max-w-[1130px] mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#110843] mb-3">
          Category not found
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          The category you’re looking for doesn’t exist.
        </p>
      </main>
    );
  }

  const products = category.products.map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    image_url:
      typeof p.image_url === "string" && p.image_url.startsWith("http")
        ? p.image_url
        : "/assets/products/placeholder.png",
    category_name: p.category_name,
  }));

  return (
    <>
      {/* 🔹 Header */}
      <header className="bg-[#FFF9D9] pt-8 pb-6 md:pb-10">
        <Navbar />
      </header>

      <main className="container max-w-[1130px] mx-auto px-4 sm:px-6 md:px-8 mt-10 pb-24">
        <div className="bg-white rounded-3xl border border-[#E5E5E5] shadow-sm hover:shadow-md transition-all duration-300 p-5 sm:p-8 md:p-10">
          <h2 className="font-bold text-2xl sm:text-3xl text-[#110843] mb-8 text-center sm:text-left">
            {category.name} Products
          </h2>

          {products.length === 0 ? (
            <NoData />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {products.map((item) => (
                <CardProduct key={item.id} item={item as any} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
