import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "lib/prisma"

function warnLocationFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

export async function getLocations() {
  try {
    return await prisma.location.findMany({
      orderBy: {
        id: "desc",
      },
    })
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
