"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import DeleteDialog from "../_components/delete-dialog";
import { deleteCategory } from "./lib/actions";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category name",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="space-x-4 inline-flex">
          <Button size="xs" variant="outline" asChild>
            <Link href={`/dashboard/categories/edit/${category.id}`}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Link>
          </Button>
          <DeleteDialog
            id={category.id}
            action={deleteCategory}
            title="Delete Category"
            description="Are you sure you want to delete this category?"
          />
        </div>
      );
    },
  },
];
