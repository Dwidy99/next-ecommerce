import React from "react";

export default function ListCategory() {
  return (
    <div id="categories" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">
          Browse Products <br /> by Categories
        </h2>
        <a
          href="catalog.html"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Explore All
        </a>
      </div>
      <div className="grid grid-cols-4 gap-[30px]">
        <a href="" className="categories-card">
          <div className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
              <img src="assets/icons/mobile.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold leading-[22px]">Phones</p>
              <p className="text-sm text-[#616369]">4,583 products</p>
            </div>
          </div>
        </a>
        <a href="" className="categories-card">
          <div className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
              <img src="assets/icons/game.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold leading-[22px]">Games</p>
              <p className="text-sm text-[#616369]">4,583 products</p>
            </div>
          </div>
        </a>
        <a href="" className="categories-card">
          <div className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
              <img src="assets/icons/airpods.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold leading-[22px]">Headsets</p>
              <p className="text-sm text-[#616369]">4,583 products</p>
            </div>
          </div>
        </a>
        <a href="" className="categories-card">
          <div className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
              <img src="assets/icons/box.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold leading-[22px]">Essenstials</p>
              <p className="text-sm text-[#616369]">4,583 products</p>
            </div>
          </div>
        </a>
        <a href="" className="categories-card">
          <div className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
              <img src="assets/icons/lamp.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold leading-[22px]">Lights</p>
              <p className="text-sm text-[#616369]">4,583 products</p>
            </div>
          </div>
        </a>
        <a href="" className="categories-card">
          <div className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
              <img src="assets/icons/watch.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold leading-[22px]">Watches</p>
              <p className="text-sm text-[#616369]">4,583 products</p>
            </div>
          </div>
        </a>
        <a href="" className="categories-card">
          <div className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
              <img src="assets/icons/monitor.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold leading-[22px]">Desktops</p>
              <p className="text-sm text-[#616369]">4,583 products</p>
            </div>
          </div>
        </a>
        <a href="" className="categories-card">
          <div className="bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden">
              <img src="assets/icons/cup.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold leading-[22px]">Awards</p>
              <p className="text-sm text-[#616369]">4,583 products</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
