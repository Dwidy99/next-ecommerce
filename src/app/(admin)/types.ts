import type React from "react";

export interface ActionResult {
  error: string;
  redirectUrl?: string;
  code?: string;
  message?: string;
}

export type AdminLoginFormProps = {
  className?: string;
};

export type Tparams = {
  id: string;
};

export type Tedit = {
  params: Tparams;
};

export type AdminNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type AdminNavSection = {
  title: string;
  items: AdminNavItem[];
};

export type AdminDashboardShellProps = {
  children: React.ReactNode;
};

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
  status: import("@prisma/client").StatusOrder;
  total: number;
  itemCount: number;
  createdAt: Date;
};

export type AdminDashboardStatusCount = {
  status: import("@prisma/client").StatusOrder;
  count: number;
};

export type AdminDashboardStockCount = {
  stock: import("@prisma/client").ProductStock;
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

export type AdminOrderProductColumn = {
  name: string;
  image: string;
};

export type AdminOrderColumn = {
  id: number;
  products: AdminOrderProductColumn[];
  customer_name: string | undefined;
  price: number;
  status: import("@prisma/client").StatusOrder;
};

