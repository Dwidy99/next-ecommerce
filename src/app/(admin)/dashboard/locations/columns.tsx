"use client";

import { Button } from "@/components/ui/button";
import { Location } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import DeleteDialog from "../_components/delete-dialog";
import { deleteLocation } from "./lib/actions";

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Location",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const location = row.original;

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/locations/edit/${location.id}`}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Link>
          </Button>
          <DeleteDialog
            id={location.id}
            action={deleteLocation}
            title="Delete Location"
            description="Are you sure you want to delete this location?"
          />
        </div>
      );
    },
  },
];
