"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function EmptyCartUI() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-30 text-center text-gray-700">
      <img
        src="/assets/icons/cart.svg"
        alt="Empty Cart"
        className="w-[125px] h-auto mb-6"
      />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="mb-6 text-gray-500">
        Looks like you haven’t added anything to your cart yet.
      </p>
      <button
        onClick={() => router.push("/catalogs")}
        className="px-6 py-3 bg-[#1a087c] text-white rounded-full hover:bg-[#4a3d96] transition"
      >
        Continue Shopping
      </button>
    </div>
  );
}
