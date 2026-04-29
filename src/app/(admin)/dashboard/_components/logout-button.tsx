"use client";

import { LogOut, ShieldCheck } from "lucide-react";
import { Logout } from "../lib/actions";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type FormLogoutProps = {
  collapsed?: boolean;
  variant?: "sidebar" | "header";
};

export default function FormLogout({
  collapsed = false,
  variant = "sidebar",
}: FormLogoutProps) {
  if (variant === "header") {
    return (
      <LogoutConfirmDialog>
        <button
          type="button"
          className="group flex h-10 items-center gap-2 rounded-xl border border-red-700 bg-red-600 px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-200"
          aria-label="Open logout confirmation"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </LogoutConfirmDialog>
    );
  }

  return (
    <div>
      {!collapsed && (
        <div className="mb-3 rounded-2xl border bg-muted/40 p-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF4CC] text-[#110843]">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">
                Admin Session
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                Secure dashboard access
              </p>
            </div>
          </div>
        </div>
      )}

      <LogoutConfirmDialog>
        <button
          type="button"
          className={cn(
            "group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-red-200",
            collapsed && "justify-center px-2",
          )}
          title={collapsed ? "Logout" : undefined}
          aria-label="Open logout confirmation"
        >
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground transition group-hover:bg-red-100 group-hover:text-red-700",
              collapsed && "h-9 w-9",
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
          </span>
          {!collapsed && (
            <span className="flex min-w-0 flex-col text-left leading-tight">
              <span>Logout</span>
              <span className="text-xs font-normal text-muted-foreground group-hover:text-red-600">
                End admin session
              </span>
            </span>
          )}
        </button>
      </LogoutConfirmDialog>
    </div>
  );
}

function LogoutConfirmDialog({ children }: { children: React.ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-50 text-red-600">
            <LogOut className="h-6 w-6" />
          </AlertDialogMedia>
          <AlertDialogTitle>Logout from dashboard?</AlertDialogTitle>
          <AlertDialogDescription>
            You will end the current admin session and return to the login page.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={Logout}>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button
              type="submit"
              variant="destructive"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Yes, logout
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
