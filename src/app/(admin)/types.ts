import type {
  Brand,
  Category,
  Language,
  Location,
  Product,
  ProductStock,
  StatusOrder,
} from "@prisma/client";
import type React from "react";

// Shared server action response type.
export interface ActionResult {
  error: string;
  redirectUrl?: string;
  code?: string;
  message?: string;
}

// CRUD: Category data.
export type AdminCategoryTableItem = Category & {
  _count: {
    products: number;
  };
};

export type AdminCategoryFormData = Category | null;

// CRUD: Location data.
export type AdminLocationTableItem = Location & {
  _count: {
    products: number;
  };
};

export type AdminLocationFormData = Location | null;

// CRUD: Brand data.
export type AdminBrandTableItem = Brand & {
  _count: {
    products: number;
  };
};

export type AdminBrandFormData = Brand | null;

// CRUD: Product data.
export type AdminProductTableItem = {
  id: number;
  name: string;
  image_url: string;
  category: string;
  brand: string;
  location: string;
  price: number;
  total_sales: number;
  stock: ProductStock;
  createdAt: Date;
};

export type AdminProductFormData = Product | null;

// CRUD: Order data.
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
  status: StatusOrder;
};

// CRUD: Customer data.
export type AdminCustomerColumn = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  total_transactions: number;
};

// CRUD: Website configuration data.
export type AdminConfigurationColumn = {
  id: number;
  webname: string;
  language: Language;
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

// Dashboard summary data.
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

// Admin auth and page props.
export type AdminLoginFormProps = {
  className?: string;
};

export type Tparams = {
  id: string;
};

export type Tedit = {
  params: Promise<Tparams> | Tparams;
};

// Admin dashboard navigation props.
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
