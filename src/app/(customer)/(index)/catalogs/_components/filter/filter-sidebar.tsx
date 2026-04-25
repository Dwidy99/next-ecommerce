import type { ReactNode } from "react";
import FilterCheckboxList from "./filter-checkbox-list";
import FilterPrice from "./filter-price";
import {
  getFilterBrands,
  getFilterCategories,
  getFilterLocations,
} from "../../lib/data";

const stockOptions = [
  { id: "ready", name: "Ready" },
  { id: "preorder", name: "Pre-Order" },
] as const;

export default async function FilterSidebar() {
  const [brands, categories, locations] = await Promise.all([
    getFilterBrands(),
    getFilterCategories(),
    getFilterLocations(),
  ]);

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
