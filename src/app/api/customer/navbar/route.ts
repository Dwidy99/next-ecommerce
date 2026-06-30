import { NextResponse } from "next/server";
import { getCustomerUser } from "@/lib/auth";
import { getSiteConfig } from "@/lib/seo/config";
import { getCategories } from "@/app/(customer)/(index)/lib/data";
import type {
  NavbarCategoryItem,
  NavbarClientProps,
  NavbarSite,
  NavbarSiteConfigSource,
  NavbarUser,
} from "@/app/(customer)/types";

export const dynamic = "force-dynamic";

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

function mapNavbarUser(
  user: Awaited<ReturnType<typeof getCustomerUser>>["user"]
): NavbarUser {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image ?? null,
  };
}

export async function GET() {
  const [{ user }, categoriesData, siteConfig] = await Promise.all([
    getCustomerUser(),
    getCategories(),
    getSiteConfig("ID"),
  ]);

  const payload: NavbarClientProps = {
    user: mapNavbarUser(user),
    categories: mapNavbarCategories(categoriesData),
    site: mapNavbarSite(siteConfig),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
