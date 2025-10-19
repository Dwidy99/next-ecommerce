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

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <Loading />;

  const isEmpty = products.length === 0;

  return (
    <main className="container max-w-[1130px] mx-auto px-4 sm:px-6 lg:px-8">
      <div
        id="title"
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 mt-10"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 items-center text-sm text-[#6A7789]">
            <span>Shop</span>/<span>Browse</span>/<span>Details</span>
          </div>
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight">
            My Shopping Cart
          </h1>
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
