"use client";

import { Button } from "@/components/ui/button";
import { Brand, StatusOrder } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TProduct = {
  name: string;
  image: string;
};

export type TColumn = {
  id: number;
  products: TProduct[];
  customer_naem: string;
  price: number;
  status: StatusOrder;
};

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const order = row.original;
      console.log(order);

      return (
        <div className="flex flex-col gap-4 justify-start">
          {/* {order.map((item, i) => {
            <div
              key={`${item.name + i}`}
              className="inline-flex items-center gap-5"
            >
              <Image
                src={`${item.image + i}`}
                alt="Product"
                width={80}
                height={80}
              />
            </div>;
            <span>{item.name}</span>;
          })} */}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/orders/edit/${order.id}`}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Link>
          </Button>
          <FormDelete key={order.id} id={order.id} />
        </div>
      );
    },
  },
];
