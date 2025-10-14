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
  console.log("✅ Produk kategori:", category);

  if (!category) {
    return (
      <div className="container max-w-[1130px] mx-auto px-5 py-20 text-center">
        <h1 className="text-2xl font-semibold text-[#110843] mb-3">
          Category not found
        </h1>
        <p className="text-gray-500">
          The category you’re looking for doesn’t exist.
        </p>
      </div>
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
      {/* 🟡 Header */}
      <header className="bg-[#FFC736] pt-[30px] h-[351px] -mb-[181px]">
        <Navbar />
      </header>

      <section className="container max-w-[1130px] mx-auto px-5 mt-[50px] pb-[100px]">
        <div className="bg-white p-[30px] rounded-[30px] border border-[#E5E5E5]">
          <h2 className="font-bold text-2xl leading-[34px] mb-6">
            {category.name} Products
          </h2>

          {products.length === 0 ? (
            <NoData />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((item) => (
                <CardProduct key={item.id} item={item as any} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
