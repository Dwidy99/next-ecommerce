import { ShoppingBag, Sparkles, UserRound, Users2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import type { AdminCustomerColumn } from "@/app/(admin)/types"
import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "lib/prisma"
import { columns } from "./columns"

function warnCustomerFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

async function getCustomers(): Promise<AdminCustomerColumn[]> {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "customer",
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    })

    return customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      createdAt: customer.created_at,
      total_transactions: customer._count.orders,
    }))
  } catch (error) {
    warnCustomerFallback("Customers", error)
    return []
  }
}

export default async function CustomerPage() {
  const customers = await getCustomers()
  const activeCustomers = customers.filter((customer) => customer.total_transactions > 0).length
  const totalTransactions = customers.reduce(
    (total, customer) => total + customer.total_transactions,
    0,
  )

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              Customer Management
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Understand customer activity from one clean table.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Review registered customers, emails, join dates, and transaction
              count without adding unnecessary actions.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Users2 className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{customers.length}</p>
                  <p className="text-xs text-white/65">Total Customers</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <UserRound className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{activeCustomers}</p>
                  <p className="text-xs text-white/65">Active Customers</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{totalTransactions}</p>
                  <p className="text-xs text-white/65">Transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#d99000]" />
            Customers
          </CardTitle>
          <CardDescription>
            Customer data is read-only here to keep account records safe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <p className="text-xs text-muted-foreground md:hidden">
              Swipe the table sideways to see email, transaction, and joined date.
            </p>
            <DataTable
              columns={columns}
              data={customers}
              className="max-w-[calc(100vw-2rem)] md:max-w-full"
              tableClassName="min-w-[820px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
