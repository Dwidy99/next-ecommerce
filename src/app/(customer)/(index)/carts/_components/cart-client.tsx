"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import CartProduct from "./cart-product";
import CheckoutForm from "./checkout-form";
import EmptyCartUI from "./cart-empty";
import CustomerLoading from "@/app/(customer)/_components/customer-loading";

export default function CartClient() {
  const { products } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <CustomerLoading />;

  const isEmpty = products.length === 0;

  return (
    <div className="mx-auto max-w-6xl">
      <div
        id="title"
        className="mb-8 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#6A7789]">
            <span>Shop</span>/<span>Browse</span>/<span>Details</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
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
    </div>
  );
}
