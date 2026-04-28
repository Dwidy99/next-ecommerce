"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, MapPin, Package } from "lucide-react"

import type { AdminLocationTableItem } from "@/app/(admin)/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DeleteDialog from "../_components/delete-dialog"
import { deleteLocation } from "./lib/actions"

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(date)
}

export const columns: ColumnDef<AdminLocationTableItem>[] = [
  {
    accessorKey: "name",
    header: "Location",
    cell: ({ row }) => {
      const location = row.original

      return (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4CC] text-[#110843]">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{location.name}</p>
            <p className="text-sm text-muted-foreground">Stock or shipping area</p>
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
      const location = row.original

      return (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            asChild
          >
            <Link href={`/dashboard/locations/edit/${location.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteDialog
            id={location.id}
            action={deleteLocation}
            title="Delete location?"
            description={`This will permanently delete "${location.name}". Make sure no active products are assigned to this location.`}
          />
        </div>
      )
    },
  },
]
