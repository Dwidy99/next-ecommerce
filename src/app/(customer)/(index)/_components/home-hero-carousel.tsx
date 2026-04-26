"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    eyebrow: "Shopverse Picks",
    title: "Discover curated gadgets for work, study, and entertainment.",
    description:
      "Shop quality products with organized categories, fast checkout, and a smoother catalog experience.",
    image: "/assets/banners/5.jpg",
    primaryLabel: "Explore Now",
    primaryHref: "/catalogs",
    secondaryLabel: "View Cart",
    secondaryHref: "/carts",
  },
  {
    eyebrow: "Office Setup",
    title: "Build a cleaner desk setup with everyday essentials.",
    description:
      "Find devices and accessories that help your workspace feel focused, practical, and ready to use.",
    image: "/assets/banners/2.jpg",
    primaryLabel: "Browse Catalog",
    primaryHref: "/catalogs",
    secondaryLabel: "See Categories",
    secondaryHref: "/catalogs",
  },
  {
    eyebrow: "Audio Collection",
    title: "Upgrade your sound for work calls, travel, and downtime.",
    description:
      "Explore wireless audio picks, accessories, and companion gadgets in one simple shopping flow.",
    image: "/assets/banners/3.jpg",
    primaryLabel: "Shop Audio",
    primaryHref: "/catalogs",
    secondaryLabel: "Learn More",
    secondaryHref: "/catalogs",
  },
  {
    eyebrow: "Smart Companion",
    title: "Keep your day moving with gadgets that match your routine.",
    description:
      "From daily drivers to smart accessories, find useful products without digging through noise.",
    image: "/assets/banners/4.jpg",
    primaryLabel: "Start Shopping",
    primaryHref: "/catalogs",
    secondaryLabel: "View Cart",
    secondaryHref: "/carts",
  },
  {
    eyebrow: "Bulk Orders",
    title: "Need gadgets or bundles for a team, class, or community?",
    description:
      "Prepare larger orders with a cleaner catalog experience and simple checkout path.",
    image: "/assets/banners/1.jpg",
    primaryLabel: "Explore Products",
    primaryHref: "/catalogs",
    secondaryLabel: "Contact Support",
    secondaryHref: "/catalogs",
  },
];

export default function HomeHeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 md:px-6">
      <div className="relative overflow-hidden rounded-[22px] bg-[#110843] shadow-sm ring-1 ring-black/5">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <article key={slide.title} className="relative min-w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                width={1800}
                height={720}
                priority={index === 0}
                className="h-[360px] w-full object-cover md:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#110843]/90 via-[#110843]/55 to-black/10" />
              <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FFC736]/25 blur-3xl" />
              <div className="absolute inset-0 flex items-center px-6 md:px-14">
                <div className="max-w-2xl">
                  <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#FFC736] backdrop-blur">
                    {slide.eyebrow}
                  </p>
                  <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
                    {slide.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href={slide.primaryHref}
                      className="rounded-md bg-[#FFC736] px-7 py-3 text-sm font-bold text-[#110843] shadow-lg shadow-yellow-950/20 transition hover:bg-[#ffda63]"
                    >
                      {slide.primaryLabel}
                    </Link>
                    <Link
                      href={slide.secondaryHref}
                      className="rounded-md bg-white/15 px-7 py-3 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25"
                    >
                      {slide.secondaryLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeSlide ? "w-8 bg-[#FFC736]" : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
