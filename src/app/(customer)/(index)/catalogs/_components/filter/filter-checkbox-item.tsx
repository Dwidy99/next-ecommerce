"use client";

import { useFilter } from "@/hooks/useFilter";
import { ProductStock } from "@prisma/client";
import type { ChangeEvent } from "react";

type FilterType = "stock" | "brand" | "location" | "category";

interface FilterCheckboxItemProps {
  id: string;
  value: string;
  type: FilterType;
}

export default function FilterCheckboxItem({
  id,
  value,
  type,
}: FilterCheckboxItemProps) {
  const { filter, setFilter } = useFilter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueId = event.target.value;
    const checked = event.target.checked;

    switch (type) {
      case "stock":
        setFilter({
          stock: checked
            ? [...(filter?.stock ?? []), valueId as ProductStock]
            : filter?.stock?.filter((stock) => stock !== valueId),
        });
        break;

      case "brand":
        setFilter({
          brands: checked
            ? [...(filter?.brands ?? []), Number(valueId)]
            : filter?.brands?.filter((brand) => brand !== Number(valueId)),
        });
        break;

      case "category":
        setFilter({
          categories: checked
            ? [...(filter?.categories ?? []), Number(valueId)]
            : filter?.categories?.filter((category) => category !== Number(valueId)),
        });
        break;

      case "location":
        setFilter({
          locations: checked
            ? [...(filter?.locations ?? []), Number(valueId)]
            : filter?.locations?.filter((location) => location !== Number(valueId)),
        });
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
