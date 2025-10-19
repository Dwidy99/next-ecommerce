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
    <section id="cart" className="flex flex-col gap-5 mt-8 sm:mt-12 w-full">
      {products.map((cart) => (
        <div
          key={cart.id + cart.name}
          className="bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl border border-[#E5E5E5] shadow-sm"
        >
          {/* image + name */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-24 h-20 flex shrink-0 overflow-hidden items-center justify-center rounded-md bg-gray-50">
              <img
                src={cart.image_url}
                className="w-full h-full object-contain"
                alt={cart.name}
              />
            </div>
            <div className="flex flex-col gap-1 truncate">
              <p className="font-semibold leading-[22px] truncate">
                {cart.name}
              </p>
              <p className="text-sm text-[#616369]">{cart.category_name}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex sm:w-[120px] flex-col gap-1">
            <p className="text-sm text-[#616369]">Price</p>
            <p className="font-semibold text-[#12007a] leading-[22px]">
              {rupiahFormat(cart.price)}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Quantity</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(cart.id)}
                className="w-6 h-6"
              >
                <img src="/assets/icons/minus-cirlce.svg" alt="minus" />
              </button>
              <p className="text-[#12007a] font-semibold">{cart.quantity}</p>
              <button
                onClick={() => increaseQuantity(cart.id)}
                className="w-6 h-6"
              >
                <img src="/assets/icons/add-circle.svg" alt="plus" />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex sm:w-[140px] flex-col gap-1">
            <p className="text-sm text-[#616369]">Total</p>
            <p className="font-semibold text-[#12007a] leading-[22px]">
              {rupiahFormat(cart.price * cart.quantity)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeProduct(cart.id)}
            className="px-4 py-2 bg-white rounded-full font-semibold border border-[#E5E5E5] text-sm hover:bg-gray-50"
          >
            Remove
          </button>
        </div>
      ))}

      {/* summary on mobile */}
      <div className="flex sm:hidden justify-between items-center bg-gray-50 p-4 rounded-xl mt-2">
        <p className="text-sm font-semibold">Grand Total:</p>
        <p className="text-lg font-bold text-[#12007a]">
          {rupiahFormat(grandTotal)}
        </p>
      </div>
    </section>
  );
}
