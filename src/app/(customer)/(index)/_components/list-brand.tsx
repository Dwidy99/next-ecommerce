import Link from "next/link";
import React from "react";
import { getBrands } from "../lib/data";

export default async function ListBrand() {
  const brands = await getBrands();

  return (
    <section id="brands" className="flex flex-col gap-6 sm:gap-8">
      {/* 🔹 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl leading-snug sm:leading-[34px] text-center sm:text-left">
          Explore Our <br className="hidden sm:block" /> Popular Brands
        </h2>

        <div className="flex justify-center sm:justify-end">
          <Link
            href="/catalogs"
            className="px-5 py-2 sm:px-6 sm:py-3 border border-gray-200 rounded-full font-semibold text-sm sm:text-base hover:bg-[#FFF6D9] transition-all"
          >
            Explore All
          </Link>
        </div>
      </div>

      {/* 🔹 Grid Logo */}
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
        {brands.map((brand: any) => (
          <Link
            key={`${brand.id}-${brand.logo}`}
            href="#"
            className="
              group bg-white
              flex items-center justify-center
              rounded-2xl p-4 sm:p-5 lg:p-6
              ring-1 ring-gray-200 hover:ring-[#FFC736] hover:shadow-md
              transition-all duration-200
            "
          >
            <div className="w-full h-[28px] sm:h-[34px] lg:h-[38px] flex items-center justify-center overflow-hidden">
              <img
                src={brand.logo_url}
                alt={brand.logo}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
