import React from "react";
import { getFilterBrands } from "../../lib/filter-data";
import FilterCheckboxItem from "./filter-checkbox-item";

export default async function FilterBrand() {
  const brands = await getFilterBrands();

  return (
    <div className="flex flex-col p-4 gap-[14px]">
      {brands.map((brand) => (
        <FilterCheckboxItem
          key={brand.id}
          id={brand.id.toString()}
          value={brand.name}
          type="brand"
        />
      ))}
    </div>
  );
}
