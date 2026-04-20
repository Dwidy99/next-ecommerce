import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import React from "react"

type AdminResourcePageProps<TData, TValue> = {
  title: string
  description?: string
  createHref: string
  createLabel: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function AdminResourcePage<TData, TValue>({
  title,
  description,
  createHref,
  createLabel,
  columns,
  data,
}: AdminResourcePageProps<TData, TValue>) {
  return (
    <div className="space-y-4">
      <div className="text-right">
        <Button size="sm" className="h-8 gap-1" asChild>
          <Link href={createHref}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {createLabel}
            </span>
          </Link>
        </Button>
      </div>

      <Card x-chunk="dashboard-resource-list">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  )
}
