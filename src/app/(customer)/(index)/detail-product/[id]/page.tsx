import React from "react";
import Navbar from "../../_components/navbar";

export default function DetailProduct() {
  return (
    <>
      <header className="bg-[#EFF3FA] pt-[30px] h-[480px] -mb-[310px]">
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
          <h1 className="font-bold text-4xl leading-9">
            iMac Pro Anniv Edition 100th
          </h1>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <div className="flex items-center">
            <div className="flex shrink-0">
              <img src="/assets/icons/Star.svg" alt="star" />
            </div>
            <div className="flex shrink-0">
              <img src="/assets/icons/Star.svg" alt="star" />
            </div>
            <div className="flex shrink-0">
              <img src="/assets/icons/Star.svg" alt="star" />
            </div>
            <div className="flex shrink-0">
              <img src="/assets/icons/Star.svg" alt="star" />
            </div>
            <div className="flex shrink-0">
              <img src="/assets/icons/Star-gray.svg" alt="star" />
            </div>
          </div>
          <p className="font-semibold">(4,389)</p>
        </div>
      </div>

      <div id="details-images" className="main-carousel mt-[30px]">
        <div className="image-card pr-5 first-of-type:pl-[calc((100vw-1130px-20px)/2)]">
          <div className="bg-white w-[470px] h-[350px] p-10 flex shrink-0 border border-[#E5E5E5] justify-center items-center rounded-[30px] overflow-hidden">
            <img
              src="/assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png"
              className="w-full h-full object-contain"
              alt="thumbnail"
            />
          </div>
        </div>
        <div className="image-card pr-5 first-of-type:pl-[calc((100vw-1130px-20px)/2)]">
          <div className="bg-white w-[470px] h-[350px] p-10 flex shrink-0 border border-[#E5E5E5] justify-center items-center rounded-[30px] overflow-hidden">
            <img
              src="/assets/thumbnails/imac24-digitalmat-gallery-1-202310-Photoroom 1.png"
              className="w-full h-full object-contain"
              alt="thumbnail"
            />
          </div>
        </div>
        <div className="image-card pr-5 first-of-type:pl-[calc((100vw-1130px-20px)/2)]">
          <div className="bg-white w-[470px] h-[350px] p-10 flex shrink-0 border border-[#E5E5E5] justify-center items-center rounded-[30px] overflow-hidden">
            <img
              src="/assets/thumbnails/246c3a1bf608fed816e2e038784fa995.png"
              className="w-full h-full object-contain"
              alt="thumbnail"
            />
          </div>
        </div>
        <div className="image-card pr-5 first-of-type:pl-[calc((100vw-1130px-20px)/2)]">
          <div className="bg-white w-[470px] h-[350px] p-10 flex shrink-0 border border-[#E5E5E5] justify-center items-center rounded-[30px] overflow-hidden">
            <img
              src="/assets/thumbnails/ea49dfcfcaa4513d799050c989d2f177.png"
              className="w-full h-full object-contain"
              alt="thumbnail"
            />
          </div>
        </div>
      </div>
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
            <p className="leading-[32px]">
              iMac br/ings incredible, room-filling audio to any space. Two
              pairs of force-cancelling woofers create rich, deep bass — and
              each is balanced with a high-performance tweeter for a massive
              soundstage that takes music, movies, and more to the next level.
              12-Core CPU 18-Core GPU 18GB Unified Memory 1TB SSD Storage¹ iMac
              also supports Spatial Audio with Dolby Atmos. And when you combine
              that with a 4.5K Retina display, it's like br/inging the whole
              theater home.
            </p>
          </div>
          <div id="testi" className="flex flex-col gap-[10px]">
            <h3 className="font-semibold">Real Testimonials</h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="testi-card flex flex-col bg-white p-5 gap-5 border border-[#E5E5E5] rounded-[20px] h-fit">
                <div className="flex">
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star-gray.svg" alt="star" />
                  </div>
                </div>
                <p className="line-clamp-2 hover:line-clamp-none leading-[28px]">
                  I do really love this product helped me to achieve my first
                  million Lorem ipsum dolor sit amet.
                </p>
                <div className="flex items-center gap-[10px]">
                  <div className="w-[50px] h-[50px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
                    <img
                      src="/assets/photos/p2.png"
                      className="w-full h-full object-cover rounded-full"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold text-sm leading-[22px]">
                      Angga Risky
                    </p>
                    <p className="text-xs leading-[18px]">12 January 2028</p>
                  </div>
                </div>
              </div>
              <div className="testi-card flex flex-col bg-white p-5 gap-5 border border-[#E5E5E5] rounded-[20px] h-fit">
                <div className="flex">
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star-gray.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star-gray.svg" alt="star" />
                  </div>
                </div>
                <p className="line-clamp-2 hover:line-clamp-none leading-[28px]">
                  I do really love this product helped me to achieve my first
                  million Lorem ipsum dolor sit amet.
                </p>
                <div className="flex items-center gap-[10px]">
                  <div className="w-[50px] h-[50px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
                    <img
                      src="/assets/photos/p4.png"
                      className="w-full h-full object-cover rounded-full"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold text-sm leading-[22px]">
                      Sarifuding
                    </p>
                    <p className="text-xs leading-[18px]">12 January 2028</p>
                  </div>
                </div>
              </div>
              <div className="testi-card flex flex-col bg-white p-5 gap-5 border border-[#E5E5E5] rounded-[20px] h-fit">
                <div className="flex">
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                </div>
                <p className="line-clamp-2 hover:line-clamp-none leading-[28px]">
                  I do really love this product helped me to achieve my first
                  million Lorem ipsum dolor sit amet.
                </p>
                <div className="flex items-center gap-[10px]">
                  <div className="w-[50px] h-[50px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
                    <img
                      src="/assets/photos/p3.png"
                      className="w-full h-full object-cover rounded-full"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold text-sm leading-[22px]">
                      Ika Nurina
                    </p>
                    <p className="text-xs leading-[18px]">12 January 2028</p>
                  </div>
                </div>
              </div>
              <div className="testi-card flex flex-col bg-white p-5 gap-5 border border-[#E5E5E5] rounded-[20px] h-fit">
                <div className="flex">
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star-gray.svg" alt="star" />
                  </div>
                </div>
                <p className="line-clamp-2 hover:line-clamp-none leading-[28px]">
                  I do really love this product helped me to achieve my first
                  million Lorem ipsum dolor sit amet.
                </p>
                <div className="flex items-center gap-[10px]">
                  <div className="w-[50px] h-[50px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
                    <img
                      src="/assets/photos/p1.png"
                      className="w-full h-full object-cover rounded-full"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold text-sm leading-[22px]">
                      Sami Mami
                    </p>
                    <p className="text-xs leading-[18px]">12 January 2028</p>
                  </div>
                </div>
              </div>
              <div className="testi-card flex flex-col bg-white p-5 gap-5 border border-[#E5E5E5] rounded-[20px] h-fit">
                <div className="flex">
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star-gray.svg" alt="star" />
                  </div>
                  <div className="flex shrink-0">
                    <img src="/assets/icons/Star-gray.svg" alt="star" />
                  </div>
                </div>
                <p className="line-clamp-2 hover:line-clamp-none leading-[28px]">
                  I do really love this product helped me to achieve my first
                  million Lorem ipsum dolor sit amet.
                </p>
                <div className="flex items-center gap-[10px]">
                  <div className="w-[50px] h-[50px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
                    <img
                      src="/assets/photos/p2.png"
                      className="w-full h-full object-cover rounded-full"
                      alt="photo"
                    />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-semibold text-sm leading-[22px]">
                      Baronia
                    </p>
                    <p className="text-xs leading-[18px]">12 January 2028</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[302px] flex flex-col shrink-0 gap-5 h-fit">
          <div className="w-full bg-white border border-[#E5E5E5] flex flex-col gap-[30px] p-[30px] rounded-3xl">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Brand New</p>
              <p className="font-bold text-[32px] leading-[48px]">
                Rp 56.500.000
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex shrink-0">
                  <img src="/assets/icons/tick-circle.svg" alt="icon" />
                </div>
                <p className="font-semibold">Peti telur packaging</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex shrink-0">
                  <img src="/assets/icons/tick-circle.svg" alt="icon" />
                </div>
                <p className="font-semibold">Manual book instructions</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex shrink-0">
                  <img src="/assets/icons/tick-circle.svg" alt="icon" />
                </div>
                <p className="font-semibold">Customer service 24/7</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex shrink-0">
                  <img src="/assets/icons/tick-circle.svg" alt="icon" />
                </div>
                <p className="font-semibold">Free delivery Jababeka</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex shrink-0">
                  <img src="/assets/icons/tick-circle.svg" alt="icon" />
                </div>
                <p className="font-semibold">Kwitansi orisinal 100%</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="cart.html"
                className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
              >
                Add to Cart
              </a>
              <a
                href=""
                className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
              >
                Save to Wishlist
              </a>
            </div>
          </div>
          <a href="">
            <div className="w-full bg-white border border-[#E5E5E5] flex items-center justify-between gap-2 p-5 rounded-3xl">
              <div className="flex items-center gap-[10px]">
                <div className="w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden">
                  <img src="/assets/icons/cake.svg" alt="icon" />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="font-semibold">Buy as a Gift</p>
                  <p className="text-sm">Free Delivery</p>
                </div>
              </div>
              <div className="flex shrink-0">
                <img src="/assets/icons/arrow-right.svg" alt="icon" />
              </div>
            </div>
          </a>
        </div>
      </div>
      <div
        id="recommedations"
        className="container max-w-[1130px] mx-auto flex flex-col gap-[30px] pb-[100px] mt-[70px]"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl leading-[34px]">
            Other Products <br /> You Might Need
          </h2>
        </div>
        <div className="grid grid-cols-5 gap-[30px]">
          <a href="" className="product-card">
            <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
              <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
                <img
                  src="/assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png"
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
          <a href="" className="product-card">
            <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
              <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
                <img
                  src="/assets/thumbnails/iphone15pro-digitalmat-gallery-3-202309-Photoroom 1.png"
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
          <a href="" className="product-card">
            <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
              <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
                <img
                  src="/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png"
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
          <a href="" className="product-card">
            <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
              <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
                <img
                  src="/assets/thumbnails/airpods-max-select-skyblue-202011-Photoroom 1.png"
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
          <a href="" className="product-card">
            <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
              <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
                <img
                  src="/assets/thumbnails/imac24-digitalmat-gallery-1-202310-Photoroom 1.png"
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
        </div>
      </div>
    </>
  );
}
