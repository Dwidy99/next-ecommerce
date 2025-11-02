"use client";

import React, { useState } from "react";
import Link from "next/link";
import SignOutButton from "../../(auth)/_components/sign-out-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  ShoppingBag,
  Layers,
  CreditCard,
  ShoppingCart,
  LogOut,
} from "lucide-react";

export default function NavbarClient({
  user,
  categories,
}: {
  user: any;
  categories: { id: number; name: string; slug: string | null }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🟣 DESKTOP / TABLET NAVBAR */}
      <nav className="hidden md:block rounded-xl md:my-16 bg-[#110843] text-white shadow-md relative z-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/logos/logos.svg"
              alt="logo"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Menu */}
          <ul className="flex items-center gap-8 font-medium">
            <li className="hover:text-[#FFC736] transition-all">
              <Link href="/catalogs">Shop</Link>
            </li>

            <li className="relative group cursor-pointer">
              <span className="hover:text-[#FFC736]">Categories</span>
              <ul className="absolute left-0 top-[100%] hidden group-hover:flex flex-col bg-white text-[#110843] rounded-lg shadow-md border border-gray-100 min-w-[160px] py-2 z-50">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/categories/${cat.slug ?? cat.id}`}
                        className="block px-4 py-2 text-[15px] hover:bg-[#FFF2B3] rounded-md"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    No categories
                  </li>
                )}
              </ul>
            </li>

            <li className="hover:text-[#FFC736]">
              <Link href="/payment/purchase-history">Payments</Link>
            </li>
          </ul>

          <NavbarRight user={user} />
        </div>
      </nav>

      {/* 🟡 MOBILE BOTTOM NAVBAR */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.08)] rounded-t-2xl z-50">
        <div className="flex justify-around items-center py-2 px-1">
          <BottomNavItem href="/catalogs" icon={<ShoppingBag />} label="Shop" />
          <BottomNavDropdown categories={categories} />
          <BottomNavItem
            href="/payment/purchase-history"
            icon={<CreditCard />}
            label="Payments"
          />
          <BottomNavItem href="/carts" icon={<ShoppingCart />} label="Cart" />
          <BottomNavProfile user={user} />
        </div>
      </nav>
    </>
  );
}

/* ===========================================================
   ✅ DESKTOP NAV RIGHT SECTION
   =========================================================== */
function NavbarRight({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-3">
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
                href="/user"
                className="flex items-center gap-2 text-gray-700 hover:text-[#110843]"
              >
                <User className="w-4 h-4" /> Profile
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
            className="p-[10px_16px] bg-white text-[#110843] rounded-full font-semibold hover:bg-[#FFF2B3] transition"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="p-[10px_16px] bg-[#FFC736] text-[#110843] rounded-full font-semibold hover:bg-[#E6B800] transition"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}

/* ===========================================================
   ✅ MOBILE NAV ITEMS
   =========================================================== */
function BottomNavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center text-gray-600 hover:text-[#110843] transition"
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="text-[11px] mt-1 font-medium">{label}</span>
    </Link>
  );
}

/* ===========================================================
   ✅ MOBILE: CATEGORY DROPDOWN
   =========================================================== */
function BottomNavDropdown({
  categories,
}: {
  categories: { id: number; name: string; slug: string | null }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col items-center justify-center text-gray-600 hover:text-[#110843] transition"
      >
        <Layers className="w-6 h-6" />
        <span className="text-[11px] mt-1 font-medium">Categories</span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-white text-[#110843] rounded-xl shadow-xl border border-gray-200 z-50 w-[180px] py-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug ?? cat.id}`}
                className="block px-4 py-2 text-[14px] hover:bg-[#FFF2B3] transition"
                onClick={() => setOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ===========================================================
   ✅ MOBILE: PROFILE DROPDOWN
   =========================================================== */
function BottomNavProfile({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col items-center justify-center text-gray-600 hover:text-[#110843] transition"
      >
        <User className="w-6 h-6" />
        <span className="text-[11px] mt-1 font-medium">
          {user ? "Profile" : "Sign In"}
        </span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-white text-[#110843] shadow-xl border border-gray-200 z-50 w-[180px] py-2">
            {user ? (
              <>
                <Link
                  href="/user"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-[#FFF2B3]"
                >
                  My Profile
                </Link>
                <Link
                  href="/payment/purchase-history"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-[#FFF2B3]"
                >
                  My Orders
                </Link>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => {
                    setOpen(false);
                    const form = document.querySelector(
                      "form#signout"
                    ) as HTMLFormElement | null;
                    form?.requestSubmit();
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="inline w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-[#FFF2B3]"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 hover:bg-[#FFF2B3]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
