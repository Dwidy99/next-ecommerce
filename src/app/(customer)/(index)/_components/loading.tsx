"use client";

import React from "react";

/**
 * Reusable loading skeleton component
 * - Menampilkan placeholder konten dengan efek `animate-pulse`
 * - Otomatis responsif (Desktop, Tablet, Mobile)
 *
 * Props:
 * @param count - jumlah item skeleton (default 4)
 * @param type - tipe layout (grid atau list)
 */
interface LoadingProps {
  count?: number;
  type?: "grid" | "list";
}

export default function Loading({ count = 4, type = "grid" }: LoadingProps) {
  return (
    <section
      id="loading-skeleton"
      className="flex flex-col gap-6 sm:gap-8 animate-pulse w-full"
    >
      {/* 🔹 Header Section (Title + Button Placeholder) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="h-6 sm:h-8 w-40 sm:w-52 bg-gray-200 rounded-md" />
        <div className="h-9 sm:h-10 w-28 sm:w-32 bg-gray-200 rounded-full" />
      </div>

      {/* 🔹 Content  Area */}
      <div
        className={
          type === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            : "flex flex-col gap-4 sm:gap-6"
        }
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white flex items-center gap-4 p-4 sm:p-5 rounded-xl ring-1 ring-[#E5E5E5] w-full"
          >
            {/* Thumbnail */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex-shrink-0" />

            {/* Text Lines */}
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 sm:h-5 w-3/4 bg-gray-300 rounded" />
              <div className="h-3 sm:h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
