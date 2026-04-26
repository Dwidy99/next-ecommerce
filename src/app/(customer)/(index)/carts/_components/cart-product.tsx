"use client";

import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import React, { useMemo } from "react";

export default function CartProduct() {
  const { products, decreaseQuantity, increaseQuantity, removeProduct } =
    useCart();

  const grandTotal = useMemo(
    () => products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
    [products]
  );

  return (
    <section id="cart" className="mt-8 flex w-full flex-col gap-5 sm:mt-12">
      {products.map((cart) => (
        <div
          key={cart.id + cart.name}
          className="flex flex-col gap-4 rounded-2xl border border-[#E5E5E5] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          {/* image + name */}
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

          {/* Price */}
          <div className="flex flex-col gap-1 sm:w-32">
            <p className="text-sm text-[#616369]">Price</p>
            <p className="font-semibold leading-[22px] text-[#12007a]">
              {rupiahFormat(cart.price)}
            </p>
          </div>

          {/* Quantity */}
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

          {/* Total */}
          <div className="flex flex-col gap-1 sm:w-36">
            <p className="text-sm text-[#616369]">Total</p>
            <p className="font-semibold leading-[22px] text-[#12007a]">
              {rupiahFormat(cart.price * cart.quantity)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeProduct(cart.id)}
            className="rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Remove
          </button>
        </div>
      ))}

      {/* summary on mobile */}
      <div className="mt-2 flex items-center justify-between rounded-xl bg-gray-50 p-4 sm:hidden">
        <p className="text-sm font-semibold">Grand Total:</p>
        <p className="text-lg font-bold text-[#12007a]">
          {rupiahFormat(grandTotal)}
        </p>
      </div>
    </section>
  );
}
