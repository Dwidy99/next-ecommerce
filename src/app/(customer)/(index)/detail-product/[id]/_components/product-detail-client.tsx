"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import type {
  CarouselImagesProps,
  PriceInfoProps,
  TCart,
} from "@/app/(customer)/types";
import { useCart } from "@/hooks/useCart";
import { rupiahFormat } from "@/lib/utils";

export function ProductImageCarousel({ images }: CarouselImagesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 3000 })],
  );

  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
  }, [emblaApi]);

  return (
    <section id="details-images">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="w-[86%] flex-shrink-0 sm:w-[64%] md:w-[48%] lg:w-[470px]"
            >
              <div className="flex h-[250px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-[#FFF4CC] p-6 shadow-sm transition-all duration-300 hover:border-[#FFC736] hover:shadow-md sm:h-[320px] sm:p-8 md:h-[380px]">
                <img
                  src={src}
                  alt={`Product image ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductPriceCard({ item, isLogIn }: PriceInfoProps) {
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

        <ul className="mb-6 grid gap-3 text-sm text-slate-600 sm:text-base">
          {[
            "Cute packaging",
            "Manual book instructions",
            "Customer service 24/7",
            "Free delivery Jababeka",
            "Original receipt included",
          ].map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <img
                src="/assets/icons/tick-circle.svg"
                alt=""
                className="h-5 w-5 flex-shrink-0"
              />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={checkout}
          disabled={!isLogIn}
          className="w-full rounded-full bg-[#110843] py-3 text-sm font-bold text-white transition-all hover:bg-[#24105e] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          Add to Cart
        </button>

        {!isLogIn && (
          <p className="mt-3 text-center text-xs text-gray-500">
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
