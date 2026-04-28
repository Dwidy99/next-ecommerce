"use client"

import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { CalendarDays, Package, ShoppingBag, UserRound } from "lucide-react"

import type { AdminOrderColumn } from "@/app/(admin)/types"
import { Badge } from "@/components/ui/badge"
import { dateFormat, rupiahFormat } from "@/lib/utils"

function orderStatusVariant(status: AdminOrderColumn["status"]) {
  if (status === "success") return "default"
  if (status === "pending") return "warning"
  if (status === "failed") return "destructive"

  return "secondary"
}

export const columns: ColumnDef<AdminOrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Order",
    cell: ({ row }) => {
      const order = row.original
      const firstProduct = order.products[0]
      const remainingProducts = Math.max(order.products.length - 1, 0)

      return (
        <div className="flex min-w-[320px] items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#FFF4CC] ring-1 ring-border">
            {firstProduct ? (
              <Image
                src={firstProduct.image}
                alt={firstProduct.name}
                width={56}
                height={56}
                className="h-full w-full object-contain p-1"
              />
            ) : (
              <Package className="h-5 w-5 text-[#110843]" />
            )}
          </div>
          <div className="min-w-0">
            <p className="max-w-[220px] truncate font-semibold text-foreground">
              #{order.code}
            </p>
            <p className="mt-1 max-w-[260px] truncate text-sm text-muted-foreground">
              {firstProduct?.name ?? "No product"}
              {remainingProducts > 0 && ` +${remainingProducts} more`}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "customer_name",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex min-w-[220px] items-center gap-2">
        <UserRound className="h-4 w-4 text-muted-foreground" />
        <div>
          <p className="font-medium">{row.original.customer_name ?? "Unknown"}</p>
          <p className="text-sm text-muted-foreground">
            {row.original.customer_email ?? "No email"}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "total_items",
    header: "Items",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ShoppingBag className="h-4 w-4" />
        {row.original.total_items} item(s)
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Total",
    cell: ({ row }) => (
      <span className="block min-w-[120px] font-semibold text-[#110843]">
        {rupiahFormat(row.original.price)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={orderStatusVariant(row.original.status)} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="flex min-w-[130px] items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        {dateFormat(row.original.createdAt)}
      </div>
    ),
  },
]
