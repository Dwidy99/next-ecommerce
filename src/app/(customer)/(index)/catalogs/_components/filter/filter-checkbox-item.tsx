"use client";

import { useFilter } from "@/hooks/useFilter";
import { ProductStock } from "@prisma/client";
import React, { ChangeEvent } from "react";

interface FilterCheckboxItemProps {
  id: string;
  value: string;
  type?: "stock" | "brand" | "location" | "category";
}

export default function FilterCheckboxItem({
  id,
  value,
  type,
}: FilterCheckboxItemProps) {
  const { filter, setFilter } = useFilter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    switch (type) {
      // 🟢 STOCK
      case "stock":
        if (e.target.checked) {
          setFilter({
            stock: [...(filter?.stock ?? []), val as ProductStock],
          });
        } else {
          setFilter({
            stock: filter?.stock?.filter((s) => s !== val),
          });
        }
        break;

      // 🟢 BRAND
      case "brand":
        if (e.target.checked) {
          setFilter({
            brands: [...(filter?.brands ?? []), Number(val)],
          });
        } else {
          setFilter({
            brands: filter?.brands?.filter((b) => b !== Number(val)),
          });
        }
        break;

      // 🟢 CATEGORY
      case "category":
        if (e.target.checked) {
          setFilter({
            categories: [...(filter?.categories ?? []), Number(val)],
          });
        } else {
          setFilter({
            categories: filter?.categories?.filter((c) => c !== Number(val)),
          });
        }
        break;

      // 🟢 LOCATION
      case "location":
        if (e.target.checked) {
          setFilter({
            locations: [...(filter?.locations ?? []), Number(val)],
          });
        } else {
          setFilter({
            locations: filter?.locations?.filter((l) => l !== Number(val)),
          });
        }
        break;

      default:
        break;
    }
  };

  return (
    <label
      htmlFor={id + value}
      className="flex items-center gap-3 font-semibold text-slate-700"
    >
      <input
        type="checkbox"
        id={id + value}
        value={id}
        name={type}
        onChange={onChange}
        className="flex h-5 w-5 shrink-0 appearance-none rounded-md ring-1 ring-[#FFC736] checked:border-[3px] checked:border-solid checked:border-white checked:bg-[#FFC736]"
      />
      <span>{value}</span>
    </label>
  );
}
