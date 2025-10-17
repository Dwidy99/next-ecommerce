"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
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
  stats: {
    totalOrders: number;
    newUsers: number;
    totalRevenue: number;
    pendingPayments: number;
  };
}

export function SectionCards({ stats }: SectionCardsProps) {
  const cards = [
    { title: "Total Orders", value: stats.totalOrders, trend: "up" },
    { title: "New Users", value: stats.newUsers, trend: "up" },
    {
      title: "Total Revenue",
      value: `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`,
      trend: "up",
    },
    { title: "Pending Payments", value: stats.pendingPayments, trend: "down" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => (
        <Card key={i}>
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.trend === "up" ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium">
              {card.trend === "up"
                ? "Trending up this month"
                : "Need improvement"}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
