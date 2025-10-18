"use client";

import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";
import { TCart, TProduct } from "@/types";
import { useRouter } from "next/navigation";

interface PriceInfoProp {
  item: TProduct;
  isLogIn: boolean;
}

export default function PriceInfo({ item, isLogIn }: PriceInfoProp) {
  const { addProduct } = useCart();
  const router = useRouter();

  const checkout = () => {
    const newCart: TCart = { ...item, quantity: 1 };
    addProduct(newCart);
    router.push("/carts");
  };

  return (
    <aside className="w-full md:w-[320px] flex flex-col shrink-0 gap-5 h-fit">
      <div className="bg-white border border-[#FFF9D9] p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="mb-6">
          <p className="font-semibold text-sm sm:text-base text-gray-700">
            Brand New
          </p>
          <p className="font-bold text-2xl sm:text-[32px] leading-tight mt-1 text-[#110843]">
            {rupiahFormat(Number(item.price))}
          </p>
        </div>

        <ul className="space-y-3 text-sm sm:text-base text-gray-700 mb-6">
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
          className="w-full py-3 bg-[#12007a] hover:bg-[#24105e] text-white rounded-full font-semibold text-sm sm:text-base transition-all disabled:opacity-60"
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
