import React from "react";
import Navbar from "../_components/navbar";

export default function CatalogPage() {
  return (
    <>
      <header className="bg-[#EFF3FA] pt-[30px] h-[351px] -mb-[181px]">
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
              Catalog
            </a>
          </div>
          <h1 className="font-bold text-4xl leading-9">Our Product Catalog</h1>
        </div>
        <form
          action=""
          className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300"
        >
          <input
            type="text"
            id=""
            name=""
            className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
            placeholder="Search product by name, brand, category"
          />
          <button type="submit" className="flex shrink-0">
            <img src="assets/icons/search-normal.svg" alt="icon" />
          </button>
        </form>
      </div>

      <div
        id="catalog"
        className="container max-w-[1130px] mx-auto flex gap-[30px] mt-[50px] pb-[100px]"
      >
        <form
          action=""
          className="flex flex-1 flex-col bg-white p-[30px] gap-5 h-fit border border-[#E5E5E5] rounded-[30px]"
        >
          <h2 className="font-bold text-2xl leading-[34px]">Filters</h2>
          <div className="flex flex-col gap-[14px]">
            <p className="font-semibold leading-[22px]">Range Harga</p>
            <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/dollar-circle.svg" alt="icon" />
              </div>
              <input
                type="number"
                id=""
                name=""
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Minimum price"
              />
            </div>
            <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/dollar-circle.svg" alt="icon" />
              </div>
              <input
                type="number"
                id=""
                name=""
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Maximum price"
              />
            </div>
          </div>
          <hr className="border-[#E5E5E5]" />
          <div className="flex flex-col gap-[14px]">
            <p className="font-semibold leading-[22px]">Stocks</p>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="stock"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Pre Order</span>
            </label>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="stock"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Ready Stock</span>
            </label>
          </div>
          <hr className="border-[#E5E5E5]" />
          <div className="flex flex-col gap-[14px]">
            <p className="font-semibold leading-[22px]">Brands</p>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="brand"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Apple</span>
            </label>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="brand"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Samsung</span>
            </label>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="brand"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Huawei</span>
            </label>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="brand"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Nokia</span>
            </label>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="brand"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Microsoft</span>
            </label>
          </div>
          <hr className="border-[#E5E5E5]" />
          <div className="flex flex-col gap-[14px]">
            <p className="font-semibold leading-[22px]">Location</p>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="loc"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Bandung</span>
            </label>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="loc"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Jakarta</span>
            </label>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="loc"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Shanghai</span>
            </label>
            <label className="font-semibold flex items-center gap-3">
              <input
                type="checkbox"
                name="loc"
                className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
              />
              <span>Beijing</span>
            </label>
          </div>
        </form>
        <div className="w-[780px] flex flex-col bg-white p-[30px] gap-[30px] h-fit border border-[#E5E5E5] rounded-[30px]">
          <h2 className="font-bold text-2xl leading-[34px]">Products</h2>
          <div className="grid grid-cols-3 gap-[30px]">
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
                    <p className="font-semibold leading-[22px]">
                      Smartwei Pro 18
                    </p>
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
                    <p className="font-semibold leading-[22px]">
                      MacBook Pro X
                    </p>
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
                    <p className="font-semibold leading-[22px]">
                      Warna iMac Jadi
                    </p>
                    <p className="text-sm text-[#616369]">Desktops</p>
                  </div>
                  <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                    Rp 89.000.000
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
                    <p className="font-semibold leading-[22px]">
                      Warna iMac Jadi
                    </p>
                    <p className="text-sm text-[#616369]">Desktops</p>
                  </div>
                  <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                    Rp 89.000.000
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
                    <p className="font-semibold leading-[22px]">
                      Smartwei Pro 18
                    </p>
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
                    <p className="font-semibold leading-[22px]">
                      MacBook Pro X
                    </p>
                    <p className="text-sm text-[#616369]">Laptops</p>
                  </div>
                  <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                    Rp 24.000.000
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
