"use client";

import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import type { PriceInfoProps, TCart } from "@/app/(customer)/types";
import { useRouter } from "next/navigation";

export default function PriceInfo({ item, isLogIn }: PriceInfoProps) {
  const { addProduct } = useCart();
  const router = useRouter();

  const checkout = () => {
    const newCart: TCart = { ...item, quantity: 1 };
    addProduct(newCart);
    router.push("/carts");
  };

  return (
    <aside className="flex h-fit w-full shrink-0 flex-col gap-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#FFC736] hover:shadow-md sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d99000]">
            Brand New
          </p>
          <p className="mt-2 text-3xl font-extrabold leading-tight text-[#110843] sm:text-[34px]">
            {rupiahFormat(Number(item.price))}
          </p>
        </div>

        <ul className="mb-6 space-y-3 text-sm text-slate-600 sm:text-base">
          {[
            "Cute packaging",
            "Manual book instructions",
            "Customer service 24/7",
            "Free delivery Jababeka",
            "Kwitansi orisinal 100%",
          ].map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <img
                src="/assets/icons/tick-circle.svg"
                alt="check"
                className="w-5 h-5 flex-shrink-0"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={checkout}
          disabled={!isLogIn}
          className="w-full rounded-full bg-[#110843] py-3 text-sm font-bold text-white transition-all hover:bg-[#24105e] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          Add to Cart
        </button>

        {!isLogIn && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Please{" "}
            <a href="/sign-in" className="text-[#12007a] underline">
              sign in
            </a>{" "}
            to purchase.
          </p>
        )}
      </div>
    </aside>
  );
}
