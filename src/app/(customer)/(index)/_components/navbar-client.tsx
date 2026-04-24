"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Home,
  Layers,
  ReceiptText,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";

type NavbarUser = {
  id: number;
  name: string;
  email: string;
  role: "customer" | "superadmin";
  image?: string | null;
} | null;

type NavbarCategory = {
  id: number;
  name: string;
  slug: string | null;
};

type NavbarSite = {
  webname: string;
  logo?: string | null;
};

interface NavbarClientProps {
  user: NavbarUser;
  categories: NavbarCategory[];
  site: NavbarSite;
}

export default function NavbarClient({
  user,
  categories,
  site,
}: NavbarClientProps) {
  return (
    <>
      <nav className="relative z-50 hidden rounded-xl bg-[#110843] text-white shadow-md md:my-4 md:block">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-3 lg:px-8">
          <div className="flex items-center gap-8">
            <NavbarLogo site={site} />
            <NavbarLinks />
            <NavbarCategoriesMenu categories={categories} />
          </div>

          <div className="flex items-center gap-3">
            <NavbarCartButton />
            <NavbarAuthActions user={user} />
          </div>
        </div>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-gray-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.08)] md:hidden">
        <div className="flex items-center justify-around px-1 py-2">
          <MobileNavItem href="/" icon={<Home className="h-6 w-6" />} label="Home" />
          <MobileNavItem
            href="/catalogs"
            icon={<ShoppingBag className="h-6 w-6" />}
            label="Shop"
          />
          <MobileCategoriesMenu categories={categories} />
          <MobileCartButton />
          <MobileAccountMenu user={user} />
        </div>
      </nav>
    </>
  );
}

function NavbarLogo({ site }: { site: NavbarSite }) {
  return (
    <Link href="/" className="flex items-center">
      <span className="rounded-full border border-[#FFD86E] bg-[#FFE9A3] p-[2px] shadow-[0_0_0_3px_rgba(255,199,54,0.16)]">
        <span className="flex min-h-12 items-center justify-center rounded-full bg-[#110843] px-4 py-2">
          <Image
            src="/assets/logos/logos.svg"
            alt={site.webname}
            width={118}
            height={31}
            className="h-8 w-auto object-contain sm:h-9"
          />
        </span>
      </span>
    </Link>
  );
}

function NavbarLinks() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Catalogs", href: "/catalogs" },
  ];

  return (
    <nav className="flex items-center gap-6 xl:gap-8">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-semibold text-white transition hover:text-[#FFC736]"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function NavbarCategoriesMenu({
  categories,
}: {
  categories: NavbarCategory[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="text-sm font-semibold text-white transition hover:text-[#FFC736]"
        >
          Categories
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="max-h-[320px] w-56 overflow-y-auto rounded-xl border border-slate-200 bg-white"
      >
        <DropdownMenuLabel className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Browse Categories
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {categories.length > 0 ? (
          categories.map((category) => (
            <DropdownMenuItem key={category.id} asChild>
              <Link href={`/categories/${category.slug ?? category.id}`}>
                {category.name}
              </Link>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No categories</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavbarCartButton() {
  return (
    <Link
      href="/carts"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-[#FFC736]/70 hover:bg-white/10"
    >
      <Image
        src="/assets/icons/cart.svg"
        alt="Cart"
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
      />
    </Link>
  );
}

function NavbarAuthActions({ user }: { user: NavbarUser }) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#110843] transition hover:bg-[#FFF2B3]"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-full bg-[#FFC736] px-4 py-2 text-sm font-semibold text-[#110843] transition hover:bg-[#E6B800]"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return <NavbarAccountMenu user={user} />;
}

function NavbarAccountMenu({ user }: { user: Exclude<NavbarUser, null> }) {
  const initial = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-11 rounded-full border border-white/15 bg-white/5 px-3 text-white transition hover:border-[#FFC736]/70 hover:bg-white/10 hover:text-white"
        >
          <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFC736] text-xs font-bold text-[#110843]">
            {initial}
          </span>
          <span className="max-w-[110px] truncate text-sm font-semibold">
            {user.name}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-52 rounded-xl border border-slate-200 bg-white"
      >
        <DropdownMenuLabel className="text-slate-800">
          Hi, {user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/user" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/payment/purchase-history"
            className="flex items-center gap-2"
          >
            <ReceiptText className="h-4 w-4" />
            Purchase History
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <div className="px-2 py-1">
          <SignOutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileNavItem({
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
      {icon}
      <span className="mt-1 text-[11px] font-medium">{label}</span>
    </Link>
  );
}

function MobileCategoriesMenu({ categories }: { categories: NavbarCategory[] }) {
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

          <div className="absolute bottom-14 left-1/2 z-50 w-[190px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white py-2 text-[#110843] shadow-xl">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug ?? category.id}`}
                  className="block px-4 py-2 text-[14px] transition hover:bg-[#FFF2B3]"
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-slate-500">
                No categories
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function MobileCartButton() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        href="/carts"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-600 transition hover:border-[#FFC736] hover:bg-[#FFF9E0] hover:text-[#110843]"
      >
        <ShoppingCart className="h-5 w-5" />
      </Link>
      <span className="mt-1 text-[11px] font-medium text-gray-600">Cart</span>
    </div>
  );
}

function MobileAccountMenu({ user }: { user: NavbarUser }) {
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
          {user ? "Account" : "Sign In"}
        </span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          <div className="absolute bottom-14 left-1/2 z-50 w-[190px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white py-2 text-[#110843] shadow-xl">
            {user ? (
              <>
                <Link
                  href="/user"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-[#FFF2B3]"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </Link>

                <Link
                  href="/payment/purchase-history"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-[#FFF2B3]"
                >
                  <ReceiptText className="h-4 w-4" />
                  Purchase History
                </Link>

                <div className="my-1 border-t border-slate-100" />

                <div className="px-2 py-1">
                  <SignOutButton />
                </div>
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
