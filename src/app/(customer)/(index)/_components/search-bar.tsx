"use client";

import { useFilter } from "@/hooks/useFilter";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SearchBarProps {
  currentPage?: string; // misalnya "Catalog" atau "Personal Computer"
  title?: string; // misalnya "Our Product Catalog" atau "Personal Computer Products"
}

export default function SearchBar({
  currentPage = "Catalog",
  title = "Our Product Catalog",
}: SearchBarProps) {
  const { setFilter } = useFilter();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({ search: query });
    }, 1500);

    return () => clearTimeout(debounceInput);
  }, [query]);

  return (
    <div
      id="title"
      className="container max-w-[1130px] mx-auto flex items-center justify-between"
    >
      {/* 🔹 Breadcrumb + Title */}
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          <Link
            href="/catalogs"
            className="page text-sm text-[#6A7789] hover:text-[#110843] transition"
          >
            Shop
          </Link>
          <span className="text-sm text-[#6A7789]">/</span>
          <span className="page text-sm text-[#6A7789]">Browse</span>
          <span className="text-sm text-[#6A7789]">/</span>
          <span className="page text-sm text-black font-medium">
            {currentPage}
          </span>
        </div>

        <h1 className="font-bold text-4xl leading-9 text-[#110843]">{title}</h1>
      </div>

      {/* 🔍 Search Input */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300"
      >
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Search product by name, brand, or category"
        />
        <button type="submit" className="flex shrink-0">
          <img src="/assets/icons/search-normal.svg" alt="icon" />
        </button>
      </form>
    </div>
  );
}
