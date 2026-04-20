import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "../../../../../../lib/prisma"

function warnBrandFallback(source: string, error: unknown) {
    warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`);
}

export async function getBrands() {
    try {
        const brands = await prisma.brand.findMany({})

        return brands
    } catch (err) {
        warnBrandFallback("Brands", err);
        return []
    }
    // finally {}
}

export async function getBrandById(id: string) {
    try {
        const brand = prisma.brand.findFirst({
            where: {
                id: Number.parseInt(id)
            }
        })

        return brand
    } catch (err) {
        warnBrandFallback("Brand", err);
        return null
    }
    // finally {}
}
