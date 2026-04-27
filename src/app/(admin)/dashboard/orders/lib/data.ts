
import { prisma } from 'lib/prisma';
import { getImageUrl } from "@/lib/supabase";
import type { AdminOrderColumn } from "@/app/(admin)/types";

export async function getOrders() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })

        const response: AdminOrderColumn[] = orders.map((ord) => {
            return {
                id: ord.id,
                customer_name: ord.user?.name,
                price: Number(ord.total),
                status: ord.status,
                products: ord.products?.map((item) => {
                    return {
                        name: item.product.name,
                        image: getImageUrl(item.product.images[0], "products"),
                    }
                }),
            }
        })

        return response;
    } catch (err) {
        console.log(err);
        return []
    }
    // finally {}
}
