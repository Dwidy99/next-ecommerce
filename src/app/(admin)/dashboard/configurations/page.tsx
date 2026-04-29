import Link from "next/link"
import { Globe2, Languages, PlusCircle, Sparkles } from "lucide-react"

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
import { getConfigurations } from "./lib/actions"

export default async function ConfigurationsPage() {
  const configs = await getConfigurations()
  const languages = new Set(configs.map((config) => config.language)).size

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              System Configuration
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Manage website identity and global metadata safely.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Keep SEO, contact, and language-based website settings organized
              in one maintainable CRUD area.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{configs.length}</p>
                  <p className="text-xs text-white/65">Configurations</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Languages className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{languages}</p>
                  <p className="text-xs text-white/65">Languages</p>
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
              Configurations
            </CardTitle>
            <CardDescription>
              Manage website name, language, contact, and SEO-friendly content.
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/dashboard/configurations/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Configuration
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={configs}
            className="max-w-[calc(100vw-2rem)] md:max-w-full"
            tableClassName="min-w-[920px]"
          />
        </CardContent>
      </Card>
    </div>
  )
}
