import { getImageUrl } from "@/lib/supabase";
import { prisma } from "lib/prisma";

export async function getCategories() {
    try {
        // Simulasi delay 2 detik
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        products: true
                    }
                }
            }
        })

        return categories
    } catch (err) {
        console.log(err)
        return []
    }
    // finally { }
}


export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            select: {
                images: true,
                id: true,
                name: true,
                price: true,
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const response = products.map((product) => {
            return {
                ...product,
                image_url: getImageUrl(product.images[0], "products")
            }
        })

        return response
    } catch (err) {
        console.log(err)
        return []
    }
    // finally {}
}

export async function getBrands() {
    try {
        const brands = await prisma.brand.findMany({
            select: {
                id: true,
                logo: true,
            }
        })

        const response = brands.map((brand) => {
            return {
                ...brand,
                logo_url: getImageUrl(brand.logo, "brands")
            }
        })

        return response;
    } catch (err) {
        console.log(err)
        return [];
    }
    // finally {}
}