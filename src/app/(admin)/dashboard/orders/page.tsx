import { ClipboardList, Clock3, PackageCheck, ShoppingBag, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import type { AdminOrderColumn } from "@/app/(admin)/types"
import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { getImageUrl } from "@/lib/supabase"
import { prisma } from "lib/prisma"
import { columns } from "./columns"

function warnOrderFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

async function getOrders(): Promise<AdminOrderColumn[]> {
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

export default async function OrderPage() {
  const orders = await getOrders()
  const successOrders = orders.filter((order) => order.status === "success").length
  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const totalItems = orders.reduce((total, order) => total + order.total_items, 0)

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              Order Management
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Track customer orders and payment status clearly.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Review purchases, customers, total value, and order status from a
              responsive admin table.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{orders.length}</p>
                  <p className="text-xs text-white/65">Total Orders</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <PackageCheck className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{successOrders}</p>
                  <p className="text-xs text-white/65">Paid Orders</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{pendingOrders}</p>
                  <p className="text-xs text-white/65">Pending Orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#d99000]" />
              Orders
            </CardTitle>
            <CardDescription>
              {totalItems} item(s) sold across all recorded orders.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <p className="text-xs text-muted-foreground md:hidden">
              Swipe the table sideways to see customer, total, status, and date.
            </p>
            <DataTable
              columns={columns}
              data={orders}
              className="max-w-[calc(100vw-2rem)] md:max-w-full"
              tableClassName="min-w-[960px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
