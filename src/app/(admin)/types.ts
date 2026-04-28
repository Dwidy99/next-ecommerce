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

export type AdminCategoryTableItem = import("@prisma/client").Category & {
  _count: {
    products: number;
  };
};

export type AdminCategoryFormData = import("@prisma/client").Category | null;

export type AdminLocationTableItem = import("@prisma/client").Location & {
  _count: {
    products: number;
  };
};

export type AdminLocationFormData = import("@prisma/client").Location | null;

export type AdminBrandTableItem = import("@prisma/client").Brand & {
  _count: {
    products: number;
  };
};

export type AdminBrandFormData = import("@prisma/client").Brand | null;

export type AdminProductTableItem = {
  id: number;
  name: string;
  image_url: string;
  category: string;
  brand: string;
  location: string;
  price: number;
  total_sales: number;
  stock: import("@prisma/client").ProductStock;
  createdAt: Date;
};

export type AdminProductFormData = import("@prisma/client").Product | null;

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
  code: string;
  createdAt: Date;
  products: AdminOrderProductColumn[];
  customer_name: string | undefined;
  customer_email: string | undefined;
  total_items: number;
  price: number;
  status: import("@prisma/client").StatusOrder;
};

export type AdminCustomerColumn = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  total_transactions: number;
};

export type AdminConfigurationColumn = {
  id: number;
  webname: string;
  language: import("@prisma/client").Language;
  tagline: string | null;
  website: string | null;
  email: string | null;
  description: string | null;
  address: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  date: Date;
};

export type AdminConfigurationFormData = AdminConfigurationColumn | null;

