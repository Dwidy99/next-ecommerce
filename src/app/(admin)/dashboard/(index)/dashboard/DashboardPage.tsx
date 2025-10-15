"use client";

import React, { useEffect, useState } from "react";
import { SectionCards } from "../_components/section-card";
import { getDashboardData } from "./lib/data";
import { ChartArea } from "../_components/cart-area";

export default function DashboardPage() {
  // 🟢 Tambahkan type
  const [stats, setStats] = useState<{
    totalOrders: number;
    newUsers: number;
    totalRevenue: number;
    pendingPayments: number;
  } | null>(null);

  const [chartData, setChartData] = useState<
    { month: string; orders: number; revenue: number }[]
  >([]);

  useEffect(() => {
    getDashboardData().then((data) => {
      setStats(data.stats);
      setChartData(data.chartData);
    });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Dashboard Overview
      </h1>

      <SectionCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartArea data={chartData} />
      </div>
    </div>
  );
}
