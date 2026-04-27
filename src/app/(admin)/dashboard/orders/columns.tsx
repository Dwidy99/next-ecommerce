"use client";

import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/supabase";
import { rupiahFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import type { AdminOrderColumn } from "@/app/(admin)/types";

export const columns: ColumnDef<AdminOrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Orders",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-col gap-4 justify-start">
          {order.products.map((item, i) => (
            <div
              key={`${item.name + i}`}
              className="inline-flex items-center gap-5"
            >
              <Image
                src={
                  item.image.startsWith("https")
                    ? item.image
                    : getImageUrl(item.image, "products")
                }
                alt="Product"
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "customer_name",
    header: "Customer name",
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status Order",
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.original.status === "success" ? "default" : "warning"}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
];
