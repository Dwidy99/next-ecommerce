import React, { ReactNode } from "react";
import { getProducts } from "../lib/data";
import CardProduct from "./card-product";
import Link from "next/link";

interface ListProductProps {
  title: ReactNode;
  isShowDetail: boolean;
}

export default async function ListProduct({
  title,
  isShowDetail,
}: ListProductProps) {
  const products = await getProducts();

  return (
    <section id="picked" className="flex flex-col gap-6 sm:gap-8">
      {/* 🔹 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl leading-snug sm:leading-[34px] text-center sm:text-left">
          {title}
        </h2>

        {isShowDetail && (
          <div className="flex justify-center sm:justify-end">
            <Link
              href="/catalogs"
              className="px-5 py-2 sm:px-6 sm:py-3 border border-gray-200 rounded-full font-semibold text-sm sm:text-base hover:bg-[#FFF6D9] transition-all"
            >
              Explore All
            </Link>
          </div>
        )}
      </div>

      {/* 🔹 Product Grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4 sm:gap-6 lg:gap-8
        "
      >
        {products.map((product: any) => (
          <CardProduct
            key={`${product.name}-${product.id}`}
            item={{
              id: product.id,
              name: product.name,
              image_url: product.image_url,
              price: Number(product.price),
              category_name: product.category.name,
            }}
          />
        ))}
      </div>
    </section>
  );
}
