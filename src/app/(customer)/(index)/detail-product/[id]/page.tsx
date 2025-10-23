import React, { Suspense } from "react";
import Navbar from "../../_components/navbar";
import CarouselImages from "./_components/carousel-images";
import Loading from "../../_components/loading";
import ListProduct from "../../_components/list-product";
import PriceInfo from "./_components/price-info";
import { redirect } from "next/navigation";
import { getProductById } from "../lib/data";
import { getUser } from "@/lib/auth";
import { generatePageSEO } from "@/lib/seo/seo-utils";

interface DetailProductProp {
  params: { id: string };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  return await generatePageSEO({
    title: product.name,
    description: product.description,
    keywords: [product.name, product.category.name],
    image: product.images?.[0]?.url,
    url: `/detail-product/${product.id}`,
  });
}

export default async function DetailProduct({ params }: DetailProductProp) {
  const id = Number(params?.id);
  if (isNaN(id)) redirect("/catalogs");

  const { session } = await getUser();
  const product = await getProductById(id);
  if (!product) redirect("/catalogs");

  return (
    <>
      <header className="bg-[#FFF9D9] pt-8 pb-6 md:pb-10">
        <Navbar />
      </header>

      <main className="container max-w-[1130px] mx-auto px-4 sm:px-6 md:px-8">
        {/* 🔹 Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#6A7789] mt-6 mb-4">
          <a>Shop</a> / <a>Browse</a> /{" "}
          <span className="text-black">Details</span>
        </div>

        {/* 🔹 Product Title */}
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-6">
          {product.name}
        </h1>

        {/* 🔹 Carousel */}
        <CarouselImages images={product.images} />

        {/* 🔹 Benefit Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mt-12">
          {[
            { icon: "star-outline", text: "Include Official Warranty" },
            { icon: "code-circle", text: "Bonus Mac OS Capitan Pro" },
            { icon: "like", text: "100% Original From Factory" },
            { icon: "tag", text: "Free Tax On Every Sale" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center">
                <img
                  src={`/assets/icons/${b.icon}.svg`}
                  alt={b.text}
                  className="w-6 h-6"
                />
              </div>
              <p className="font-semibold text-xs sm:text-sm text-[#110843] text-center leading-snug">
                {b.text}
              </p>
            </div>
          ))}
        </div>

        {/* 🔹 Details & Price */}
        <section className="flex flex-col lg:flex-row justify-between gap-8 mt-12">
          <div className="flex-1 space-y-6">
            <div id="about">
              <h3 className="font-semibold text-lg mb-2 text-[#110843]">
                About Product
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <PriceInfo
            isLogIn={!!session}
            item={{
              id: product.id,
              category_name: product.category.name,
              image_url: product.images[0],
              name: product.name,
              price: Number(product.price),
            }}
          />
        </section>

        {/* 🔹 Recommendation */}
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
