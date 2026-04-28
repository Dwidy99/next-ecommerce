import type { AdminCustomerColumn } from "@/app/(admin)/types"
import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "lib/prisma"

function warnCustomerFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

export async function getCustomers(): Promise<AdminCustomerColumn[]> {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "customer",
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    })

    return customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      createdAt: customer.created_at,
      total_transactions: customer._count.orders,
    }))
  } catch (error) {
    warnCustomerFallback("Customers", error)
    return []
  }
}
