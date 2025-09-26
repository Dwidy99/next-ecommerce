"use client";

import React from "react";
import CardProduct from "../../_components/card-product";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../lib/data";
import Loading from "../../_components/loading";

export default function ProductListing() {
  const { data, isLoading } = useQuery({
    queryKey: ["product-listing"],
    queryFn: () => fetchProduct(),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-[30px]">
        <Loading />;
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-[30px]">
      {data?.map((product) => (
        <CardProduct key={product.id + product.name} item={product} />
      ))}
    </div>
  );
}
