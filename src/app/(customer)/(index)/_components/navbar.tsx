import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { getCustomerUser } from "@/lib/auth";
import { getSiteConfig } from "@/lib/seo/config";
import { getCategories } from "../lib/data";
import NavbarClient from "./navbar-client";
import type {
  NavbarCategoryItem,
  NavbarSite,
  NavbarSiteConfigSource,
  NavbarUser,
} from "@/app/(customer)/types";

function mapNavbarSite(siteConfig: NavbarSiteConfigSource): NavbarSite {
  return {
    webname: siteConfig.shortName || siteConfig.title || "Shopverse",
    logo: siteConfig.logo || null,
  };
}

function mapNavbarCategories(
  categories: Array<{ id: number; name: string; slug: string | null }>
): NavbarCategoryItem[] {
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
  }));
}

function mapNavbarUser(user: Awaited<ReturnType<typeof getCustomerUser>>["user"]): NavbarUser {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image ?? null,
  };
}

function NavbarFallback() {
  return (
    <nav className="relative z-50 hidden rounded-xl bg-[#110843] text-white shadow-md md:my-4 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <div className="h-12 w-36 animate-pulse rounded-full bg-white/15" />
        <div className="hidden items-center gap-4 md:flex">
          <div className="h-8 w-20 animate-pulse rounded-full bg-white/15" />
          <div className="h-8 w-20 animate-pulse rounded-full bg-white/15" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-white/15" />
        </div>
      </div>
    </nav>
  );
}

async function NavbarContent() {
  noStore();

  const { user } = await getCustomerUser();
  const categoriesData = await getCategories();
  const siteConfig = await getSiteConfig("ID");
  const site = mapNavbarSite(siteConfig);
  const categories = mapNavbarCategories(categoriesData);
  const navbarUser = mapNavbarUser(user);

  return (
    <NavbarClient user={navbarUser} categories={categories} site={site} />
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}
