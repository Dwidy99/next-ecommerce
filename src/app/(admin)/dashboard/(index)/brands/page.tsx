import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DataTable } from "../../../../../components/ui/data-table";
import { columns } from "./columns";
import { getBrands } from "./lib/data";

export default async function BrandPage() {
  const brands = await getBrands();

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Brands</h2>
          <p className="text-muted-foreground text-sm">
            Manage your brands and view their performance.
          </p>
        </div>
        <Button asChild size="sm" className="h-8 gap-1">
          <Link href="/dashboard/brands/create">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Add Brand</span>
          </Link>
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Brand List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={brands} />
        </CardContent>
      </Card>
    </div>
  );
}
