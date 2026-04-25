"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFilter } from "@/hooks/useFilter";
import { fetchProduct } from "../lib/data";
import CardProduct from "../../_components/card-product";
import NoData from "../../_components/no-data";
import Loading from "../../_components/loading-skeleton";
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
    queryFn: () => fetchProduct(filter),
  });

  if (isLoading) {
    return (
      <div className="w-full">
        <Loading count={6} type="grid" />
      </div>
    );
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
    <section
      id="product-list"
      className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8"
    >
      {products.map((product) => (
        <CardProduct key={`${product.id}-${product.name}`} item={product} />
      ))}
    </section>
  );
}
