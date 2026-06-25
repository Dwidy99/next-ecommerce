"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFilter } from "@/hooks/useFilter";
import { fetchCatalogProducts } from "../lib/client";
import CardProduct from "../../_components/card-product";
import LoadMoreGrid from "../../_components/load-more-grid";
import NoData from "../../_components/no-data";
import type { TProduct } from "@/app/(customer)/types";

export default function ProductListing(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ProductListingContent />
    </QueryClientProvider>
  );
}

function ProductListingContent(): JSX.Element {
  const { filter } = useFilter();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<TProduct[]>({
    queryKey: ["product-listing", filter],
    queryFn: () => fetchCatalogProducts(filter),
  });

  if (isLoading) {
    return <ProductCardGridLoading />;
  }

  if (isError) {
    return (
      <NoData
        title="Failed to Load Products"
        message="Something went wrong. Please try again later."
        icon="/assets/icons/error-warning.svg"
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <NoData
        title="No Products Found"
        message="Try adjusting your filters or search keywords."
        icon="/assets/icons/no-data.svg"
      />
    );
  }

  return (
    <section id="product-list">
      <LoadMoreGrid
        initialCount={9}
        incrementBy={5}
        buttonLabel="Load More Products"
        className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8"
      >
        {products.map((product) => (
          <CardProduct key={`${product.id}-${product.name}`} item={product} />
        ))}
      </LoadMoreGrid>
    </section>
  );
}

function ProductCardGridLoading() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
        >
          <div className="h-[140px] rounded-xl bg-[#FFF4CC] sm:h-[160px] md:h-[180px]" />
          <div className="space-y-2">
            <div className="h-4 w-4/5 rounded bg-slate-200" />
            <div className="h-3 w-1/2 rounded bg-slate-100" />
          </div>
          <div className="h-4 w-24 rounded bg-[#FFC736]/40" />
        </div>
      ))}
    </div>
  );
}
