"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import CheckoutForm from "./checkout-form";
import CustomerLoading from "@/app/(customer)/loading";
import { rupiahFormat } from "@/lib/utils";
import { useRouter } from "next/navigation";

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

function EmptyCartUI() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center text-gray-700 sm:py-24 md:py-32">
      <img
        src="/assets/icons/cart.svg"
        alt="Empty Cart"
        className="mb-6 h-auto w-24 sm:w-28 md:w-32"
      />

      <h2 className="mb-2 text-xl font-semibold sm:text-2xl">
        Your cart is empty
      </h2>

      <p className="mb-6 max-w-md text-sm text-gray-500 sm:text-base">
        Looks like you have not added anything to your cart yet. Browse our
        collections and find something you will love.
      </p>

      <button
        onClick={() => router.push("/catalogs")}
        className="rounded-full bg-[#1a087c] px-6 py-3 font-medium text-white transition hover:bg-[#3a2ea1] active:scale-[0.98] sm:px-8 sm:py-3.5"
      >
        Continue Shopping
      </button>
    </div>
  );
}

function CartProduct() {
  const { products, decreaseQuantity, increaseQuantity, removeProduct } =
    useCart();

  const grandTotal = products.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0,
  );

  return (
    <section id="cart" className="mt-8 flex w-full flex-col gap-5 sm:mt-12">
      {products.map((cart) => (
        <div
          key={cart.id + cart.name}
          className="flex flex-col gap-4 rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <div className="flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-50">
              <img
                src={cart.image_url}
                className="h-full w-full object-contain"
                alt={cart.name}
              />
            </div>
            <div className="flex flex-col gap-1 truncate">
              <p className="truncate font-semibold leading-[22px]">
                {cart.name}
              </p>
              <p className="text-sm text-[#616369]">{cart.category_name}</p>
            </div>
          </div>

          <CartTextValue label="Price" value={rupiahFormat(cart.price)} />

          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Quantity</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(cart.id)}
                className="h-6 w-6"
              >
                <img src="/assets/icons/minus-cirlce.svg" alt="minus" />
              </button>
              <p className="font-semibold text-[#12007a]">{cart.quantity}</p>
              <button
                onClick={() => increaseQuantity(cart.id)}
                className="h-6 w-6"
              >
                <img src="/assets/icons/add-circle.svg" alt="plus" />
              </button>
            </div>
          </div>

          <CartTextValue
            label="Total"
            value={rupiahFormat(cart.price * cart.quantity)}
          />

          <button
            type="button"
            onClick={() => removeProduct(cart.id)}
            className="rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-2 flex items-center justify-between rounded-xl bg-gray-50 p-4 sm:hidden">
        <p className="text-sm font-semibold">Grand Total:</p>
        <p className="text-lg font-bold text-[#12007a]">
          {rupiahFormat(grandTotal)}
        </p>
      </div>
    </section>
  );
}

function CartTextValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 sm:w-32">
      <p className="text-sm text-[#616369]">{label}</p>
      <p className="font-semibold leading-[22px] text-[#12007a]">{value}</p>
    </div>
  );
}
