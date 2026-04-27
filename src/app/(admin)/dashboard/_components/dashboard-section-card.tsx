import {
  CheckCircle2,
  Clock3,
  Package,
  ShoppingCart,
  TrendingUp,
  Users2,
  XCircle,
} from "lucide-react";

import type { AdminDashboardStats } from "@/app/(admin)/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
  stats: AdminDashboardStats;
}

const iconMap = {
  orders: ShoppingCart,
  revenue: TrendingUp,
  customers: Users2,
  products: Package,
  pending: Clock3,
  success: CheckCircle2,
  failed: XCircle,
};

export function SectionCards({ stats }: SectionCardsProps) {
  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString("id-ID"),
      description: "All customer transactions",
      footer: `${stats.pendingPayments} pending payment(s) need attention`,
      icon: iconMap.orders,
      badge: "Orders",
    },
    {
      title: "Total Revenue",
      value: `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`,
      description: "Paid orders only",
      footer: `${stats.successfulOrders} successful order(s) completed`,
      icon: iconMap.revenue,
      badge: "Paid",
    },
    {
      title: "Customers",
      value: stats.totalCustomers.toLocaleString("id-ID"),
      description: "Registered customer accounts",
      footer: `${stats.newUsers} new user(s) in the last 30 days`,
      icon: iconMap.customers,
      badge: "Users",
    },
    {
      title: "Products",
      value: stats.totalProducts.toLocaleString("id-ID"),
      description: "Products in catalog",
      footer: `${stats.failedOrders} failed order(s) to review`,
      icon: iconMap.products,
      badge: "Catalog",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="border-border/70 bg-card/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>

              <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
                {card.value}
              </CardTitle>

              <CardAction>
                <Badge variant="outline" className="gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {card.badge}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className="text-sm text-muted-foreground">
              {card.footer}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
