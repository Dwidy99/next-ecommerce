import { TFilter } from "@/hooks/useFilter";
import { getErrorMessage, warnOnce } from "@/lib/error-message";
import { TProduct } from "@/types";
import { prisma } from "lib/prisma";

type FilterOption = {
  id: number;
  name: string;
};

function warnFilterFallback(source: string, error: unknown) {
  warnOnce(
    `${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`,
  );
}

export async function fetchProduct(body?: TFilter): Promise<TProduct[]> {
  try {
    const res = await fetch("/api/catalog", {
      method: "POST",
      body: JSON.stringify(body ?? {}),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`[fetchProduct] Catalog API unavailable: ${res.statusText}`);
      return [];
    }

    const data: TProduct[] = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown fetch error";
    console.warn(`[fetchProduct] Using empty fallback data. ${message}`);
    return [];
  }
}

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
