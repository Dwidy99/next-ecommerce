import { getUser } from "@/lib/auth";
import { getSiteConfig } from "@/lib/seo/config";
import { getCategories } from "../lib/data";
import NavbarClient from "./navbar-client";

type NavbarCategoryItem = {
  id: number;
  name: string;
  slug: string | null;
};

type NavbarUser = {
  id: number;
  name: string;
  email: string;
  role: "customer" | "superadmin";
  image: string | null;
} | null;

type NavbarSite = {
  webname: string;
  logo: string | null;
};

function mapNavbarSite(siteConfig: {
  shortName?: string | null;
  title?: string | null;
  logo?: string | null;
}): NavbarSite {
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

function mapNavbarUser(user: Awaited<ReturnType<typeof getUser>>["user"]): NavbarUser {
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
  const { user } = await getUser();
  const categoriesData = await getCategories();
  const siteConfig = await getSiteConfig("ID");
  const site = mapNavbarSite(siteConfig);
  const categories = mapNavbarCategories(categoriesData);
  const navbarUser = mapNavbarUser(user);

  return (
    <NavbarClient user={navbarUser} categories={categories} site={site} />
  );
}
