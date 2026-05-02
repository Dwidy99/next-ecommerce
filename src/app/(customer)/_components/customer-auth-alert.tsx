"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function CustomerAuthAlert() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loginStatus = searchParams.get("login");
    const logoutStatus = searchParams.get("logout");

    if (loginStatus !== "success" && logoutStatus !== "success") return;

    if (loginStatus === "success") {
      toast.success("Login successful", {
        id: "customer-login-success",
        description: "Welcome back to Shopverse.",
      });
    }

    if (logoutStatus === "success") {
      toast.success("Logout successful", {
        id: "customer-logout-success",
        description: "Your customer session has ended.",
      });
    }

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("login");
    nextParams.delete("logout");

    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}
