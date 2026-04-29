"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />;
}

export default function AdminDashboardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-3xl border bg-[#110843] p-6 shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div className="grid gap-4">
            <SkeletonBlock className="h-6 w-40 bg-white/20" />
            <SkeletonBlock className="h-10 w-full max-w-xl bg-white/20" />
            <SkeletonBlock className="h-5 w-full max-w-2xl bg-white/15" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[0, 1, 2].map((item) => (
              <SkeletonBlock key={item} className="h-20 bg-white/15" />
            ))}
          </div>
        </div>
      </section>

      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardHeader className="grid gap-3">
          <SkeletonBlock className="h-6 w-48" />
          <SkeletonBlock className="h-4 w-full max-w-md" />
        </CardHeader>
        <CardContent className="grid gap-3">
          {[0, 1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="grid grid-cols-[1.5fr_1fr_0.7fr] gap-4 rounded-xl border p-4"
            >
              <SkeletonBlock className="h-12" />
              <SkeletonBlock className="h-12" />
              <SkeletonBlock className="h-12" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminNavigationLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsLoading(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const startLoading = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      const targetAttr = link.getAttribute("target");
      if (!href || targetAttr === "_blank") return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const nextUrl = new URL(href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const currentPath = window.location.pathname + window.location.search;
      const nextPath = nextUrl.pathname + nextUrl.search;
      if (currentPath === nextPath) return;

      setIsLoading(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 8000);
    };

    document.addEventListener("click", startLoading, true);

    return () => {
      document.removeEventListener("click", startLoading, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999]">
      <div className="h-1 w-full overflow-hidden bg-[#110843]/10">
        <div className="h-full w-1/2 animate-[admin-navigation-progress_1.1s_ease-in-out_infinite] rounded-r-full bg-[#110843] shadow-[0_0_18px_rgba(17,8,67,0.65)]" />
      </div>

      <style jsx>{`
        @keyframes admin-navigation-progress {
          0% {
            transform: translateX(-110%);
          }
          55% {
            transform: translateX(70%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </div>
  );
}
