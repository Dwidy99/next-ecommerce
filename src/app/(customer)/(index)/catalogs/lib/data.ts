import { getErrorMessage, warnOnce } from "@/lib/error-message";
import type { FilterOption } from "@/app/(customer)/types";
import { prisma } from "lib/prisma";

export type CatalogHeroContent = {
  label: string;
  title: string;
  description: string;
  image: string;
};

const fallbackCatalogHero: CatalogHeroContent = {
  label: "Product Catalog",
  title: "Find the right gadget without digging through noise.",
  description:
    "Filter by price, stock, brand, location, and category with a cleaner catalog experience that still fits Shopverse.",
  image: "/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png",
};

// READ: Get dynamic catalog hero banner from unified content sections.
export async function getCatalogHero(): Promise<CatalogHeroContent> {
  try {
    const section = await prisma.contentSection.findFirst({
      where: {
        key: "catalog_hero",
        is_active: true,
      },
      select: {
        title: true,
        description: true,
        items: {
          where: { is_active: true },
          orderBy: [{ sort_order: "asc" }, { id: "asc" }],
          take: 1,
          select: {
            label: true,
            title: true,
            description: true,
            image: true,
          },
        },
      },
    });

    const item = section?.items[0];

    return {
      label: item?.label ?? "Product Catalog",
      title: item?.title ?? section?.title ?? fallbackCatalogHero.title,
      description:
        item?.description ??
        section?.description ??
        fallbackCatalogHero.description,
      image: item?.image ?? fallbackCatalogHero.image,
    };
  } catch (error) {
    warnFilterFallback("Catalog hero", error);
    return fallbackCatalogHero;
  }
}

// READ: Get brand options for catalog filters.
export async function getFilterBrands(): Promise<FilterOption[]> {
  try {
    return await prisma.brand.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    warnFilterFallback("Catalog brands", error);
    return [];
  }
}

// READ: Get category options for catalog filters.
export async function getFilterCategories(): Promise<FilterOption[]> {
  try {
    return await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    warnFilterFallback("Catalog categories", error);
    return [];
  }
}

// READ: Get location options for catalog filters.
export async function getFilterLocations(): Promise<FilterOption[]> {
  try {
    return await prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    warnFilterFallback("Catalog locations", error);
    return [];
  }
}

// ERROR HELPER
function warnFilterFallback(source: string, error: unknown) {
  warnOnce(
    `${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`,
  );
}
