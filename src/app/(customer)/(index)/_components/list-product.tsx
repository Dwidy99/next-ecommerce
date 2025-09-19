import React, { ReactNode } from "react";

interface ListProductProps {
  title: ReactNode;
}

export default function ListProduct({ title }: ListProductProps) {
  return (
    <div id="picked" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">{title}</h2>
        <a
          href="catalog.html"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Explore All
        </a>
      </div>
      <div className="grid grid-cols-5 gap-[30px]">
        <a href="details.html" className="product-card">
          <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
              <img
                src="assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png"
                className="w-full h-full object-contain"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-1">
                <p className="font-semibold leading-[22px]">
                  iMac Green Energy
                </p>
                <p className="text-sm text-[#616369]">Desktops</p>
              </div>
              <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                Rp 24.000.000
              </p>
            </div>
          </div>
        </a>
        <a href="details.html" className="product-card">
          <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
              <img
                src="assets/thumbnails/iphone15pro-digitalmat-gallery-3-202309-Photoroom 1.png"
                className="w-full h-full object-contain"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-1">
                <p className="font-semibold leading-[22px]">Smartwei Pro 18</p>
                <p className="text-sm text-[#616369]">Phones</p>
              </div>
              <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                Rp 11.000.000
              </p>
            </div>
          </div>
        </a>
        <a href="details.html" className="product-card">
          <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
              <img
                src="assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png"
                className="w-full h-full object-contain"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-1">
                <p className="font-semibold leading-[22px]">MacBook Pro X</p>
                <p className="text-sm text-[#616369]">Laptops</p>
              </div>
              <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                Rp 24.000.000
              </p>
            </div>
          </div>
        </a>
        <a href="details.html" className="product-card">
          <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
              <img
                src="assets/thumbnails/airpods-max-select-skyblue-202011-Photoroom 1.png"
                className="w-full h-full object-contain"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-1">
                <p className="font-semibold leading-[22px]">Tuli Nyaman</p>
                <p className="text-sm text-[#616369]">Headsets</p>
              </div>
              <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                Rp 3.500.000.000
              </p>
            </div>
          </div>
        </a>
        <a href="details.html" className="product-card">
          <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
              <img
                src="assets/thumbnails/imac24-digitalmat-gallery-1-202310-Photoroom 1.png"
                className="w-full h-full object-contain"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-1">
                <p className="font-semibold leading-[22px]">Warna iMac Jadi</p>
                <p className="text-sm text-[#616369]">Desktops</p>
              </div>
              <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                Rp 89.000.000
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
