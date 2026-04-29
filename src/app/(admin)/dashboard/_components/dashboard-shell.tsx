"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

import type { AdminDashboardShellProps, AdminNavSection } from "@/app/(admin)/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import AdminNavigationLoading from "./admin-navigation-loading";
import { cn } from "@/lib/utils";
import FormLogout from "./logout-button";

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

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;

  return pathname === href || pathname.startsWith(`${href}/`);
}

function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(1);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = `/dashboard/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = formatSegment(segment);

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function DashboardSidebar() {
  const pathname = usePathname();
  const { open, openMobile, setOpenMobile } = useSidebar();
  const showLabels = open || openMobile;
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    Overview: true,
    Catalog: true,
    Sales: true,
    System: true,
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#110843] text-sm font-black text-[#FFC736]">
            S
          </div>
          {showLabels && (
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
      </SidebarHeader>

      <SidebarContent>
        {navSections.map((section) => {
          const isOpen = !showLabels || openSections[section.title];

          return (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel
                onClick={() =>
                  setOpenSections((current) => ({
                    ...current,
                    [section.title]: !current[section.title],
                  }))
                }
              >
                <span>{section.title}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </SidebarGroupLabel>

              {isOpen && (
                <SidebarMenu>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActivePath(pathname, item.href);

                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          title={!showLabels ? item.title : undefined}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpenMobile(false)}
                          >
                            <Icon className="h-5 w-5 shrink-0" />
                            {showLabels && <span>{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              )}
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="hidden" />

      <SidebarRail />
    </Sidebar>
  );
}

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <SidebarTrigger />

        <div className="flex min-w-0 flex-col">
          <p className="text-sm font-semibold text-foreground md:hidden">
            Dashboard
          </p>
          <DashboardBreadcrumb />
        </div>
      </div>

      <div className="ml-auto flex shrink-0 items-center">
        <FormLogout variant="header" />
      </div>
    </header>
  );
}

export default function DashboardShell({ children }: AdminDashboardShellProps) {
  return (
    <SidebarProvider>
      <AdminNavigationLoading />
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
