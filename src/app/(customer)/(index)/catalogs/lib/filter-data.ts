import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "lib/prisma"

type FilterOption = {
  id: number
  name: string
}

function warnFilterFallback(source: string, error: unknown) {
  warnOnce(
    `${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`,
  )
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
    })
  } catch (error) {
    warnFilterFallback("Catalog brands", error)
    return []
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
    })
  } catch (error) {
    warnFilterFallback("Catalog categories", error)
    return []
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
    })
  } catch (error) {
    warnFilterFallback("Catalog locations", error)
    return []
  }
}
