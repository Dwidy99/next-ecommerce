"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CalendarDays, Mail, ShoppingBag, UserRound } from "lucide-react"

import type { AdminCustomerColumn } from "@/app/(admin)/types"
import { Badge } from "@/components/ui/badge"
import { dateFormat } from "@/lib/utils"

export const columns: ColumnDef<AdminCustomerColumn>[] = [
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex min-w-[240px] items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4CC] text-[#110843]">
          <UserRound className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{row.original.name}</p>
          <p className="text-sm text-muted-foreground">Customer account</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex min-w-[240px] items-center gap-2 text-sm text-muted-foreground">
        <Mail className="h-4 w-4" />
        {row.original.email}
      </div>
    ),
  },
  {
    accessorKey: "total_transactions",
    header: "Transactions",
    cell: ({ row }) => (
      <Badge variant="secondary" className="gap-1.5">
        <ShoppingBag className="h-3.5 w-3.5" />
        {row.original.total_transactions} order(s)
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => (
      <div className="flex min-w-[130px] items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="h-4 w-4" />
        {dateFormat(row.original.createdAt)}
      </div>
    ),
  },
]
