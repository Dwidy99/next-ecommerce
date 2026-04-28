import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "lib/prisma"

function warnBrandFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

export async function getBrands() {
  try {
    return await prisma.brand.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })
  } catch (error) {
    warnBrandFallback("Brands", error)
    return []
  }
}

export async function getBrandById(id: string) {
  const brandId = Number.parseInt(id)

  if (Number.isNaN(brandId)) {
    return null
  }

  try {
    return await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
    })
  } catch (error) {
    warnBrandFallback("Brand", error)
    return null
  }
}
