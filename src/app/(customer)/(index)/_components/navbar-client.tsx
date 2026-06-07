"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignOutButton from "../../(auth)/_components/sign-out-button";
import SignInForm from "../../(auth)/sign-in/_components/sign-in-form";
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
  ChevronDown,
  X,
  Home,
  Layers,
  Newspaper,
  ReceiptText,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import type {
  NavbarCategoryItem,
  NavbarClientProps,
  NavbarSite,
  NavbarUser,
} from "@/app/(customer)/types";

export default function NavbarClient({
  user,
  categories,
  site,
}: NavbarClientProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <nav className="relative z-50 hidden rounded-xl bg-[#110843] text-white shadow-md md:my-4 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-8">
          <div className="flex items-center gap-8">
            <NavbarLogo site={site} />
            <NavbarLinks />
            <NavbarCategoriesMenu categories={categories} />
          </div>

          <div className="flex items-center gap-3">
            <NavbarCartButton />
            <NavbarAuthActions
              user={user}
              onOpenLogin={() => setLoginModalOpen(true)}
            />
          </div>
        </div>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-gray-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.08)] md:hidden">
        <div className="flex items-center justify-around px-1 py-2">
          <MobileNavItem
            href="/"
            icon={<Home className="h-6 w-6" />}
            label="Home"
          />
          <MobileNavItem
            href="/catalogs"
            icon={<ShoppingBag className="h-6 w-6" />}
            label="Shop"
          />
          <MobileNavItem
            href="/articles"
            icon={<Newspaper className="h-6 w-6" />}
            label="Articles"
          />
          <MobileCategoriesMenu categories={categories} />
          <MobileCartButton />
          <MobileAccountMenu
            user={user}
            onOpenLogin={() => setLoginModalOpen(true)}
          />
        </div>
      </nav>

      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}

function NavbarLogo({ site }: { site: NavbarSite }) {
  return (
    <Link href="/" className="flex items-center">
        <span className="rounded-full border border-[#FFD86E] bg-[#FFE9A3] p-0.5 shadow-[0_0_0_3px_rgba(255,199,54,0.16)]">
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
    { label: "Catalogs", href: "/catalogs" },
    { label: "Articles", href: "/articles" },
  ];

  return (
    <nav className="flex items-center gap-6 xl:gap-8">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative rounded-full px-1 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:text-[#FFC736]"
        >
          <span>{item.label}</span>
          <span className="absolute bottom-1 left-1 right-1 h-0.5 origin-left scale-x-0 rounded-full bg-[#FFC736] transition-transform duration-200 group-hover:scale-x-100" />
        </Link>
      ))}
    </nav>
  );
}

