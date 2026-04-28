"use client"

import Image from "next/image"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Building2, Edit, Package } from "lucide-react"

import type { AdminBrandTableItem } from "@/app/(admin)/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/supabase"
import DeleteDialog from "../_components/delete-dialog"
import { deleteBrand } from "./lib/actions"

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(date)
}

export const columns: ColumnDef<AdminBrandTableItem>[] = [
  {
    accessorKey: "name",
    header: "Brand",
    cell: ({ row }) => {
      const brand = row.original

      return (
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#FFF4CC] ring-1 ring-border">
            {brand.logo ? (
              <Image
                src={getImageUrl(brand.logo, "brands")}
                alt={brand.name}
                width={48}
                height={48}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <Building2 className="h-5 w-5 text-[#110843]" />
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground">{brand.name}</p>
            <p className="text-sm text-muted-foreground">Brand partner</p>
          </div>
        </div>
      )
    },
  },
  {
    id: "products",
    header: "Products",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Package className="h-4 w-4" />
        <span>{row.original._count.products} product(s)</span>
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <Badge variant="secondary">{formatDate(row.original.created_at)}</Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const brand = row.original

      return (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            asChild
          >
            <Link href={`/dashboard/brands/edit/${brand.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteDialog
            id={brand.id}
            action={deleteBrand}
            title="Delete brand?"
            description={`This will permanently delete "${brand.name}". Make sure no active products are assigned to this brand.`}
          />
        </div>
      )
    },
  },
]
