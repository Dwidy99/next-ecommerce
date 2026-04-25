import { getErrorMessage, warnOnce } from "@/lib/error-message";
import { getImageUrl } from "@/lib/supabase";
import type {
  CustomerBrandItem,
  CustomerCategoryItem,
  CustomerProductItem,
} from "@/app/(customer)/types";
import { prisma } from "lib/prisma";

// READ LIST
export async function getCategories(): Promise<CustomerCategoryItem[]> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return categories.map(mapCategoryItem);
  } catch (error) {
    warnDatabaseFallback("Categories", error);
    return [];
  }
}

export async function getProducts(): Promise<CustomerProductItem[]> {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
        category: {
          select: { name: true },
        },
      },
    });

    return products.map(mapProductItem);
  } catch (error) {
    warnDatabaseFallback("Products", error);
    return [];
  }
}

export async function getBrands(): Promise<CustomerBrandItem[]> {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        id: true,
        logo: true,
      },
    });

    return brands.map(mapBrandItem);
  } catch (error) {
    warnDatabaseFallback("Brands", error);
    return [];
  }
}

// MAPPERS
function mapCategoryItem(category: {
  id: number;
  name: string;
  slug: string | null;
  _count?: {
    products?: number;
  };
}): CustomerCategoryItem {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    productCount: category._count?.products ?? 0,
  };
}

function mapProductItem(product: {
  id: number;
  name: string;
  price: bigint | number;
  images: string[];
  category?: {
    name: string;
  } | null;
}): CustomerProductItem {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    image_url: getImageUrl(product.images?.[0] ?? "", "products"),
    category_name: product.category?.name ?? "Product",
  };
}

function mapBrandItem(brand: { id: number; logo: string }): CustomerBrandItem {
  return {
    id: brand.id,
    logo: brand.logo,
    logo_url: getImageUrl(brand.logo, "brands"),
  };
}

// ERROR HELPER
function warnDatabaseFallback(source: string, error: unknown) {
  warnOnce(
    `${source} unavailable, using empty fallback data. ${getErrorMessage(error, "Unknown database error")}`,
  );
}
