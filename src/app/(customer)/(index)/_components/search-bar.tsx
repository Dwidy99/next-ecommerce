"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFilter } from "@/hooks/useFilter";

/**
 * SearchBar Component
 * - Menampilkan breadcrumb, judul halaman, dan input pencarian
 * - Responsif: Desktop, Tablet, dan Mobile
 */
interface SearchBarProps {
  currentPage?: string; // contoh: "Catalog" atau "Laptop"
  title?: string; // contoh: "Our Product Catalog"
}

export default function SearchBar({
  currentPage = "Catalog",
  title = "Our Product Catalog",
}: SearchBarProps): JSX.Element {
  const { setFilter } = useFilter();
  const [query, setQuery] = useState<string>("");

  // 🔹 Debounce input untuk mencegah request berulang
  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({ search: query });
    }, 800); // lebih cepat & smooth
    return () => clearTimeout(debounceInput);
  }, [query, setFilter]);

  return (
    <section
      id="search-bar"
      className="
        container mx-auto px-4 sm:px-6 lg:px-8
        flex flex-col lg:flex-row 
        items-start lg:items-center 
        justify-between
        gap-6 sm:gap-8 py-8 sm:py-10
        max-w-[1130px]
      "
    >
      {/* 🔹 Breadcrumb + Title */}
      <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-auto">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-[#6A7789]">
          <Link
            href="/catalogs"
            className="hover:text-[#110843] transition-colors"
          >
            Shop
          </Link>
          <span>/</span>
          <span className="hover:text-[#110843] transition-colors">Browse</span>
          <span>/</span>
          <span className="font-medium text-[#110843] truncate max-w-[140px] sm:max-w-none">
            {currentPage}
          </span>
        </nav>

        {/* Title */}
        <h1
          className="
            font-bold text-2xl sm:text-3xl lg:text-4xl
            leading-tight text-[#110843]
          "
        >
          {title}
        </h1>
      </div>

      {/* 🔍 Search Input */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="
          w-full sm:max-w-[400px] lg:max-w-[480px]
          bg-white flex items-center gap-2 sm:gap-3
          rounded-full border border-[#E5E5E5]
          p-[10px_16px] sm:p-[12px_20px]
          focus-within:ring-2 focus-within:ring-[#FFC736]
          transition-all duration-300
        "
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            flex-1 bg-transparent outline-none text-sm sm:text-base
            placeholder:text-[#616369] placeholder:font-normal
            font-semibold text-black
          "
          placeholder="Search product by name, brand, or category"
        />
        <button
          type="submit"
          className="flex shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Search"
        >
          <img
            src="/assets/icons/search-normal.svg"
            alt="search icon"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </button>
      </form>
    </section>
  );
}
