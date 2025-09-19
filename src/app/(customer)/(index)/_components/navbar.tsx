import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-5 rounded-3xl">
      <div className="flex shrink-0">
        <img src="assets/logos/logo.svg" alt="icon" />
      </div>
      <ul className="flex items-center gap-[30px]">
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 font-bold text-[#FFC736]">
          <Link href="index.html">Shop</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="">Categories</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="">Testimonials</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="">Rewards</Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        <Link href="cart.html">
          <div className="w-12 h-12 flex shrink-0">
            <img src="assets/icons/cart.svg" alt="icon" />
          </div>
        </Link>
        <Link
          href="sign-in"
          className="p-[12px_20px] bg-white rounded-full font-semibold"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="p-[12px_20px] bg-white rounded-full font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
