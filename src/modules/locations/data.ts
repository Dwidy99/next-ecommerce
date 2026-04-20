import { prisma } from "lib/prisma"

export async function getLocations() {
  try {
    return await prisma.location.findMany({
      orderBy: {
        id: "desc",
      },
    })
  } catch (error) {
    console.error("Failed to load locations:", error)
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
    console.error("Failed to load location:", error)
    return null
  }
}
