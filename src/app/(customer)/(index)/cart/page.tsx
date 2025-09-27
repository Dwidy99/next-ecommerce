import React from "react";
import Navbar from "../_components/navbar";

export default function CartsPage() {
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
              Details
            </a>
          </div>
          <h1 className="font-bold text-4xl leading-9">My Shopping Cart</h1>
        </div>
      </div>

      <div
        id="cart"
        className="container max-w-[1130px] mx-auto flex flex-col gap-5 mt-[50px]"
      >
        <div className="product-total-card bg-white flex items-center justify-between p-5 rounded-[20px] border border-[#E5E5E5]">
          <div className="flex items-center w-[340px] gap-5">
            <div className="w-[120px] h-[70px] flex shrink-0 overflow-hidden items-center justify-center">
              <img
                src="/assets/thumbnails/iphone15pro-digitalmat-gallery-3-202309-Photoroom 1.png"
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold leading-[22px]">iPhone Sawedia Pro</p>
              <p className="text-sm text-[#616369]">Phones</p>
            </div>
          </div>
          <div className="w-[150px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Price</p>
            <p className="font-semibold text-[#0D5CD7] leading-[22px]">
              Rp 24.000.000
            </p>
          </div>
          <div className="w-[120px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Quantity</p>
            <div className="flex items-center gap-3">
              <button className="w-6 h-6 flex shrink-0">
                <img src="/assets/icons/minus-cirlce.svg" alt="minus" />
              </button>
              <p className="text-[#0D5CD7] font-semibold leading-[22px]">
                1,389
              </p>
              <button className="w-6 h-6 flex shrink-0">
                <img src="/assets/icons/add-circle.svg" alt="plus" />
              </button>
            </div>
          </div>
          <div className="w-[150px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Total</p>
            <p className="font-semibold text-[#0D5CD7] leading-[22px]">
              Rp 789.493.222
            </p>
          </div>
          <button className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]">
            Remove
          </button>
        </div>
        <div className="product-total-card bg-white flex items-center justify-between p-5 rounded-[20px] border border-[#E5E5E5]">
          <div className="flex items-center w-[340px] gap-5">
            <div className="w-[120px] h-[70px] flex shrink-0 overflow-hidden items-center justify-center">
              <img
                src="/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png"
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold leading-[22px]">MacBook Pro X</p>
              <p className="text-sm text-[#616369]">Laptops</p>
            </div>
          </div>
          <div className="w-[150px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Price</p>
            <p className="font-semibold text-[#0D5CD7] leading-[22px]">
              Rp 112.495.390
            </p>
          </div>
          <div className="w-[120px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Quantity</p>
            <div className="flex items-center gap-3">
              <button className="w-6 h-6 flex shrink-0">
                <img src="/assets/icons/minus-cirlce.svg" alt="minus" />
              </button>
              <p className="text-[#0D5CD7] font-semibold leading-[22px]">421</p>
              <button className="w-6 h-6 flex shrink-0">
                <img src="/assets/icons/add-circle.svg" alt="plus" />
              </button>
            </div>
          </div>
          <div className="w-[150px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Total</p>
            <p className="font-semibold text-[#0D5CD7] leading-[22px]">
              Rp 1.789.493.222
            </p>
          </div>
          <button className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]">
            Remove
          </button>
        </div>
        <div className="product-total-card bg-white flex items-center justify-between p-5 rounded-[20px] border border-[#E5E5E5]">
          <div className="flex items-center w-[340px] gap-5">
            <div className="w-[120px] h-[70px] flex shrink-0 overflow-hidden items-center justify-center">
              <img
                src="/assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png"
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold leading-[22px]">
                iMac Anniversary 100th
              </p>
              <p className="text-sm text-[#616369]">Desktops</p>
            </div>
          </div>
          <div className="w-[150px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Price</p>
            <p className="font-semibold text-[#0D5CD7] leading-[22px]">
              Rp2.589.382
            </p>
          </div>
          <div className="w-[120px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Quantity</p>
            <div className="flex items-center gap-3">
              <button className="w-6 h-6 flex shrink-0">
                <img src="/assets/icons/minus-cirlce.svg" alt="minus" />
              </button>
              <p className="text-[#0D5CD7] font-semibold leading-[22px]">5</p>
              <button className="w-6 h-6 flex shrink-0">
                <img src="/assets/icons/add-circle.svg" alt="plus" />
              </button>
            </div>
          </div>
          <div className="w-[150px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Total</p>
            <p className="font-semibold text-[#0D5CD7] leading-[22px]">
              Rp 22.839.492
            </p>
          </div>
          <button className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]">
            Remove
          </button>
        </div>
      </div>

      <form
        action=""
        id="checkout-info"
        className="container max-w-[1130px] mx-auto flex justify-between gap-5 mt-[50px] pb-[100px]"
      >
        <div className="w-[650px] flex flex-col shrink-0 gap-4 h-fit">
          <h2 className="font-bold text-2xl leading-[34px]">
            Your Shipping Address
          </h2>
          <div className="flex flex-col gap-5 p-[30px] rounded-3xl border border-[#E5E5E5] bg-white">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/profile-circle.svg" alt="icon" />
              </div>
              <input
                type="text"
                id=""
                name=""
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Write your real complete name"
              />
            </div>
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/house-2.svg" alt="icon" />
              </div>
              <input
                type="text"
                id=""
                name=""
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Write your active house address"
              />
            </div>
            <div className="flex items-center gap-[30px]">
              <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                <div className="flex shrink-0">
                  <img src="assets/icons/global.svg" alt="icon" />
                </div>
                <input
                  type="text"
                  id=""
                  name=""
                  className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                  placeholder="City"
                />
              </div>
              <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                <div className="flex shrink-0">
                  <img src="assets/icons/location.svg" alt="icon" />
                </div>
                <input
                  type="number"
                  id=""
                  name=""
                  className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                  placeholder="Post code"
                />
              </div>
            </div>
            <div className="flex items-start gap-[10px] rounded-[20px] border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/note.svg" alt="icon" />
              </div>
              <textarea
                name=""
                id=""
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black resize-none"
                rows="6"
                placeholder="Additional notes for courier"
              ></textarea>
            </div>
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="assets/icons/call.svg" alt="icon" />
              </div>
              <input
                type="tel"
                id=""
                name=""
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Write your phone number or whatsapp"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col shrink-0 gap-4 h-fit">
          <h2 className="font-bold text-2xl leading-[34px]">Payment Details</h2>
          <div className="w-full bg-white border border-[#E5E5E5] flex flex-col gap-[30px] p-[30px] rounded-3xl">
            <a href="">
              <div className="w-full bg-white border border-[#E5E5E5] flex items-center justify-between gap-2 p-5 rounded-3xl">
                <div className="flex items-center gap-[10px]">
                  <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
                    <img src="assets/icons/cake.svg" alt="icon" />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold">100% It's Original</p>
                    <p className="text-sm">We don't sell fake products</p>
                  </div>
                </div>
                <div className="flex shrink-0">
                  <img src="assets/icons/arrow-right.svg" alt="icon" />
                </div>
              </div>
            </a>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>Sub Total</p>
                </div>
                <p className="font-semibold">Rp 50.000.000</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>Insurance 12%</p>
                </div>
                <p className="font-semibold">Rp 18.389.492</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>Shipping (Flat)</p>
                </div>
                <p className="font-semibold">Rp 200.000</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>Warranty Original</p>
                </div>
                <p className="font-semibold">Rp 0</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex shrink-0">
                    <img src="assets/icons/tick-circle.svg" alt="icon" />
                  </div>
                  <p>PPN 11%</p>
                </div>
                <p className="font-semibold">Rp 123.489.333</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Grand Total</p>
              <p className="font-bold text-[32px] leading-[48px] underline text-[#0D5CD7]">
                Rp 18.498.492.444
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href=""
                className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
              >
                Checkout Now
              </a>
              <a
                href=""
                className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
