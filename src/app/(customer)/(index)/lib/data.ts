import { getImageUrl } from "@/lib/supabase";
import { prisma } from "lib/prisma";

export async function getCategories() {
    try {
        return await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                images: true,
                category: {
                    select: { name: true },
                },
            },
        });

        return products.map((product) => ({
            ...product,
            image_url: getImageUrl(product.images[0], "products"),
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getBrands() {
    try {
        const brands = await prisma.brand.findMany({
            select: {
                id: true,
                logo: true,
            },
        });

        return brands.map((brand) => ({
            ...brand,
            logo_url: getImageUrl(brand.logo, "brands"),
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}