import type { AdminOrderColumn } from "@/app/(admin)/types"
import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { getImageUrl } from "@/lib/supabase"
import { prisma } from "lib/prisma"

function warnOrderFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

export async function getOrders(): Promise<AdminOrderColumn[]> {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    })

    return orders.map((order) => ({
      id: order.id,
      code: order.code,
      createdAt: order.created_at,
      customer_name: order.user?.name,
      customer_email: order.user?.email,
      price: Number(order.total),
      status: order.status,
      total_items: order.products.reduce((total, item) => total + item.quantity, 0),
      products: order.products.map((item) => ({
        name: item.product.name,
        image: getImageUrl(item.product.images[0] ?? "", "products"),
      })),
    }))
  } catch (error) {
    warnOrderFallback("Orders", error)
    return []
  }
}
