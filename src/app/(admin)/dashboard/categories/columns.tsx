"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, FolderTree, Package } from "lucide-react";

import type { AdminCategoryTableItem } from "@/app/(admin)/types";
import DeleteDialog from "../_components/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteCategory } from "./lib/actions";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(date);
}

export const columns: ColumnDef<AdminCategoryTableItem>[] = [
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4CC] text-[#110843]">
            <FolderTree className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{category.name}</p>
            <p className="text-sm text-muted-foreground">
              /categories/{category.slug ?? category.id}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.slug ?? "No slug"}</Badge>
    ),
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
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.created_at)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            asChild
          >
            <Link href={`/dashboard/categories/edit/${category.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>

          <DeleteDialog
            id={category.id}
            action={deleteCategory}
            title="Delete category?"
            description={`This will permanently delete "${category.name}". Make sure this category is not used by active products.`}
          />
        </div>
      );
    },
  },
];
