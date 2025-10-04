import { getUser } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default async function Navbar() {
  const { session, user } = await getUser();

  return (
    <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#110843] p-5 rounded-2xl">
      {/* --- Logo --- */}
      <div className="flex shrink-0">
        <Link href="/">
          <img src="/assets/logos/logo.svg" alt="icon" className="w-auto h-8" />
        </Link>
      </div>

      {/* --- Menu --- */}
      <ul className="flex items-center gap-[30px]">
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="/catalogs">Shop</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="/categories">Categories</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="/payment/purchase-history">Payments</Link>
        </li>
      </ul>

      {/* --- Actions (Right side) --- */}
      <div className="flex items-center gap-3">
        <Link href="/carts">
          <div className="w-10 h-10 flex shrink-0 hover:scale-105 transition-transform">
            <img src="/assets/icons/cart.svg" alt="cart" />
          </div>
        </Link>

        {/* --- If user logged in --- */}
        {session && user.role === "customer" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 w-12 h-12 rounded-full border border-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736]/50 transition"
              >
                <img
                  src="/assets/photos/p4.png"
                  className="w-full h-full object-cover rounded-full"
                  alt="photo"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-48 rounded-xl border border-gray-200 shadow-md bg-white"
            >
              <DropdownMenuLabel className="font-semibold text-gray-800">
                Hi, {user.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  💳 Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="text-red-600 hover:text-red-700"
              >
                <Link
                  href="/sign-out"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  🚪 Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="p-[12px_20px] bg-white rounded-full font-semibold hover:bg-[#FFC736] hover:text-[#110843] transition"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="p-[12px_20px] bg-[#FFC736] rounded-full font-semibold hover:bg-[#FFD863] transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
