"use client"

import Image from "next/image"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, MapPin, Package, ShoppingBag, Tag } from "lucide-react"

import type { AdminProductTableItem } from "@/app/(admin)/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/supabase"
import { dateFormat, rupiahFormat } from "@/lib/utils"
import DeleteDialog from "../_components/delete-dialog"
import { deleteProduct } from "./lib/actions"

function stockVariant(stock: AdminProductTableItem["stock"]) {
  return stock === "ready" ? "default" : "warning"
}

export const columns: ColumnDef<AdminProductTableItem>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original

      return (
        <div className="flex min-w-[320px] items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#FFF4CC] ring-1 ring-border">
            <Image
              src={product.image_url ? getImageUrl(product.image_url, "products") : "/assets/products/placeholder.svg"}
              alt={product.name}
              width={56}
              height={56}
              className="h-full w-full object-contain p-1"
            />
          </div>
          <div className="min-w-0">
            <p className="max-w-[220px] truncate font-semibold text-foreground">
              {product.name}
            </p>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Tag className="h-3 w-3" /> {product.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {product.location}
              </span>
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => <Badge variant="secondary">{row.original.brand}</Badge>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="block min-w-[120px] font-semibold text-[#110843]">
        {rupiahFormat(row.original.price)}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <Badge variant={stockVariant(row.original.stock)} className="capitalize">
        {row.original.stock}
      </Badge>
    ),
  },
  {
    accessorKey: "total_sales",
    header: "Sales",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ShoppingBag className="h-4 w-4" />
        {row.original.total_sales}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {dateFormat(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <div className="flex min-w-[170px] items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            asChild
          >
            <Link href={`/dashboard/products/edit/${product.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteDialog
            id={product.id}
            action={deleteProduct}
            title="Delete product?"
            description={`This will permanently delete "${product.name}" and its uploaded images.`}
          />
        </div>
      )
    },
  },
]
