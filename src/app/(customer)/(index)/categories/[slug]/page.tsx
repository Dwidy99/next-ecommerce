import React from "react";
import Navbar from "../../_components/navbar";
import CardProduct from "../../_components/card-product";
import NoData from "../../_components/no-data";
import { getCategoryBySlug } from "../lib/data";
import { generatePageSEO } from "@/lib/seo/seo-utils";

export const dynamicParams = true;

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  return await generatePageSEO({
    title: `Category: ${params.slug}`,
    description: "Dynamic category page",
    url: `/categories/${params.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);

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

  const products = (category.products ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    price: Number(p.price),
    image_url:
      typeof p.images === "string" && p.images
        ? p.images
        : "/assets/products/placeholder.svg",
    category_name: p.category.name,
  }));

  return (
    <>
      <header className="bg-[#FFF9D9] py-8 sm:py-1 px-4 sm:px-8 lg:px-16">
        <Navbar />
      </header>

      <main className="container max-w-[1130px] mx-auto px-6 sm:px-8 md:px-8 mt-10 pb-24">
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
