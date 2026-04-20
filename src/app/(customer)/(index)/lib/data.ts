import { getImageUrl } from "@/lib/supabase";
import { getErrorMessage, warnOnce } from "@/lib/error-message";
import { prisma } from "lib/prisma";

function warnDatabaseFallback(source: string, error: unknown) {
    warnOnce(
        `${source} unavailable, using empty fallback data. ${getErrorMessage(error, "Unknown database error")}`,
    );
}

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
        warnDatabaseFallback("Categories", error);
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
        warnDatabaseFallback("Products", error);
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
        warnDatabaseFallback("Brands", error);
        return [];
    }
}
