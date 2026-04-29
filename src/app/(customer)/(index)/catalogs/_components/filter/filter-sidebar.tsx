"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type {
  FilterCheckboxListProps,
  FilterOption,
} from "@/app/(customer)/types";
import { useFilter } from "@/hooks/useFilter";

const stockOptions = [
  { id: "ready", name: "Ready" },
  { id: "preorder", name: "Pre-Order" },
] as const;

export default function FilterSidebar({
  brands,
  categories,
  locations,
}: {
  brands: FilterOption[];
  categories: FilterOption[];
  locations: FilterOption[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d99000]">
          Refine
        </p>
        <h2 className="mt-1 text-xl font-bold text-[#110843] md:text-2xl">
          Filters
        </h2>
      </div>

      <FilterSection title="Price Range">
        <FilterPrice />
      </FilterSection>

      <FilterSection title="Stock Availability">
        <FilterCheckboxList name="stock" options={[...stockOptions]} />
      </FilterSection>

      <FilterSection title="Brands">
        <FilterCheckboxList name="brands" options={brands} />
      </FilterSection>

      <FilterSection title="Locations">
        <FilterCheckboxList name="locations" options={locations} />
      </FilterSection>

      <FilterSection title="Categories">
        <FilterCheckboxList name="categories" options={categories} />
      </FilterSection>
    </div>
  );
}

function FilterPrice() {
  const { filter, setFilter } = useFilter();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter(() => ({
        minPrice: minPrice > 0 ? minPrice : undefined,
        maxPrice: maxPrice > 0 ? maxPrice : undefined,
      }));
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [maxPrice, minPrice, setFilter]);

  return (
    <div className="flex flex-col gap-3.5">
      <p className="font-semibold leading-[22px]">Price Range</p>

      <PriceInput
        value={minPrice}
        placeholder="Minimum price"
        onChange={setMinPrice}
      />
      <PriceInput
        value={maxPrice}
        placeholder="Maximum price"
        onChange={setMaxPrice}
      />
    </div>
  );
}

function PriceInput({
  value,
  placeholder,
  onChange,
}: {
  value: number;
  placeholder: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex w-full max-w-md items-center gap-2.5 rounded-full border border-[#FFE6A3] bg-[#FFF9E8] px-5 py-3 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC736]">
      <div className="flex shrink-0">
        <img src="/assets/icons/dollar-circle.svg" alt="icon" />
      </div>
      <input
        type="number"
        value={value || ""}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full appearance-none font-semibold text-black outline-none placeholder:font-normal placeholder:text-[#616369]"
        placeholder={placeholder}
      />
    </div>
  );
}

function FilterCheckboxList({
  name,
  options,
}: FilterCheckboxListProps) {
  const { filter, setFilter } = useFilter();
  const selectedValues = filter[name] ?? [];

  function toggleFilter(rawValue: string, checked: boolean) {
    const value = name === "stock" ? rawValue : Number(rawValue);
    const currentValues = selectedValues as Array<string | number>;

    setFilter({
      [name]: checked
        ? [...currentValues, value]
        : currentValues.filter((item) => item !== value),
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const value = option.id.toString();
        const checked = (selectedValues as Array<string | number>).some(
          (item) => item.toString() === value,
        );

        return (
          <label
            key={`${name}-${value}`}
            htmlFor={`${name}-${value}`}
            className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 font-semibold text-slate-700 transition hover:bg-[#FFF7DB] hover:text-[#110843]"
          >
            <input
              id={`${name}-${value}`}
              type="checkbox"
              value={value}
              checked={checked}
              onChange={(event) => toggleFilter(value, event.target.checked)}
              className="h-5 w-5 shrink-0 appearance-none rounded-md ring-1 ring-[#FFC736] checked:border-[3px] checked:border-solid checked:border-white checked:bg-[#FFC736]"
            />
            <span>{option.name}</span>
          </label>
        );
      })}
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 pb-5 last:border-none">
      <h3 className="mb-3 text-base font-semibold text-[#110843] md:text-lg">
        {title}
      </h3>
      {children}
    </section>
  );
}
