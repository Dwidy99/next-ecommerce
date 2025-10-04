"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import Loading from "./loading";

// Import carousel secara dinamis hanya di client
const ProductsCarousel = dynamic(() => import("./products-carousel"), {
  ssr: false,
});

export default function ProductsCarouselWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsCarousel />
    </Suspense>
  );
}
