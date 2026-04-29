import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "lib/prisma"

function warnConfigurationFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

// READ: Get all website configurations for the admin table.
export async function getConfigurations() {
  try {
    return await prisma.configuration.findMany({
      orderBy: { id: "asc" },
    })
  } catch (error) {
    warnConfigurationFallback("Configurations", error)
    return []
  }
}

// READ: Get one website configuration for the edit page.
export async function getConfigurationById(id: number) {
  try {
    return await prisma.configuration.findUnique({
      where: { id },
    })
  } catch (error) {
    warnConfigurationFallback("Configuration", error)
    return null
  }
}
