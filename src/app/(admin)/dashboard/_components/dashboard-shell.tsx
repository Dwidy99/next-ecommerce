"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  Building,
  ChevronRight,
  Home,
  LayoutTemplate,
  MapPin,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import type {
  AdminDashboardShellProps,
  AdminNavSection,
} from "@/app/(admin)/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
import { cn } from "@/lib/utils";
import FormLogout from "./logout-button";

const ADMIN_NAV_SECTIONS: AdminNavSection[] = [
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
        href: "/dashboard/home-content",
        icon: LayoutTemplate,
        title: "Home Content",
      },
      {
        href: "/dashboard/configurations",
        icon: Settings,
        title: "Configurations",
      },
    ],
  },
];

const DEFAULT_OPEN_SECTIONS = ADMIN_NAV_SECTIONS.reduce<Record<string, boolean>>(
  (result, section) => {
    result[section.title] = true;
    return result;
  },
  {},
);

function formatBreadcrumbLabel(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getBreadcrumbItems(pathname: string) {
  const segments = pathname.split("/").filter(Boolean).slice(1);

  return segments.map((segment, index) => ({
    href: `/dashboard/${segments.slice(0, index + 1).join("/")}`,
    isLast: index === segments.length - 1,
    label: formatBreadcrumbLabel(segment),
  }));
}

function DashboardBreadcrumb() {
  const pathname = usePathname();
  const items = getBreadcrumbItems(pathname);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item) => (
          <React.Fragment key={item.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function SidebarBrand({ showLabels }: { showLabels: boolean }) {
  return (
    <SidebarHeader>
      <div className="flex items-center gap-3">
        <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-2xl bg-[#110843] text-sm font-black text-[#FFC736]">
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
  );
}

function SidebarNavLink({
  item,
  pathname,
  showLabels,
  onClick,
}: {
  item: AdminNavSection["items"][number];
  pathname: string;
  showLabels: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  const isActive = isActivePath(pathname, item.href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        title={!showLabels ? item.title : undefined}
      >
        <Link href={item.href} onClick={onClick}>
          <Icon className="h-5 w-5 shrink-0" />
          {showLabels && <span>{item.title}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SidebarNavSection({
  section,
  isOpen,
  pathname,
  showLabels,
  onToggle,
  onLinkClick,
}: {
  section: AdminNavSection;
  isOpen: boolean;
  pathname: string;
  showLabels: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel
        className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        onClick={onToggle}
      >
        <span>{section.title}</span>
        <ChevronRight
          className={cn(
            "ml-auto h-4 w-4 transition-transform",
            isOpen && "rotate-90",
          )}
        />
      </SidebarGroupLabel>

      {isOpen && (
        <SidebarGroupContent>
          <SidebarMenu>
            {section.items.map((item) => (
              <SidebarNavLink
                key={item.href}
                item={item}
                pathname={pathname}
                showLabels={showLabels}
                onClick={onLinkClick}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
}

function AppSidebar() {
  const pathname = usePathname();
  const { open, openMobile, setOpenMobile } = useSidebar();
  const showLabels = open || openMobile;
  const [openSections, setOpenSections] =
    React.useState<Record<string, boolean>>(DEFAULT_OPEN_SECTIONS);

  function toggleSection(title: string) {
    setOpenSections((current) => ({
      ...current,
      [title]: !current[title],
    }));
  }

  return (
    <Sidebar>
      <SidebarBrand showLabels={showLabels} />

      <SidebarContent>
        {ADMIN_NAV_SECTIONS.map((section) => (
          <SidebarNavSection
            key={section.title}
            section={section}
            isOpen={!showLabels || openSections[section.title]}
            pathname={pathname}
            showLabels={showLabels}
            onToggle={() => toggleSection(section.title)}
            onLinkClick={() => setOpenMobile(false)}
          />
        ))}
      </SidebarContent>

      <SidebarFooter className="hidden" />
      <SidebarRail />
    </Sidebar>
  );
}

function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 hidden h-4 md:block" />

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

function DashboardContent({ children }: AdminDashboardShellProps) {
  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {children}
      </div>
    </main>
  );
}

export default function DashboardShell({ children }: AdminDashboardShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <DashboardContent>{children}</DashboardContent>
      </SidebarInset>
    </SidebarProvider>
  );
}
