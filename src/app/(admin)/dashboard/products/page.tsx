import Link from "next/link"
import { Boxes, Package, PlusCircle, ShoppingBag, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { getProducts } from "./lib/data"

export default async function ProductPage() {
  const products = await getProducts()
  const readyProducts = products.filter((product) => product.stock === "ready").length
  const totalSales = products.reduce((total, product) => total + product.total_sales, 0)

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              Product Management
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Manage products with cleaner data and faster actions.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Create, edit, and maintain product information used by the
              customer catalog and checkout flow.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{products.length}</p>
                  <p className="text-xs text-white/65">Total Products</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Boxes className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{readyProducts}</p>
                  <p className="text-xs text-white/65">Ready Stock</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{totalSales}</p>
                  <p className="text-xs text-white/65">Total Sales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#d99000]" />
              Products
            </CardTitle>
            <CardDescription>
              Manage product images, pricing, stock, and catalog grouping.
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/products/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <p className="text-xs text-muted-foreground md:hidden">
              Swipe the table sideways to see brand, price, stock, sales, and
              actions.
            </p>
            <DataTable
              columns={columns}
              data={products}
              className="max-w-[calc(100vw-2rem)] md:max-w-full"
              tableClassName="min-w-[980px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
