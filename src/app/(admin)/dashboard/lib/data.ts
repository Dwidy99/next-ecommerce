import type {
  AdminDashboardData,
  AdminDashboardRawChartItem,
} from "@/app/(admin)/types";
import { getErrorMessage } from "@/lib/error-message";
import { prisma } from "lib/prisma";

type DashboardStatusRawItem = {
  status: AdminDashboardData["orderStatusCounts"][number]["status"];
  count: number | bigint;
};

type DashboardStockRawItem = {
  stock: AdminDashboardData["productStockCounts"][number]["stock"];
  count: number | bigint;
};

const emptyDashboardData: AdminDashboardData = {
  stats: {
    totalOrders: 0,
    newUsers: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    totalProducts: 0,
    totalCustomers: 0,
    successfulOrders: 0,
    failedOrders: 0,
  },
  chartData: [],
  recentOrders: [],
  orderStatusCounts: [],
  productStockCounts: [],
};

// READ: Get dashboard summary cards, chart data, and recent activity.
export async function getDashboardData(): Promise<AdminDashboardData> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const [
      totalOrders,
      newUsers,
      totalRevenue,
      pendingPayments,
      totalProducts,
      totalCustomers,
      successfulOrders,
      failedOrders,
      recentOrders,
      orderStatusRaw,
      productStockRaw,
      chartRaw,
    ] = await prisma.$transaction([
      prisma.order.count(),

      prisma.user.count({
        where: {
          created_at: {
            gte: thirtyDaysAgo,
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

      prisma.product.count(),

      prisma.user.count({
        where: { role: "customer" },
      }),

      prisma.order.count({
        where: { status: "success" },
      }),

      prisma.order.count({
        where: { status: "failed" },
      }),

      prisma.order.findMany({
        take: 5,
        orderBy: { created_at: "desc" },
        select: {
          id: true,
          code: true,
          status: true,
          total: true,
          created_at: true,
          user: {
            select: {
              name: true,
            },
          },
          products: {
            select: {
              quantity: true,
            },
          },
        },
      }),

      prisma.$queryRawUnsafe<DashboardStatusRawItem[]>(`
        SELECT status, COUNT(*) AS count
        FROM "Order"
        GROUP BY status
        ORDER BY status;
      `),

      prisma.$queryRawUnsafe<DashboardStockRawItem[]>(`
        SELECT stock, COUNT(*) AS count
        FROM "Product"
        GROUP BY stock
        ORDER BY stock;
      `),

      prisma.$queryRawUnsafe<AdminDashboardRawChartItem[]>(`
        SELECT
          TO_CHAR(created_at, 'Mon') AS month,
          COUNT(*) AS orders,
          COALESCE(SUM(total), 0) AS revenue
        FROM "Order"
        WHERE created_at >= NOW() - INTERVAL '5 months'
        GROUP BY month
        ORDER BY MIN(created_at);
      `),
    ]);

    return {
      stats: {
        totalOrders,
        newUsers,
        totalRevenue: Number(totalRevenue._sum.total ?? 0),
        pendingPayments,
        totalProducts,
        totalCustomers,
        successfulOrders,
        failedOrders,
      },
      chartData: chartRaw.map((item) => ({
        month: item.month,
        orders: Number(item.orders),
        revenue: Number(item.revenue),
      })),
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        code: order.code,
        customerName: order.user?.name ?? "Unknown customer",
        status: order.status,
        total: Number(order.total),
        itemCount: order.products.reduce(
          (total, product) => total + product.quantity,
          0,
        ),
        createdAt: order.created_at,
      })),
      orderStatusCounts: orderStatusRaw.map((item) => ({
        status: item.status,
        count: Number(item.count),
      })),
      productStockCounts: productStockRaw.map((item) => ({
        stock: item.stock,
        count: Number(item.count),
      })),
    };
  } catch (error) {
    console.error(
      "[dashboard-data] Failed to load dashboard data:",
      getErrorMessage(error),
    );

    return emptyDashboardData;
  }
}
