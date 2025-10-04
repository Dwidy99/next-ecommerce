"use client";

import Flickity from "react-flickity-component";

const flickityOptions = {
  wrapAround: true,
  autoPlay: 1500,
  pauseAutoPlayOnHover: true,
  prevNextButtons: false,
  pageDots: true,
  cellAlign: "left",
};

export default function ProductsCarousel() {
  const FlickityComponent = Flickity as any;

  return (
    <section id="new-release" className="flex flex-col gap-8">
      {/* Carousel */}
      <FlickityComponent
        className="carousel w-full"
        elementType="div"
        options={flickityOptions}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        {[
          {
            src: "/assets/banners/1.jpg",
          },
          {
            src: "/assets/banners/2.jpg",
          },
          {
            src: "/assets/banners/5.jpg",
          },
          {
            src: "/assets/banners/3.jpg",
          },
          {
            src: "/assets/banners/4.jpg",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="carousel-cell w-[320px] md:w-[360px] lg:w-[420px] flex-shrink-0 mr-6"
          >
            <div className="bg-white flex flex-col gap-4 p-5 rounded-[20px] border border-[#E5E5E5] hover:border-[#FFC736] transition-all duration-300 shadow-sm">
              <div className="aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl bg-[#f9f9f9]">
                <img src={item.src} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        ))}
      </FlickityComponent>
    </section>
  );
}
