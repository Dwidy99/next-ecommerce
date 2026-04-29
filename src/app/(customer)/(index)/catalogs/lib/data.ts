import { getErrorMessage, warnOnce } from "@/lib/error-message";
import type { FilterOption } from "@/app/(customer)/types";
import { prisma } from "lib/prisma";

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
