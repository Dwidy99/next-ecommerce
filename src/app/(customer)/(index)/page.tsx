import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./_components/navbar";
import ListCategory from "./_components/list-category";
import ListProduct from "./_components/list-product";
import ListBrand from "./_components/list-brand";
import Loading from "./_components/loading";
import ProductsCarouselWrapper from "./_components/products-carousel-wrapper";

export default function LandingPage() {
  return (
    <>
      {/* 🟡 Header / Hero Section */}
      <header className="bg-[#FFF9D9] pt-8 pb-16">
        <Navbar />

        <div className="container max-w-screen-xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mt-12 px-4">
          {/* Hero Text */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="flex items-center gap-2 p-2.5 px-4 rounded-full bg-white mx-auto lg:mx-0 w-fit">
              <div className="w-5 h-5 shrink-0">
                <Image
                  src="/assets/icons/crown.svg"
                  alt="Popular"
                  width={22}
                  height={22}
                />
              </div>
              <p className="font-semibold text-sm">
                Most Popular 100th Product in Shopverse
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-[55px] leading-tight">
                Working Faster 10x
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#6A7789] max-w-md mx-auto lg:mx-0">
                Dolor si amet lorem super-power features richer than any other
                platform devices with AI integration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/carts"
                className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold bg-[#FFC736] hover:bg-[#FFD84C] transition"
              >
                Add to Cart
              </Link>
              <Link
                href="/catalogs"
                className="w-full sm:w-auto px-6 py-3 rounded-full font-semibold bg-white hover:bg-gray-100 transition"
              >
                View Catalogs
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full lg:w-[580px] flex justify-center">
            <Image
              src="/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png"
              alt="Product banner"
              width={580}
              height={360}
              className="object-contain drop-shadow-lg"
              priority
            />

            {/* Floating Bonus Tag */}
            <div className="absolute top-[60%] left-4 sm:left-10 bg-white p-3 rounded-3xl flex items-center gap-3 shadow-md">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FFC736] rounded-full">
                <Image
                  src="/assets/icons/code-circle.svg"
                  alt="Bonus icon"
                  width={24}
                  height={24}
                />
              </div>
              <p className="font-semibold text-sm leading-snug">
                Bonus Mac OS <br /> Capitan Pro
              </p>
            </div>

            {/* Floating Warranty Tag */}
            <div className="absolute right-4 top-[25%] bg-white p-3 rounded-3xl flex flex-col items-center gap-2 shadow-md">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FFC736] rounded-full">
                <Image
                  src="/assets/icons/star-outline.svg"
                  alt="Warranty"
                  width={24}
                  height={24}
                />
              </div>
              <p className="font-semibold text-sm text-center leading-snug">
                Include <br /> Warranty
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="container max-w-screen-xl mx-auto mt-12 px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
          {[
            { img: "p1.png", name: "Jemmie Pemilia", text: "Awesome product!" },
            { img: "p2.png", name: "Angga Risky", text: "Money saver 25%" },
            {
              img: "p3.png",
              name: "Petina Malaka",
              text: "I love the warranty",
            },
            { img: "p4.png", name: "Udin Sarifun", text: "Big deals ever!" },
          ].map((user) => (
            <div
              key={user.name}
              className="flex flex-col sm:flex-row lg:flex-col items-center gap-3"
            >
              <div className="w-[50px] h-[50px] rounded-full border-[4px] border-white overflow-hidden">
                <Image
                  src={`/assets/photos/${user.img}`}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold text-sm leading-snug">
                  {user.text}
                </p>
                <p className="text-xs text-gray-600">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* 🟢 Main Content */}
      <main
        id="content"
        className="container max-w-screen-xl mx-auto px-4 flex flex-col gap-16 py-16"
      >
        <Suspense fallback={<Loading />}>
          <ListCategory />
        </Suspense>

        <ProductsCarouselWrapper />

        <Suspense fallback={<Loading />}>
          <ListProduct
            title={
              <>
                Most Picked <br /> Quality Products
              </>
            }
            isShowDetail
          />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <ListBrand />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <ListProduct
            title={
              <>
                Most Releases <br /> From Official Stores
              </>
            }
            isShowDetail
          />
        </Suspense>
      </main>
    </>
  );
}
