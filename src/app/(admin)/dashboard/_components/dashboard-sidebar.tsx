"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Archive,
  Building,
  ChevronDown,
  Home,
  MapPin,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import FormLogout from "./logout-button";
import type { AdminNavSection, AdminSidebarProps } from "@/app/(admin)/types";
import { cn } from "@/lib/utils";

const navSections: AdminNavSection[] = [
  {
    title: "Overview",
    items: [{ href: "/dashboard", icon: Home, title: "Dashboard" }],
  },
  {
    title: "Catalog",
    items: [
      { href: "/dashboard/categories", icon: Archive, title: "Categories" },
      { href: "/dashboard/locations", icon: MapPin, title: "Locations" },
      { href: "/dashboard/brands", icon: Building, title: "Brands" },
      { href: "/dashboard/products", icon: Package, title: "Products" },
    ],
  },
  {
    title: "Sales",
    items: [
      { href: "/dashboard/orders", icon: ShoppingCart, title: "Orders" },
      { href: "/dashboard/customers", icon: Users2, title: "Customers" },
    ],
  },
  {
    title: "System",
    items: [
      {
        href: "/dashboard/configurations",
        icon: Settings,
        title: "Configurations",
      },
    ],
  },
];

export default function DashboardSidebar({
  collapsed,
  onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Overview: true,
    Catalog: true,
    Sales: true,
    System: true,
  });

  const toggleSection = (title: string) => {
    setOpenSections((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-16 items-center gap-3 border-b px-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#110843] text-sm font-black text-[#FFC736]">
          S
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              Shopverse
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Admin Dashboard
            </p>
          </div>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-4">
        {navSections.map((section) => {
          const isOpen = collapsed || openSections[section.title];

          return (
            <div key={section.title} className="flex flex-col gap-1">
              {!collapsed && (
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
              )}

              {isOpen && (
                <div className="flex flex-col gap-1">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" &&
                        pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={collapsed ? item.title : undefined}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                          collapsed && "justify-center px-2",
                          isActive
                            ? "bg-[#110843] text-white shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <FormLogout collapsed={collapsed} />
      </div>
    </div>
  );
}
