import React from "react";
import FilterCheckboxItem from "./filter-checkbox-item";

export default function FilterStock() {
  return (
    <div className="flex p-4 flex-col gap-[14px]">
      <FilterCheckboxItem type="stock" id="ready" value="Ready" />
      <FilterCheckboxItem type="stock" id="preorder" value="Pre-Order" />
    </div>
  );
}
