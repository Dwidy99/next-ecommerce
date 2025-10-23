import Navbar from "../_components/navbar";
import CartClient from "./_components/cart-client";

export default function CartsPage() {
  return (
    <>
      <header className="bg-[#FFF9D9] pt-[30px] h-[280px] md:h-[351px] -mb-[150px] md:-mb-[181px] py-8 sm:py-1 px-4 sm:px-8 lg:px-16">
        <Navbar />
      </header>
      <CartClient />
    </>
  );
}
