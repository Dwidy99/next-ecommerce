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
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();

  // 📌 Semua menu (tanpa filter role)
  const navItems = [
    { href: "/dashboard", icon: Home, name: "Dashboard" },
    { href: "/dashboard/categories", icon: Archive, name: "Categories" },
    { href: "/dashboard/locations", icon: MapPin, name: "Locations" },
    { href: "/dashboard/brands", icon: Building, name: "Brands" },
    { href: "/dashboard/products", icon: Package, name: "Products" },
    { href: "/dashboard/orders", icon: ShoppingCart, name: "Orders" },
    { href: "/dashboard/customers", icon: Users2, name: "Customers" },
    {
      href: "/dashboard/configurations",
      icon: Settings,
      name: "Configurations",
    },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="flex flex-col h-full">
        {/* Navigasi */}
        <nav className="flex flex-col gap-2 px-3 py-6">
          {navItems.map(({ href, icon: Icon, name }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard" && pathname.startsWith(href));

            const linkClass = cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-muted text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            );

            return (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link href={href} className={linkClass}>
                    <Icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span className="truncate">{name}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="text-sm font-medium">
                    {name}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* Tombol Logout */}
        <div
          className={cn(
            "mt-auto px-2 pb-6 border-t border-muted/30",
            collapsed ? "flex justify-center" : ""
          )}
        >
          <FormLogout />
        </div>
      </aside>
    </TooltipProvider>
  );
}
