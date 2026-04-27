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

