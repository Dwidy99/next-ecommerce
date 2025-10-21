"use client";
import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function ResponsiveLayout({
  filters,
  products,
}: {
  filters: React.ReactNode;
  products: React.ReactNode;
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container max-w-[1130px] mx-auto px-4 lg:px-0 mt-[40px] pb-[100px]">
      {/* 🔹 Desktop */}
      <div className="hidden lg:flex gap-[30px]">
        <aside className="w-[300px] bg-white border border-[#E5E5E5] rounded-[20px] p-6 flex-shrink-0 h-fit">
          {filters}
        </aside>

        <main className="flex-1 bg-white border border-[#E5E5E5] rounded-[20px] p-6">
          {products}
        </main>
      </div>

      {/* 🔹 Mobile / Tablet */}
      <div className="lg:hidden flex flex-col gap-4">
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="w-full flex items-center justify-center gap-2 bg-[rgb(255,255,255)] text-black font-semibold py-3 rounded-full shadow-sm"
        >
          <SlidersHorizontal size={18} />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {showFilters && (
          <div className="bg-white border border-[#E5E5E5] rounded-[20px] p-5">
            {filters}
          </div>
        )}

        <div className="bg-white border border-[#E5E5E5] rounded-[20px] p-5">
          {products}
        </div>
      </div>
    </div>
  );
}
