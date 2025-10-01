// src/app/(customer)/(index)/carts/page.tsx
import Navbar from "../_components/navbar";
import CartClient from "./_components/cart-client";

export default function CartsPage() {
  return (
    <>
      <header className="bg-[#FFF9D9] pt-[30px] h-[351px] -mb-[181px]">
        <Navbar />
      </header>

      <CartClient />
    </>
  );
}
