// sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FormLogout from "./form-logout";
import {
  Archive,
  Building,
  Home,
  MapPin,
  Package,
  ShoppingCart,
  Users2,
} from "lucide-react";

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: Home, name: "Dashboard" },
    { href: "/dashboard/categories", icon: Archive, name: "Categories" },
    { href: "/dashboard/locations", icon: MapPin, name: "Locations" },
    { href: "/dashboard/brands", icon: Building, name: "Brands" },
    { href: "/dashboard/products", icon: Package, name: "Products" },
    { href: "/dashboard/orders", icon: ShoppingCart, name: "Orders" },
    { href: "/dashboard/customers", icon: Users2, name: "Customers" },
  ];

  return (
    <aside
      className={`border-r bg-background flex flex-col transition-all duration-300 ${
        collapsed ? "w-14" : "w-48"
      }`}
    >
      <nav className="flex flex-col gap-2 px-2 py-6">
        {navItems.map(({ href, icon: Icon, name }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{name}</span>}
            </Link>
          );
        })}
      </nav>
      <div
        className={`mt-auto px-2 pb-6 ${
          collapsed ? "items-center flex justify-center" : ""
        }`}
      >
        <FormLogout />
      </div>
    </aside>
  );
}
