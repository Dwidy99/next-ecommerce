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
            product_name: product.name, // ✅ ini wajib
            image_url: product.images[0] ?? "",
            category: product.category?.name ?? "",
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

export async function getProductById(id: number) {
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    } 
    // finally {console.log("getProductById() selesai dijalankan");}
}