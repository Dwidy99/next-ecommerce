import { ChartArea } from "./_components/chart-area";
import { SectionCards } from "./_components/section-card";
import { getDashboardData } from "./lib/data";

export default async function DashboardPage() {
  const { stats, chartData } = await getDashboardData();

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Dashboard Overview
      </h1>

      {/* Statistik */}
      <SectionCards stats={stats} />

      {/* Grafik */}
      <div className="grid gap-6">
        <ChartArea data={chartData} />
      </div>
    </div>
  );
}
