import { getUser } from "@/lib/auth";
import { getSiteConfig } from "@/lib/seo/config";
import { getCategories } from "../lib/data";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  const { user } = await getUser();
  const categoriesData = await getCategories();
  const siteConfig = await getSiteConfig("ID");

  const site = {
    webname: siteConfig.shortName || siteConfig.title || "Shopverse",
    logo: siteConfig.logo || null,
  };

  const categories = categoriesData.map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
  }));

  const navbarUser = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image ?? null,
      }
    : null;

  return (
    <NavbarClient
      user={navbarUser}
      categories={categories}
      site={site}
    />
  );
}
