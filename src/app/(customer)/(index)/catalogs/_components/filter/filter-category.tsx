import React from "react";
import { getFilterCategories } from "../../lib/filter-data";
import FilterCheckboxItem from "./filter-checkbox-item";

export default async function FilterCategory() {
  const categories = await getFilterCategories();

  return (
    <div className="flex p-4 flex-col gap-[14px]">
      {categories.map((category) => (
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
