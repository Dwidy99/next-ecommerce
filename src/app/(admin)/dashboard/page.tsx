import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  PackagePlus,
  Settings,
  ShoppingBag,
  Users2,
} from "lucide-react";

import type {
  AdminDashboardRecentOrder,
  AdminDashboardStatusCount,
  AdminDashboardStockCount,
} from "@/app/(admin)/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { rupiahFormat } from "@/lib/utils";
import { ChartArea } from "./_components/chart-area";
import { AdminCardTableLoading } from "./_components/admin-section-loading";
import { SectionCards } from "./_components/dashboard-section-card";
import { getDashboardData } from "./lib/data";

const quickActions = [
  {
    title: "Add Product",
    description: "Create a new catalog item",
    href: "/dashboard/products/create",
    icon: PackagePlus,
  },
  {
    title: "View Orders",
    description: "Check latest purchases",
    href: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    description: "Manage customer data",
    href: "/dashboard/customers",
    icon: Users2,
  },
  {
    title: "Configuration",
    description: "Update website settings",
    href: "/dashboard/configurations",
    icon: Settings,
  },
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function statusVariant(status: AdminDashboardRecentOrder["status"]) {
  if (status === "success") return "default";
  if (status === "pending") return "warning";
  if (status === "failed") return "destructive";

  return "secondary";
}

function DashboardHero() {
  return (
    <section className="overflow-hidden rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
        <div>
          <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
            Admin Workspace
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Welcome back, manage your store with confidence.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
            Monitor orders, revenue, customers, and catalog health from one
            clean dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFC736] text-[#110843]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Store Status</p>
              <p className="text-xs text-white/65">Dashboard is ready</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickActions() {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common admin actions that are used most often.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center justify-between rounded-2xl border bg-background p-4 transition hover:-translate-y-0.5 hover:border-[#FFC736] hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4CC] text-[#110843]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{action.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-[#d99000]" />
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentOrders({ orders }: { orders: AdminDashboardRecentOrder[] }) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer purchases.</CardDescription>
        </div>

        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/orders">View All</Link>
        </Button>
      </CardHeader>

      <CardContent>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            No recent orders yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-3 rounded-2xl border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">#{order.code}</p>
                    <Badge variant={statusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.customerName} • {order.itemCount} item(s) •{" "}
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <p className="font-semibold text-[#110843]">
                  {rupiahFormat(order.total)}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BusinessHealth({
  orderStatusCounts,
  productStockCounts,
}: {
  orderStatusCounts: AdminDashboardStatusCount[];
  productStockCounts: AdminDashboardStockCount[];
}) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle>Business Health</CardTitle>
        <CardDescription>
          Simple status overview for orders and stock readiness.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-[#d99000]" />
            <p className="text-sm font-semibold">Order Status</p>
          </div>
          <div className="grid gap-2">
            {orderStatusCounts.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2"
              >
                <span className="capitalize text-muted-foreground">
                  {item.status}
                </span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-[#d99000]" />
            <p className="text-sm font-semibold">Product Stock</p>
          </div>
          <div className="grid gap-2">
            {productStockCounts.map((item) => (
              <div
                key={item.stock}
                className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2"
              >
                <span className="capitalize text-muted-foreground">
                  {item.stock}
                </span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardDataLoading() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader className="grid gap-3">
              <div className="h-4 w-28 animate-pulse rounded-xl bg-muted" />
              <div className="h-8 w-20 animate-pulse rounded-xl bg-muted" />
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <AdminCardTableLoading />
        <QuickActions />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <AdminCardTableLoading />
        <AdminCardTableLoading />
      </div>
    </>
  );
}

async function DashboardDataContent() {
  const {
    stats,
    chartData,
    recentOrders,
    orderStatusCounts,
    productStockCounts,
  } = await getDashboardData();

  return (
    <>
      <SectionCards stats={stats} />

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <ChartArea data={chartData} />
        <QuickActions />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <RecentOrders orders={recentOrders} />
        <BusinessHealth
          orderStatusCounts={orderStatusCounts}
          productStockCounts={productStockCounts}
        />
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHero />
      <Suspense fallback={<DashboardDataLoading />}>
        <DashboardDataContent />
      </Suspense>
    </div>
  );
}
