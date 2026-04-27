"use client";

import { LogOut } from "lucide-react";
import { Logout } from "../lib/actions";
import { cn } from "@/lib/utils";

export default function FormLogout({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <form action={Logout}>
      <button
        type="submit"
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
          collapsed && "justify-center px-2",
        )}
        title={collapsed ? "Logout" : undefined}
      >
        <LogOut className="h-5 w-5 shrink-0" />
        {!collapsed && <span>Logout</span>}
      </button>
    </form>
  );
}
