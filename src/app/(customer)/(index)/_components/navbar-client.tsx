"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";
import SignOutButton from "../../(auth)/_components/sign-out-button";

export default function NavbarClient({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-3">
      {/* Cart */}
      <Link href="/carts">
        <div className="w-10 h-10 flex shrink-0 hover:scale-110 transition-transform duration-200">
          <img src="/assets/icons/cart.svg" alt="cart" />
        </div>
      </Link>

      {user && user.role === "customer" ? (
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
            className="p-[12px_20px] bg-white text-[#110843] rounded-full font-semibold hover:bg-[#FFF2B3] transition-all duration-200 shadow-sm"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="p-[12px_20px] bg-[#FFC736] text-[#110843] rounded-full font-semibold hover:bg-[#E6B800] transition-all duration-200 shadow-sm"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}
