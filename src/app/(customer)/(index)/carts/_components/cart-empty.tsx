"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function EmptyCartUI() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 sm:py-24 md:py-32 text-center text-gray-700">
      {/* 🛒 Icon */}
      <img
        src="/assets/icons/cart.svg"
        alt="Empty Cart"
        className="w-24 sm:w-28 md:w-32 h-auto mb-6"
      />

      {/* 🧾 Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">
        Your cart is empty
      </h2>

      {/* 💬 Description */}
      <p className="mb-6 text-gray-500 text-sm sm:text-base max-w-md">
        Looks like you haven’t added anything to your cart yet. Browse our
        collections and find something you’ll love!
      </p>

      {/* 🔘 CTA Button */}
      <button
        onClick={() => router.push("/catalogs")}
        className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#1a087c] text-white rounded-full font-medium hover:bg-[#3a2ea1] transition active:scale-[0.98]"
      >
        Continue Shopping
      </button>
    </div>
  );
}
