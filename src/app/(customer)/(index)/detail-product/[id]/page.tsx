// src/app/(customer)/(index)/detail-product/[id]/page.tsx
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import Navbar from "../../_components/navbar";
import CarouselImages from "./_components/carousel-images";
import PriceInfo from "./_components/price-info";
import Loading from "../../_components/loading";
import ListProduct from "../../_components/list-product";
import { generatePageSEO } from "@/lib/seo/seo-utils";
import { getUser } from "@/lib/auth";
import { getProductById } from "../lib/data";

interface DetailProductProps {
  params: { id: string };
}

export async function generateMetadata({ params }: DetailProductProps) {
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

export default async function DetailProduct({ params }: DetailProductProps) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) redirect("/catalogs");

  const { session } = await getUser();

  return (
    <>
      <header className="bg-[#FFF9D9] pt-8 pb-6 md:pb-10">
        <Navbar />
      </header>

      <main className="container max-w-[1130px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#6A7789] mt-6 mb-4">
          <a href="/">Shop</a> / <a href="/catalogs">Browse</a> /{" "}
          <span className="text-black">Details</span>
        </div>

        {/* Title */}
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-6">
          {product.name}
        </h1>

        {/* Carousel */}
        <CarouselImages images={product.images} />

        {/* Details */}
        <section className="flex flex-col lg:flex-row justify-between gap-8 mt-12">
          <div className="flex-1 space-y-6">
            <h3 className="font-semibold text-lg mb-2 text-[#110843]">
              About Product
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <PriceInfo
            isLogIn={!!session}
            item={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              category_name: product.category?.name || "",
              image_url: product.images[0],
            }}
          />
        </section>

        {/* Recommendation */}
        <section className="mt-16 pb-20">
          <Suspense fallback={<Loading />}>
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
      </main>
    </>
  );
}
