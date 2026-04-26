"use client";
import { useFilter } from "@/hooks/useFilter";
import React, { useEffect, useState } from "react";

export default function FilterPrice() {
  const { filter, setFilter } = useFilter();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        ...filter,
        minPrice: minPrice > 0 ? minPrice : undefined,
        maxPrice: maxPrice > 0 ? maxPrice : undefined,
      });
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [minPrice, maxPrice]);

  return (
    <div className="flex flex-col gap-3.5">
      <p className="font-semibold leading-[22px]">Price Range</p>

      <div className="flex w-full max-w-md items-center gap-2.5 rounded-full border border-[#FFE6A3] bg-[#FFF9E8] px-5 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC736]">
        <div className="flex shrink-0">
          <img src="/assets/icons/dollar-circle.svg" alt="icon" />
        </div>
        <input
          type="number"
          value={minPrice || ""}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Minimum price"
        />
      </div>

      <div className="flex w-full max-w-md items-center gap-2.5 rounded-full border border-[#FFE6A3] bg-[#FFF9E8] px-5 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC736]">
        <div className="flex shrink-0">
          <img src="/assets/icons/dollar-circle.svg" alt="icon" />
        </div>
        <input
          type="number"
          value={maxPrice || ""}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Maximum price"
        />
      </div>
    </div>
  );
}
