import React from "react";
import { getFilterLocations } from "../../lib/data";
import FilterCheckboxItem from "./filter-checkbox-item";

export default async function FilterLocation() {
  const locations = await getFilterLocations();

  return (
    <div className="flex p-4 flex-col gap-[14px]">
      {locations.map((location) => (
        <FilterCheckboxItem
          key={location.id}
          id={location.id.toString()}
          value={location.name}
          type="location"
        />
      ))}
    </div>
  );
}
