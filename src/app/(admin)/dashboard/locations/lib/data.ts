import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "lib/prisma"

function warnLocationFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

export async function getLocations() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        _count: {
          select: {
            Product: true,
          },
        },
      },
    })

    return locations.map((location) => ({
      ...location,
      _count: {
        products: location._count.Product,
      },
    }))
  } catch (error) {
    warnLocationFallback("Locations", error)
    return []
  }
}

export async function getLocationById(id: string) {
  const locationId = Number.parseInt(id)

  if (Number.isNaN(locationId)) {
    return null
  }

  try {
    return await prisma.location.findUnique({
      where: {
        id: locationId,
      },
    })
  } catch (error) {
    warnLocationFallback("Location", error)
    return null
  }
}
