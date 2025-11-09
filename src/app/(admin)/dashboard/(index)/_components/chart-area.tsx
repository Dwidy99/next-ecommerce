"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * Props interface for the chart.
 */
interface ChartAreaProps {
  data: { month: string; orders: number; revenue: number }[];
}

/**
 * Responsive area chart component using Recharts and ShadCN UI.
 * Supports light/dark theme color variables from Tailwind (oklch).
 */
export function ChartArea({ data }: ChartAreaProps) {
  const chartConfig = {
    orders: {
      label: "Orders",
      color: "var(--primary)",
    },
    revenue: {
      label: "Revenue",
      color: "oklch(0.58 0.12 180)", // teal accent color
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full h-full border-border bg-background text-foreground shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Based on monthly transactions</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="w-full h-[320px] -mx-6 -mb-6"
        >
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            {/* Gradient Fills */}
            <defs>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="oklch(0.8 0.02 270 / 50%)"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              style={{ fontSize: "12px" }}
            />

            <ChartTooltip
              content={<ChartTooltipContent indicator="dot" />}
              cursor={false}
            />

            {/* Orders Area */}
            <Area
              type="natural"
              dataKey="orders"
              stroke="var(--color-orders)"
              fill="url(#fillOrders)"
              strokeWidth={2}
              dot={false}
              stackId="a"
            />

            {/* Revenue Area */}
            <Area
              type="natural"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              fill="url(#fillRevenue)"
              strokeWidth={2}
              dot={false}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
