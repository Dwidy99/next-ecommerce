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
    <div className="container mx-auto mt-8 max-w-7xl px-4 pb-[100px] md:px-6">
      <div className="hidden gap-6 lg:flex">
        <aside className="h-fit w-[300px] flex-shrink-0 rounded-[22px] border border-slate-200 bg-white/95 p-6 shadow-sm ring-1 ring-white">
          {filters}
        </aside>

        <main className="flex-1 rounded-[22px] border border-slate-200 bg-white/95 p-6 shadow-sm ring-1 ring-white">
          {products}
        </main>
      </div>

      <div className="flex flex-col gap-4 lg:hidden">
        <button
          onClick={() => setShowFilters((value) => !value)}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC736] py-3 font-semibold text-[#110843] shadow-sm transition hover:bg-[#ffda63]"
        >
          <SlidersHorizontal size={18} />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {showFilters && (
          <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
            {filters}
          </div>
        )}

        <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
          {products}
        </div>
      </div>
    </div>
  );
}
