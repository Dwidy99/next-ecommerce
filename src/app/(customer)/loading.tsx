"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CustomerLoadingProps } from "./types";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-gray-200", className)} />;
}

export default function CustomerLoading({
  count = 4,
  type = "grid",
  variant = "page",
  className,
}: CustomerLoadingProps) {
  const isPageLoading = variant === "page";

  return (
    <section
      id="customer-loading"
      className={cn(
        "flex w-full animate-pulse flex-col gap-6 sm:gap-8",
        isPageLoading &&
          "mx-auto min-h-[70vh] max-w-7xl bg-[#edf2f6] px-4 py-10 sm:px-8 lg:px-16",
        className,
      )}
    >
      {isPageLoading ? (
        <div className="grid gap-8">
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
            <SkeletonBlock className="h-12 w-44 rounded-full bg-slate-200" />
          </div>

          <div className="mx-auto grid w-full max-w-3xl place-items-center gap-3 text-center">
            <SkeletonBlock className="h-5 w-28 rounded-full bg-[#FFF4CC]" />
            <SkeletonBlock className="h-10 w-56 rounded-xl bg-slate-200 sm:h-12 sm:w-80" />
            <SkeletonBlock className="h-4 w-72 rounded bg-slate-200 sm:w-96" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <SkeletonBlock className="h-6 w-40 sm:h-8 sm:w-52" />
          <SkeletonBlock className="h-9 w-28 rounded-full sm:h-10 sm:w-32" />
        </div>
      )}

      <div
        className={
          type === "grid"
            ? cn(
                "grid gap-4 sm:gap-6",
                isPageLoading
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
              )
            : "flex flex-col gap-4 sm:gap-6"
        }
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex w-full items-center gap-4 rounded-xl bg-white p-4 ring-1 ring-[#E5E5E5] sm:p-5"
          >
            <SkeletonBlock className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 sm:h-12 sm:w-12" />

            <div className="flex w-full flex-col gap-2">
              <SkeletonBlock className="h-4 w-3/4 rounded bg-gray-300 sm:h-5" />
              <SkeletonBlock className="h-3 w-1/2 rounded sm:h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CustomerNavigationLoading() {
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
        <div className="h-full w-1/2 animate-[customer-navigation-progress_1.1s_ease-in-out_infinite] rounded-r-full bg-[#FFC736] shadow-[0_0_18px_rgba(255,199,54,0.85)]" />
      </div>

      <style jsx>{`
        @keyframes customer-navigation-progress {
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


