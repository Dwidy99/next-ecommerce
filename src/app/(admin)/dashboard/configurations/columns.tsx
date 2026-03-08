"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Configuration } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Configuration>[] = [
  {
    accessorKey: "webname",
    header: "Webname",
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "date",
    header: "Updated",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const cfg = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/configurations/edit/${cfg.id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/configurations/delete/${cfg.id}`}>
                Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
