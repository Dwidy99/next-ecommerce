import type { ProductStock, StatusOrder } from "@prisma/client";

export type AdminDashboardStats = {
  totalOrders: number;
  newUsers: number;
  totalRevenue: number;
  pendingPayments: number;
  totalProducts: number;
  totalCustomers: number;
  successfulOrders: number;
  failedOrders: number;
};

export type AdminDashboardChartItem = {
  month: string;
  orders: number;
  revenue: number;
};

export type AdminDashboardRecentOrder = {
  id: number;
  code: string;
  customerName: string;
  status: StatusOrder;
  total: number;
  itemCount: number;
  createdAt: Date;
};

export type AdminDashboardStatusCount = {
  status: StatusOrder;
  count: number;
};

export type AdminDashboardStockCount = {
  stock: ProductStock;
  count: number;
};

export type AdminDashboardData = {
  stats: AdminDashboardStats;
  chartData: AdminDashboardChartItem[];
  recentOrders: AdminDashboardRecentOrder[];
  orderStatusCounts: AdminDashboardStatusCount[];
  productStockCounts: AdminDashboardStockCount[];
};

export type AdminDashboardRawChartItem = {
  month: string;
  orders: number | bigint;
  revenue: number | bigint;
};

