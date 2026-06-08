import type React from "react";

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

