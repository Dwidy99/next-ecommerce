"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "./dashboard-header";
import DashboardSidebar from "./dashboard-sidebar";
import type { AdminDashboardShellProps } from "@/app/(admin)/types";
import { cn } from "@/lib/utils";

export default function DashboardShell({ children }: AdminDashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const closeMobileSidebar = () => setMobileOpen(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 border-r bg-background transition-all duration-300 lg:sticky lg:top-0 lg:translate-x-0",
          collapsed ? "lg:w-20" : "lg:w-72",
          mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full",
        )}
      >
        <DashboardSidebar
          collapsed={collapsed}
          onNavigate={closeMobileSidebar}
        />
      </aside>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setMobileOpen((prev) => !prev);
              return;
            }

            setCollapsed((prev) => !prev);
          }}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
