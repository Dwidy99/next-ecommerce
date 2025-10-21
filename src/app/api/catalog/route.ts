import { TFilter } from "@/hooks/useFilter";
import { getImageUrl } from "@/lib/supabase";
import { TProduct } from "@/types";
import { prisma } from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
    try {
        const res = (await request.json()) as TFilter;

        // 🟢 1️⃣ Price filter (gunakan cast aman agar tidak error spread)
        const priceFilter: Prisma.ProductWhereInput = {};
        const price: Record<string, number> = {};

        if (res.minPrice && res.minPrice > 0) {
            price.gte = res.minPrice;
        }
        if (res.maxPrice && res.maxPrice > 0) {
            price.lte = res.maxPrice;
        }

        if (Object.keys(price).length > 0) {
            priceFilter.price = price;
        }

        // 🟢 2️⃣ Stock filter
        const stockFilter: Prisma.ProductWhereInput = {};
        if (res.stock && res.stock.length > 0) {
            stockFilter.stock = { in: res.stock };
        }

        // 🟢 3️⃣ Search filter
        const searchFilter: Prisma.ProductWhereInput = {};
        if (res.search && res.search.trim() !== "") {
            searchFilter.name = {
                contains: res.search.trim(),
                mode: "insensitive",
            };
        }

        // 🟢 4️⃣ Brand / Category / Location
        const brandFilter: Prisma.ProductWhereInput = {};
        if (res.brands && res.brands.length > 0) {
            brandFilter.brand = { id: { in: res.brands } };
        }

        const categoryFilter: Prisma.ProductWhereInput = {};
        if (res.categories && res.categories.length > 0) {
            categoryFilter.category = { id: { in: res.categories } };
        }

        const locationFilter: Prisma.ProductWhereInput = {};
        if (res.locations && res.locations.length > 0) {
            locationFilter.location = { id: { in: res.locations } };
        }

        // 🟢 5️⃣ Gabungkan semua filter dengan AND
        const whereClause: Prisma.ProductWhereInput = {
            AND: [
                priceFilter,
                stockFilter,
                searchFilter,
                brandFilter,
                categoryFilter,
                locationFilter,
            ],
        };

        // 🟢 6️⃣ Ambil data produk
        const products = await prisma.product.findMany({
            where: whereClause,
            select: {
                id: true,
                name: true,
                images: true,
                price: true,
                category: {
                    select: { name: true },
                },
            },
            orderBy: { created_at: "desc" },
        });

        // 🟢 7️⃣ Mapping hasil ke TProduct
        const response: TProduct[] = products.map((product) => ({
            id: product.id,
            name: product.name,
            category_name: product.category.name,
            image_url: getImageUrl(product.images[0], "products"),
            price: Number(product.price),
        }));

        return Response.json(response);
    } catch (err) {
        console.error("[/api/catalog] Error:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
