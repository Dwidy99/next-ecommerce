import { prisma } from "lib/prisma";
import { TColumn } from "../columns";

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { name: 'asc' },
            select: { 
                    id: true, 
                    _count: {
                        select: {
                            orders: true
                        }
                },
                name: true,
                created_at: true,
                price: true,
                stock: true,
                category: {
                    select: {
                        name: true
                    }
                },
                brand: {
                    select: {
                        name: true
                    }
                },
                location: {
                    select: {
                        name: true
                    }
                },
                images: true
            }
        })

        const response_products: TColumn[] = products.map((product) => ({
            id: product.id,
            name: product.name,
            image_url: product.images[0] ?? "",
            category: product.category?.name ?? "",
            brand_name: product.brand?.name ?? "",
            price: Number(product.price),
            total_sales: product._count.orders,
            stock: product.stock,
            createdAt: product.created_at,
        }));
        
        return response_products
    } catch (err) {
        console.error(err)

        return []
    } 
    // finally {}
}