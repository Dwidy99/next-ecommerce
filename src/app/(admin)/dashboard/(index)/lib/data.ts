// src/app/(admin)/dashboard/(index)/lib/data.ts

import { prisma } from "lib/prisma";


export async function getDashboardData() {
    const [totalOrders, newUsers, totalRevenue, pendingPayments] =
        await Promise.all([
            prisma.order.count(),
            prisma.user.count(),
            prisma.order.aggregate({ _sum: { total: true } }),
            prisma.order.count({ where: { status: "pending" } }),
        ]);

    // Ambil data bulanan (5 bulan terakhir)
    const raw = await prisma.$queryRawUnsafe<
        { month: string; orders: number; revenue: bigint }[]
    >(`
    SELECT 
      TO_CHAR(created_at, 'Mon') AS month,
      COUNT(*) AS orders,
      COALESCE(SUM(total), 0) AS revenue
    FROM "Order"
    WHERE created_at >= NOW() - INTERVAL '5 months'
    GROUP BY month
    ORDER BY MIN(created_at);
  `);

    const chartData = raw.map((item) => ({
        month: item.month,
        orders: Number(item.orders),
        revenue: Number(item.revenue),
    }));

    return {
        stats: {
            totalOrders,
            newUsers,
            totalRevenue: Number(totalRevenue._sum.total || 0),
            pendingPayments,
        },
        chartData,
    };
}
