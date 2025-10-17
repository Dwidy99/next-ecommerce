"use client";

import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { cn } from "@/lib/utils";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 🔹 Deteksi lebar layar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setMobileOpen((prev) => !prev);
    else setCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-background border-r transition-all duration-300 ease-in-out",
          "lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
          collapsed && !isMobile && "lg:w-16"
        )}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Overlay saat sidebar mobile terbuka */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Konten utama */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />

        <main
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300",
            "p-4 sm:p-6 lg:p-8"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
