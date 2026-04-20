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

type NavbarUser = {
  name: string;
  role: string;
} | null;

type NavbarCategory = {
  id: number;
  name: string;
  slug: string | null;
};

interface NavbarClientProps {
  user: NavbarUser;
  categories: NavbarCategory[];
}

export default function NavbarClient({ user, categories }: NavbarClientProps) {
  return (
    <>
      {/* Desktop / Tablet Navbar */}
      <nav className="relative z-50 hidden rounded-xl bg-[#110843] text-white shadow-md md:my-4 md:block">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/logos/logos.svg"
              alt="logo"
              className="h-9 w-auto object-contain sm:h-10"
            />
          </Link>

          <ul className="flex items-center gap-8 font-medium">
            <li className="transition-all hover:text-[#FFC736]">
              <Link href="/catalogs">Shop</Link>
            </li>

            <li className="group relative cursor-pointer">
              <span className="hover:text-[#FFC736]">Categories</span>

              <ul className="absolute left-0 top-full z-50 hidden min-w-[160px] flex-col rounded-lg border border-gray-100 bg-white py-2 text-[#110843] shadow-md group-hover:flex">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/categories/${cat.slug ?? cat.id}`}
                        className="block rounded-md px-4 py-2 text-[15px] hover:bg-[#FFF2B3]"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500">
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

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-gray-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.08)] md:hidden">
        <div className="flex items-center justify-around px-1 py-2">
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

function NavbarRight({ user }: { user: NavbarUser }) {
  return (
    <div className="flex items-center gap-3">
      <Link href="/carts">
        <div className="flex h-10 w-10 shrink-0 transition-transform duration-200 hover:scale-110">
          <img src="/assets/icons/cart.svg" alt="cart" />
        </div>
      </Link>

      {user && user.role === "customer" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 w-12 rounded-full border border-[#E5E5E5]/30 p-0 transition-all duration-200 hover:border-[#FFC736]/60 hover:ring-2 hover:ring-[#FFC736]/40"
            >
              <img
                src="/assets/photos/p4.png"
                className="h-full w-full rounded-full object-cover"
                alt="photo"
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-48 rounded-xl border border-gray-200 bg-white shadow-lg"
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
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              asChild
              className="cursor-pointer text-red-600 hover:text-red-700"
            >
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link
            href="/sign-in"
            className="rounded-full bg-white px-[10px] py-[10px] font-semibold text-[#110843] transition hover:bg-[#FFF2B3]"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-full bg-[#FFC736] px-[10px] py-[10px] font-semibold text-[#110843] transition hover:bg-[#E6B800]"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}

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
      className="flex flex-col items-center justify-center text-gray-600 transition hover:text-[#110843]"
    >
      <div className="h-6 w-6">{icon}</div>
      <span className="mt-1 text-[11px] font-medium">{label}</span>
    </Link>
  );
}

function BottomNavDropdown({ categories }: { categories: NavbarCategory[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex flex-col items-center justify-center text-gray-600 transition hover:text-[#110843]"
      >
        <Layers className="h-6 w-6" />
        <span className="mt-1 text-[11px] font-medium">Categories</span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          <div className="absolute bottom-14 left-1/2 z-50 w-[180px] -translate-x-1/2 rounded-xl border border-gray-200 bg-white py-2 text-[#110843] shadow-xl">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug ?? cat.id}`}
                  className="block px-4 py-2 text-[14px] transition hover:bg-[#FFF2B3]"
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No categories
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function BottomNavProfile({ user }: { user: NavbarUser }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex flex-col items-center justify-center text-gray-600 transition hover:text-[#110843]"
      >
        <User className="h-6 w-6" />
        <span className="mt-1 text-[11px] font-medium">
          {user ? "Profile" : "Sign In"}
        </span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          <div className="absolute bottom-14 left-1/2 z-50 w-[180px] -translate-x-1/2 border border-gray-200 bg-white py-2 text-[#110843] shadow-xl">
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

                <div className="my-1 border-t border-gray-100" />

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    const form = document.querySelector(
                      "form#signout",
                    ) as HTMLFormElement | null;
                    form?.requestSubmit();
                  }}
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-2 inline h-4 w-4" />
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