function NavbarCategoriesMenu({
  categories,
}: {
  categories: NavbarCategoryItem[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group relative rounded-full px-1 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:text-[#FFC736]"
        >
          <span>Categories</span>
          <span className="absolute bottom-1 left-1 right-1 h-0.5 origin-left scale-x-0 rounded-full bg-[#FFC736] transition-transform duration-200 group-hover:scale-x-100" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="max-h-80 w-56 overflow-y-auto rounded-xl border border-slate-200 bg-white"
      >
        <DropdownMenuLabel className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Browse Categories
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {categories.length > 0 ? (
          categories.map((category) => (
            <DropdownMenuItem key={category.id} asChild>
              <Link
                href={`/categories/${category.slug ?? category.id}`}
                className="group/category flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#FFF4CC] hover:text-[#110843] focus:bg-[#FFF4CC] focus:text-[#110843]"
              >
                {category.name}
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFC736] opacity-0 transition group-hover/category:opacity-100" />
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

function NavbarAuthActions({
  user,
  onOpenLogin,
}: {
  user: NavbarUser;
  onOpenLogin: () => void;
}) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenLogin}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#110843] transition hover:bg-[#FFF2B3]"
        >
          Sign In
        </button>
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
          type="button"
          variant="ghost"
          className="group h-11 rounded-full border border-white/15 bg-white/5 px-2.5 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FFC736]/80 hover:bg-white/10 hover:text-white hover:shadow-[0_10px_24px_rgba(255,199,54,0.16)] data-[state=open]:border-[#FFC736]/80 data-[state=open]:bg-white/10 data-[state=open]:text-white"
          aria-label={`Open account menu for ${user.name}`}
        >
          <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFC736] text-xs font-extrabold text-[#110843] ring-2 ring-white/10 transition group-hover:scale-105 group-data-[state=open]:scale-105">
            {initial}
          </span>
          <span className="max-w-28 truncate text-sm font-semibold">
            {user.name}
          </span>
          <ChevronDown className="ml-1 h-4 w-4 text-white/70 transition duration-200 group-hover:text-[#FFC736] group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#FFC736]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-2xl border border-slate-200 bg-white p-2 text-[#110843] shadow-2xl shadow-slate-950/10"
      >
        <DropdownMenuLabel className="rounded-xl bg-[#FFF7D6] px-3 py-3 text-slate-800">
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#B77900]">
            Signed in as
          </span>
          <span className="mt-1 block truncate text-sm font-bold text-[#110843]">
            {user.name}
          </span>
          <span className="block truncate text-xs font-normal text-slate-500">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 bg-slate-100" />

        <DropdownMenuItem asChild>
          <Link
            href="/user"
            className="group/item flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition focus:bg-[#FFF2B3] focus:text-[#110843] hover:bg-[#FFF2B3] hover:text-[#110843]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-hover/item:bg-[#FFC736] group-hover/item:text-[#110843]">
              <User className="h-4 w-4" />
            </span>
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/payment/purchase-history"
            className="group/item flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition focus:bg-[#FFF2B3] focus:text-[#110843] hover:bg-[#FFF2B3] hover:text-[#110843]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-hover/item:bg-[#FFC736] group-hover/item:text-[#110843]">
              <ReceiptText className="h-4 w-4" />
            </span>
            Purchase History
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 bg-slate-100" />
        <div className="px-1 pb-1">
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
      className="group flex flex-col items-center justify-center text-gray-600 transition hover:-translate-y-0.5 hover:text-[#110843]"
    >
      <span className="transition group-hover:scale-110">{icon}</span>
      <span className="mt-1 text-[11px] font-medium">{label}</span>
    </Link>
  );
}

function MobileCategoriesMenu({
  categories,
}: {
  categories: NavbarCategoryItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex flex-col items-center justify-center text-gray-600 transition hover:-translate-y-0.5 hover:text-[#110843]"
      >
        <Layers className="h-6 w-6 transition group-hover:scale-110" />
        <span className="mt-1 text-[11px] font-medium">Categories</span>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          <div className="absolute bottom-14 left-1/2 z-50 w-48 -translate-x-1/2 rounded-xl border border-slate-200 bg-white py-2 text-[#110843] shadow-xl">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug ?? category.id}`}
                  className="block rounded-lg px-4 py-2 text-[14px] transition hover:bg-[#FFF2B3] hover:pl-5 hover:text-[#110843]"
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

function MobileAccountMenu({
  user,
  onOpenLogin,
}: {
  user: NavbarUser;
  onOpenLogin: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex flex-col items-center justify-center text-gray-600 transition hover:-translate-y-0.5 hover:text-[#110843]"
      >
        <User className="h-6 w-6 transition group-hover:scale-110" />
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

          <div className="absolute bottom-14 left-1/2 z-50 w-48 -translate-x-1/2 rounded-xl border border-slate-200 bg-white py-2 text-[#110843] shadow-xl">
            {user ? (
              <>
                <Link
                  href="/user"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 transition hover:bg-[#FFF2B3] hover:pl-5"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </Link>

                <Link
                  href="/payment/purchase-history"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 transition hover:bg-[#FFF2B3] hover:pl-5"
                >
                  <ReceiptText className="h-4 w-4" />
                  Purchase History
                </Link>

                <div className="my-1 border-t border-slate-100" />

                <div className="px-2 py-1">
                  <SignOutButton onSignOutStart={() => setOpen(false)} />
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenLogin();
                  }}
                  className="block w-full rounded-lg px-4 py-2 text-left transition hover:bg-[#FFF2B3] hover:pl-5"
                >
                  Sign In
                </button>

                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-2 transition hover:bg-[#FFF2B3] hover:pl-5"
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

function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
      <button
        type="button"
        aria-label="Close sign in modal"
        onClick={onClose}
        className="absolute inset-0 bg-[#110843]/55 backdrop-blur-sm"
      />

      <section className="relative z-10 w-full max-w-md">
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC736] text-[#110843] shadow-lg transition hover:bg-[#ffda63]"
          aria-label="Close sign in modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto rounded-3xl">
          <SignInForm />
        </div>
      </section>
    </div>
  );
}
