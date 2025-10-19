// src/app/(customer)/(index)/_components/list-category.tsx
import React from "react";
import Link from "next/link";
import { getCategories } from "../lib/data";

export default async function ListCategory() {
  const categories = await getCategories();

  return (
    <section id="categories" className="w-full">
      {/* 🔹 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          Browse Products <br className="hidden sm:block" /> by Categories
        </h2>

        <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end">
          <Link
            href="/catalogs"
            className="px-6 py-3 border border-gray-200 rounded-full font-semibold text-sm sm:text-base hover:bg-[#FFF6D9] transition-all duration-200"
          >
            Explore All
          </Link>
        </div>
      </div>

      {/* 🔹 Grid Layout */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-4
          sm:gap-6
          lg:gap-8
        "
      >
        {categories.map((category: any) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug ?? category.id}`}
            className="
              group
              flex flex-col sm:flex-row items-center sm:items-start
              bg-white
              rounded-2xl
              p-4 sm:p-5
              shadow-sm
              hover:shadow-md
              ring-1 ring-gray-200 hover:ring-[#FFC736]
              transition-all duration-200
              text-center sm:text-left
            "
          >
            {/* Icon */}
            <div
              className="
                w-12 h-12 sm:w-14 sm:h-14
                rounded-full
                bg-[#12007a]
                flex items-center justify-center
                mb-3 sm:mb-0 sm:mr-4
              "
            >
              <img
                src="/assets/icons/mobile.svg"
                alt={`${category.name} icon`}
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="font-semibold text-sm sm:text-base lg:text-lg leading-snug sm:leading-tight">
                {category.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {category._count?.products ?? 0} Products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
