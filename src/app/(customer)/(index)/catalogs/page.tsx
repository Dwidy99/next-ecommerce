import { generatePageSEO } from "@/lib/seo/seo-utils";
import Navbar from "../_components/navbar";
import SearchBar from "../_components/search-bar";
import FilterBrand from "./_components/filter/filter-brand";
import FilterCategory from "./_components/filter/filter-category";
import FilterGroup from "./_components/filter/filter-group";
import FilterLocation from "./_components/filter/filter-location";
import FilterPrice from "./_components/filter/filter-price";
import FilterStock from "./_components/filter/filter-stock";

import ProductListing from "./_components/product-listing";

import ResponsiveLayout from "./_components/responsive-layout";

export async function generateMetadata() {
  return await generatePageSEO({
    title: "All Product",
    description: "Jelajahi seluruh produk berkualitas terbaik dari kami.",
    keywords: ["products", "shop", "catalog"],
    url: "/catalogs",
  });
}

export default function CatalogPage() {
  return (
    <>
      <header className="bg-[#FFC736] sm:h-[351px] h-[175px] -mb-[181px] md:py-8 px-4 sm:px-8 lg:px-16">
        <Navbar />
      </header>

      <SearchBar />

      <ResponsiveLayout
        filters={
          <>
            <h2 className="font-bold text-xl md:text-2xl mb-4">Filters</h2>

            <FilterGroup title="Price Range">
              <FilterPrice />
            </FilterGroup>

            <FilterGroup title="Stock Availability">
              <FilterStock />
            </FilterGroup>

            <FilterGroup title="Brands">
              <FilterBrand />
            </FilterGroup>

            <FilterGroup title="Locations">
              <FilterLocation />
            </FilterGroup>

            <FilterGroup title="Categories">
              <FilterCategory />
            </FilterGroup>
          </>
        }
        products={
          <>
            <h2 className="font-bold text-xl md:text-2xl mb-4">Products</h2>
            <ProductListing />
          </>
        }
      />
    </>
  );
}
