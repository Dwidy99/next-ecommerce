"use client";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Brand Logo",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="inline-flex brands-center gap-5">
          <Image
            src={getImageUrl(brand.logo, "brands")}
            alt="Product"
            width={80}
            height={80}
          />
          <span>{brand.name}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/brands/edit/${brand.id}`}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Link>
          </Button>
          <FormDelete key={brand.id} id={brand.id} />
        </div>
      );
    },
  },
];
