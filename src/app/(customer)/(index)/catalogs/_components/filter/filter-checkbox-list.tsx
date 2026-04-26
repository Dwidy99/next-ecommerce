"use client";

import type { FilterCheckboxListProps } from "@/app/(customer)/types";
import { useFilter } from "@/hooks/useFilter";

export default function FilterCheckboxList({
  name,
  options,
}: FilterCheckboxListProps) {
  const { filter, setFilter } = useFilter();

  const selectedValues = filter[name] ?? [];

  const toggleFilter = (rawValue: string, checked: boolean) => {
    const value = name === "stock" ? rawValue : Number(rawValue);
    const currentValues = selectedValues as Array<string | number>;

    setFilter({
      [name]: checked
        ? [...currentValues, value]
        : currentValues.filter((item) => item !== value),
    });
  };

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
