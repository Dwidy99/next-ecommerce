import { getCategories } from "@/app/(admin)/dashboard/(index)/categories/lib/data";
import React from "react";
import FilterCheckboxItem from "./filter-checkbox-item";

export default async function FilterCategory() {
  const categories = await getCategories();
  return (
    <div className="flex p-4 flex-col gap-[14px]">
      {categories.map((category) => (
        // <label
        //   key={`${category.name + category.id}`}
        //   htmlFor={`${category.name + category.id}`}
        //   className="font-semibold flex items-center gap-3"
        // >
        //   <input
        //     type="checkbox"
        //     name="category"
        //     value={category.id}
        //     className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        //   />
        //   <span>{category.name}</span>
        // </label>
        <FilterCheckboxItem
          key={category.id}
          id={category.id.toString()}
          value={category.name}
          type="category"
        />
      ))}
    </div>
  );
}
