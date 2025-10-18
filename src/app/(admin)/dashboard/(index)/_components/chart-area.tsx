"use client";

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

interface ChartAreaProps {
  data: { month: string; orders: number; revenue: number }[];
}

export function ChartArea({ data }: ChartAreaProps) {
  const chartConfig = {
    orders: { label: "Orders", color: "var(--primary)" },
    revenue: { label: "Revenue", color: "hsl(var(--chart-2))" },
  } satisfies ChartConfig;

  return (
    <Card className="w-full h-full">
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
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              style={{ fontSize: "12px" }}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="orders"
              type="monotone"
              stroke="var(--color-orders)"
              fill="var(--color-orders)"
              fillOpacity={0.35}
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              fill="var(--color-revenue)"
              fillOpacity={0.25}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
