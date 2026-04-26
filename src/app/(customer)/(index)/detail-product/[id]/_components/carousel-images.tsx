"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";
import type { CarouselImagesProps } from "@/app/(customer)/types";

export default function CarouselImages({ images }: CarouselImagesProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 3000 })]
  );

  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
  }, [emblaApi]);

  return (
    <section id="details-images">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {images.map((src, i) => (
            <div
              key={src + i}
              className="w-[86%] flex-shrink-0 sm:w-[64%] md:w-[48%] lg:w-[470px]"
            >
              <div className="flex h-[250px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-[#FFF4CC] p-6 shadow-sm transition-all duration-300 hover:border-[#FFC736] hover:shadow-md sm:h-[320px] sm:p-8 md:h-[380px]">
                <img
                  src={src}
                  alt={`product-${i}`}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
