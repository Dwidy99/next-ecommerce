"use client";

import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/supabase";
import { rupiahFormat } from "@/lib/utils";
import { StatusOrder } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

type TProduct = {
  name: string;
  image: string;
};

export type TColumn = {
  id: number;
  products: TProduct[];
  customer_name: string | undefined;
  price: number;
  status: StatusOrder;
};

export const columns: ColumnDef<TColumn>[] = [
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
