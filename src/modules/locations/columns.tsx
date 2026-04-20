"use client"

import DeleteDialog from "@/app/(admin)/dashboard/_components/delete-dialog"
import { Button } from "@/components/ui/button"
import { Location } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import Link from "next/link"
import { deleteLocation } from "./actions"

export const locationColumns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Location",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const location = row.original

      return (
        <div className="inline-flex space-x-4">
          <Button size="sm" asChild>
            <Link href={`/dashboard/locations/edit/${location.id}`}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
          <DeleteDialog
            id={location.id}
            action={deleteLocation}
            title="Delete Location"
            description="Are you sure you want to delete this location?"
          />
        </div>
      )
    },
  },
]

export const columns = locationColumns
