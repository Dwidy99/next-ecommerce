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

export default async function Navbar() {
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
