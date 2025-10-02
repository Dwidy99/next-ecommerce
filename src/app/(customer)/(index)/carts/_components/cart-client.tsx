"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import CartProduct from "./cart-product";
import CheckoutForm from "./checkout-form";
import EmptyCartUI from "./cart-empty";
import Loading from "../../_components/loading";

export default function CartClient() {
  const { products } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Supaya kita tahu kapan client-side hydrate selesai
    setIsMounted(true);
  }, []);

  // Tampilkan loading dulu saat belum client-side mounted
  if (!isMounted) {
    return <Loading />;
  }

  const isEmpty = products.length === 0;

  return (
    <main className="container max-w-[1130px] mx-auto">
      <div id="title" className="flex items-center justify-between mb-10 mt-10">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <span className="text-sm text-[#6A7789]">Shop</span>
            <span className="text-sm text-[#6A7789]">/</span>
            <span className="text-sm text-[#6A7789]">Browse</span>
            <span className="text-sm text-[#6A7789]">/</span>
            <span className="text-sm text-[#6A7789]">Details</span>
          </div>
          <h1 className="font-bold text-4xl leading-9">My Shopping Cart</h1>
        </div>
      </div>

      {isEmpty ? (
        <EmptyCartUI />
      ) : (
        <>
          <CartProduct />
          <CheckoutForm />
        </>
      )}
    </main>
  );
}
