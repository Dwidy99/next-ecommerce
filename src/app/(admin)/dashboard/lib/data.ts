import { prisma } from "lib/prisma";


export async function getDashboardData() {
    const [totalOrders, newUsers, totalRevenue, pendingPayments, chartRaw] =
        await Promise.all([
            prisma.order.count(),

            prisma.user.count({
                where: {
                    created_at: {
                        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
                    },
                },
            }),

            prisma.order.aggregate({
                _sum: { total: true },
                where: { status: "success" },
            }),

            prisma.order.count({
                where: { status: "pending" },
            }),

            prisma.$queryRawUnsafe<
                { month: string; orders: number; revenue: any }[]
            >(`
        SELECT
          TO_CHAR(created_at, 'Mon') AS month,
          COUNT(*) AS orders,
          COALESCE(SUM(total), 0) AS revenue
        FROM "Order"
        WHERE created_at >= NOW() - INTERVAL '5 months'
        GROUP BY month
        ORDER BY MIN(created_at);
      `),
        ])

    type ChartItem = {
        month: string
        orders: number
        revenue: any
    }

    const chartData = chartRaw.map((item: ChartItem) => ({
        month: item.month,
        orders: Number(item.orders),
        revenue: Number(item.revenue),
    }))


    return {
        stats: {
            totalOrders,
            newUsers,
            totalRevenue: Number(totalRevenue._sum.total ?? 0),
            pendingPayments,
        },
        chartData,
    }
}
