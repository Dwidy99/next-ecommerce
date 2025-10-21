"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "@/hooks/useFilter";
import { fetchProduct } from "../lib/data";
import CardProduct from "../../_components/card-product";
import NoData from "../../_components/no-data";
import Loading from "../../_components/loading";
import type { TProduct } from "@/types";

/**
 * ProductListing Component
 * - Menampilkan daftar produk dengan filter dinamis
 * - Menggunakan React Query
 * - Responsif untuk mobile (2 kolom), tablet (3 kolom), desktop (4 kolom)
 */
export default function ProductListing(): JSX.Element {
  const { filter } = useFilter();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<TProduct[]>({
    queryKey: ["product-listing", filter],
    queryFn: () => fetchProduct(filter),
  });

  // 🟡 Loading State
  if (isLoading) {
    return (
      <div className="w-full">
        <Loading count={6} type="grid" />
      </div>
    );
  }

  // 🔴 Error State
  if (isError) {
    return (
      <NoData
        title="Failed to Load Products"
        message="Something went wrong. Please try again later."
        icon="/assets/icons/error-warning.svg"
      />
    );
  }

  // ⚪ Empty State
  if (!products || products.length === 0) {
    return (
      <NoData
        title="No Products Found"
        message="Try adjusting your filters or search keywords."
        icon="/assets/icons/no-data.svg"
      />
    );
  }

  // 🟢 Success State
  return (
    <section
      id="product-list"
      className="
        grid 
        grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-4 sm:gap-5 md:gap-6 lg:gap-8
        w-full
      "
    >
      {products.map((product) => (
        <CardProduct key={`${product.id}-${product.name}`} item={product} />
      ))}
    </section>
  );
}
