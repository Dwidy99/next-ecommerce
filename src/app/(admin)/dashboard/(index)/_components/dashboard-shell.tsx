// dashboard-shell.tsx
"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
      </div>
    </div>
  );
}
