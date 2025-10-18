"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

interface CarouselImageProp {
  images: string[];
}

export default function CarouselImages({ images }: CarouselImageProp) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 3000 })]
  );

  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
  }, [emblaApi]);

  return (
    <section id="details-images" className="mt-10">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {images.map((src, i) => (
            <div
              key={src + i}
              className="flex-shrink-0 w-[85%] sm:w-[60%] md:w-[48%] lg:w-[470px]"
            >
              <div className="bg-white border border-[#E5E5E5] rounded-3xl flex justify-center items-center h-[240px] sm:h-[300px] md:h-[350px] p-6 sm:p-8 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
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
