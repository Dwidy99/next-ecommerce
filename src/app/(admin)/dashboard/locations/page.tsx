import Link from "next/link"
import { MapPin, Package, PlusCircle, Sparkles } from "lucide-react"

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
import { getLocations } from "./lib/data"
import { Suspense } from "react"
import { AdminListPageLoading } from "../_components/admin-section-loading"

export default function LocationsPage() {
  return (
    <Suspense fallback={<AdminListPageLoading stats={2} />}>
      <LocationsContent />
    </Suspense>
  )
}

async function LocationsContent() {
  const data = await getLocations()
  const totalProducts = data.reduce(
    (total, location) => total + location._count.products,
    0,
  )

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              Location Management
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Keep product locations clear and easy to manage.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Use locations to organize stock origin, shipping area, or product
              availability in your catalog.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{data.length}</p>
                  <p className="text-xs text-white/65">Total Locations</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                  <p className="text-xs text-white/65">Assigned Products</p>
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
              Locations
            </CardTitle>
            <CardDescription>
              Manage product locations used across your admin catalog.
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/locations/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Location
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  )
}

