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
import { LogOut, Settings, User } from "lucide-react";
import SignOutButton from "../../(auth)/sign-out/page";

export default async function Navbar() {
  const { session, user } = await getUser();

  return (
    <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#110843] p-5 rounded-2xl shadow-md">
      {/* --- Logo --- */}
      <div className="flex shrink-0">
        <Link href="/">
          <img src="/assets/logos/logo.svg" alt="logo" className="w-auto h-8" />
        </Link>
      </div>

      {/* --- Menu --- */}
      <ul className="flex items-center gap-[30px]">
        {["Shop", "Categories", "Payments"].map((item) => (
          <li
            key={item}
            className="hover:text-[#FFC736] text-white transition-all duration-200"
          >
            <Link
              href={
                item === "Shop"
                  ? "/catalogs"
                  : item === "Categories"
                  ? "/categories"
                  : "/payment/purchase-history"
              }
              className="font-medium"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* --- Right Actions --- */}
      <div className="flex items-center gap-3">
        {/* Cart Icon */}
        <Link href="/carts">
          <div className="w-10 h-10 flex shrink-0 hover:scale-110 transition-transform duration-200">
            <img src="/assets/icons/cart.svg" alt="cart" />
          </div>
        </Link>

        {/* --- If user logged in --- */}
        {session && user.role === "customer" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 w-12 h-12 rounded-full border border-[#E5E5E5]/30 hover:border-[#FFC736]/60 hover:ring-2 hover:ring-[#FFC736]/40 transition-all duration-200"
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
              className="w-48 rounded-xl border border-gray-200 shadow-lg bg-white"
            >
              <DropdownMenuLabel className="font-semibold text-gray-800">
                Hi, {user.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-[#110843] cursor-pointer"
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 text-gray-700 hover:text-[#110843] cursor-pointer"
                >
                  <Settings className="w-4 h-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="text-red-600 hover:text-red-700 cursor-pointer"
              >
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="p-[12px_20px] bg-white text-[#110843] rounded-full font-semibold hover:bg-[#FFF2B3] hover:text-[#110843] transition-all duration-200 shadow-sm"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="p-[12px_20px] bg-[#FFC736] text-[#110843] rounded-full font-semibold hover:bg-[#E6B800] hover:text-[#110843] transition-all duration-200 shadow-sm"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
