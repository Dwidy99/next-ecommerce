"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

export default function ProductsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const banners = [
    "/assets/banners/1.jpg",
    "/assets/banners/2.jpg",
    "/assets/banners/3.jpg",
    "/assets/banners/4.jpg",
    "/assets/banners/5.jpg",
  ];

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  return (
    <section
      id="new-release"
      className="w-full px-4 md:px-6 lg:px-0 flex flex-col gap-8"
    >
      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex gap-4 md:gap-6">
          {banners.map((src, idx) => (
            <div
              key={idx}
              className="
                flex-shrink-0
                w-[80%] sm:w-[60%] md:w-[45%] lg:w-[33%] xl:w-[25%]
                transition-transform duration-300 ease-in-out
              "
            >
              <div className="bg-white flex flex-col gap-4 p-4 md:p-5 rounded-2xl border border-[#E5E5E5] hover:border-[#FFC736] transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl bg-[#f9f9f9]">
                  <img
                    src={src}
                    alt={`banner-${idx}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
