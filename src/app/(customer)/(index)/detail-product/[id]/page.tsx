import React, { Suspense } from "react";
import Navbar from "../../_components/navbar";
import CarouselImages from "./_components/carousel-images";
import Loading from "../../_components/loading";
import ListProduct from "../../_components/list-product";
import PriceInfo from "./_components/price-info";
import { redirect } from "next/navigation";
import { getProductById } from "../lib/data";
import { getUser } from "@/lib/auth";

interface DetailProductProp {
  params: {
    id: string;
  };
}

export default async function DetailProduct({ params }: DetailProductProp) {
  const id = Number(params?.id);

  if (isNaN(id)) {
    redirect("/catalogs");
  }

  const { session } = await getUser();
  const product = await getProductById(id);

  if (!product) {
    redirect("/catalogs");
  }

  return (
    <>
      <header className="bg-[#FFF9D9] pt-[30px] h-[480px] -mb-[310px]">
        <Navbar />
      </header>

      <div
        id="title"
        className="container max-w-[1130px] mx-auto flex items-center justify-between"
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <a className="page text-sm text-[#6A7789] last-of-type:text-black">
              Shop
            </a>
            <span className="text-sm text-[#6A7789]">/</span>
            <a className="page text-sm text-[#6A7789] last-of-type:text-black">
              Browse
            </a>
            <span className="text-sm text-[#6A7789]">/</span>
            <a className="page text-sm text-[#6A7789] last-of-type:text-black">
              Details
            </a>
          </div>
          <h1 className="font-bold text-4xl leading-9">{product.name}</h1>
        </div>
      </div>

      <CarouselImages images={product.images} />

      <div
        id="details-benefits"
        className="container max-w-[1130px] mx-auto flex items-center gap-[50px] justify-center mt-[50px]"
      >
        <div className="flex items-center gap-[10px]">
          <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
            <img src="/assets/icons/star-outline.svg" alt="icon" />
          </div>
          <p className="font-semibold text-sm">
            Include Official <br /> Warranty
          </p>
        </div>
        <div className="border-[0.5px] border-[#E5E5E5] h-12"></div>
        <div className="flex items-center gap-[10px]">
          <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
            <img src="/assets/icons/code-circle.svg" alt="icon" />
          </div>
          <p className="font-semibold text-sm">
            Bonus Mac OS <br /> Capitan Pro
          </p>
        </div>
        <div className="border-[0.5px] border-[#E5E5E5] h-12"></div>
        <div className="flex items-center gap-[10px]">
          <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
            <img src="/assets/icons/like.svg" alt="icon" />
          </div>
          <p className="font-semibold text-sm">
            100% Original <br /> From Factory
          </p>
        </div>
        <div className="border-[0.5px] border-[#E5E5E5] h-12"></div>
        <div className="flex items-center gap-[10px]">
          <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
            <img src="/assets/icons/tag.svg" alt="icon" />
          </div>
          <p className="font-semibold text-sm">
            Free Tax On <br /> Every Sale
          </p>
        </div>
      </div>
      <div
        id="details-info"
        className="container max-w-[1030px] mx-auto flex justify-between gap-5 mt-[50px]"
      >
        <div className="max-w-[650px] w-full flex flex-col gap-[30px]">
          <div id="about" className="flex flex-col gap-[10px]">
            <h3 className="font-semibold">About Product</h3>
            <p className="leading-[32px]">{product.description}</p>
          </div>
        </div>
        <PriceInfo
          isLogIn={session ? true : false}
          item={{
            id: product.id,
            category_name: product.category.name,
            image_url: product.images[0],
            name: product.name,
            price: Number(product.price),
          }}
        />
      </div>
      <div
        id="recommedations"
        className="container max-w-[1130px] mx-auto flex flex-col gap-[30px] pb-[100px] mt-[70px]"
      >
        <Suspense fallback={<Loading />}>
          <ListProduct
            title={
              <>
                Recommendations <br /> You May Need
              </>
            }
            isShowDetail={false}
          />
        </Suspense>
      </div>
    </>
  );
}
