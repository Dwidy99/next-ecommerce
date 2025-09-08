import { prisma } from "lib/prisma";

export async function getBrands() {
    try {
        const brands = await prisma.brand.findMany({})

        return brands
    } catch (err) {
        console.log(err);
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
        console.log(err);
        return null
    } 
    // finally {}
}