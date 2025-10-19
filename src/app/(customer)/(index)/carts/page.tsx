import Navbar from "../_components/navbar";
import CartClient from "./_components/cart-client";

export default function CartsPage() {
  return (
    <>
      <header className="bg-[#FFF9D9] pt-[30px] h-[280px] md:h-[351px] -mb-[150px] md:-mb-[181px]">
        <Navbar />
      </header>
      <CartClient />
    </>
  );
}
