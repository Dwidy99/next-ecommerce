"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { CalendarDays, Edit, Globe2, Mail } from "lucide-react"

import type { AdminConfigurationColumn } from "@/app/(admin)/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { dateFormat } from "@/lib/utils"
import DeleteDialog from "../_components/delete-dialog"
import { deleteConfiguration } from "./lib/actions"

export const columns: ColumnDef<AdminConfigurationColumn>[] = [
  {
    accessorKey: "webname",
    header: "Website",
    cell: ({ row }) => (
      <div className="flex min-w-[260px] items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4CC] text-[#110843]">
          <Globe2 className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{row.original.webname}</p>
          <p className="text-sm text-muted-foreground">
            {row.original.tagline ?? "No tagline"}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "language",
    header: "Language",
    cell: ({ row }) => <Badge variant="secondary">{row.original.language}</Badge>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex min-w-[220px] items-center gap-2 text-sm text-muted-foreground">
        <Mail className="h-4 w-4" />
        {row.original.email ?? "No email"}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Updated",
    cell: ({ row }) => (
      <div className="flex min-w-[130px] items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        {dateFormat(row.original.date)}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const config = row.original

      return (
        <div className="flex min-w-[170px] items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            asChild
          >
            <Link href={`/dashboard/configurations/edit/${config.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteDialog
            id={config.id}
            action={deleteConfiguration}
            title="Delete configuration?"
            description={`This will permanently delete the ${config.language} configuration for "${config.webname}".`}
          />
        </div>
      )
    },
  },
]
