"use client";

import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingStartedOnRouteRef = useRef<string | null>(null);
  const routeKey = `${pathname}?${searchParams.toString()}`;

  const clearLoadingTimeout = useCallback(() => {
    if (!timeoutRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    loadingStartedOnRouteRef.current = null;
    clearLoadingTimeout();
  }, [clearLoadingTimeout]);

  const startPageLoading = useCallback(() => {
    loadingStartedOnRouteRef.current = routeKey;
    setIsLoading(true);
    clearLoadingTimeout();
    timeoutRef.current = setTimeout(stopLoading, 45000);
  }, [clearLoadingTimeout, routeKey, stopLoading]);

  useEffect(() => {
    if (!isLoading || loadingStartedOnRouteRef.current === routeKey) return;

    const waitForPageContent = () => {
      if (document.querySelector("main")) {
        stopLoading();
      }
    };

    const animationFrame = window.requestAnimationFrame(waitForPageContent);
    const interval = window.setInterval(waitForPageContent, 150);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearInterval(interval);
    };
  }, [isLoading, routeKey, stopLoading]);

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

      startPageLoading();
    };

    document.addEventListener("click", startLoading, true);

    return () => {
      document.removeEventListener("click", startLoading, true);
      clearLoadingTimeout();
    };
  }, [clearLoadingTimeout, startPageLoading, stopLoading]);

  if (!isLoading) return null;

  return (
    <div
      id="customer-page-transition-loading"
      className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden bg-[#edf2f6] text-[#110843]"
    >
      <div className="h-1 w-full overflow-hidden bg-[#110843]/10">
        <div className="h-full w-1/2 animate-[customer-navigation-progress_1.1s_ease-in-out_infinite] rounded-r-full bg-[#FFC736] shadow-[0_0_18px_rgba(255,199,54,0.85)]" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-8 lg:px-16">
        <div className="hidden items-center justify-between rounded-b-2xl bg-[#07111f] px-6 py-2 text-white md:flex">
          <SkeletonBlock className="h-3 w-32 bg-white/20" />
          <SkeletonBlock className="h-3 w-72 bg-white/20" />
          <SkeletonBlock className="h-3 w-24 bg-[#FFC736]/60" />
        </div>

        <div className="mt-4 rounded-[2rem] bg-[#FFC736] p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between rounded-2xl bg-[#110843] px-5 py-4">
            <SkeletonBlock className="h-10 w-36 rounded-full bg-white/15" />
            <div className="hidden items-center gap-3 md:flex">
              <SkeletonBlock className="h-8 w-20 rounded-full bg-white/15" />
              <SkeletonBlock className="h-8 w-24 rounded-full bg-white/15" />
              <SkeletonBlock className="h-9 w-24 rounded-full bg-[#FFC736]/70" />
            </div>
            <SkeletonBlock className="h-10 w-10 rounded-full bg-white/15 md:hidden" />
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl bg-[#110843] p-7 shadow-xl md:p-10">
            <SkeletonBlock className="h-7 w-32 rounded-full bg-white/15" />
            <SkeletonBlock className="mt-5 h-12 max-w-xl bg-white/20 md:h-16" />
            <SkeletonBlock className="mt-4 h-4 max-w-2xl bg-white/15" />
            <SkeletonBlock className="mt-3 h-4 max-w-lg bg-white/15" />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          <div className="hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:block">
            <SkeletonBlock className="h-5 w-28 bg-slate-200" />
            <div className="mt-6 grid gap-3">
              <SkeletonBlock className="h-10 bg-slate-200" />
              <SkeletonBlock className="h-10 bg-slate-200" />
              <SkeletonBlock className="h-10 bg-slate-200" />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6 lg:col-span-3">
            <div className="flex items-end justify-between border-b border-slate-200 pb-4">
              <div>
                <SkeletonBlock className="h-3 w-24 bg-[#FFC736]/60" />
                <SkeletonBlock className="mt-3 h-7 w-36 bg-slate-200" />
              </div>
              <SkeletonBlock className="hidden h-4 w-56 bg-slate-200 sm:block" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
                >
                  <SkeletonBlock className="aspect-square w-full rounded-xl bg-slate-200" />
                  <SkeletonBlock className="mt-4 h-4 w-3/4 bg-slate-200" />
                  <SkeletonBlock className="mt-2 h-3 w-1/2 bg-slate-100" />
                  <SkeletonBlock className="mt-4 h-8 w-full rounded-full bg-[#FFC736]/50" />
                </div>
              ))}
            </div>
          </div>
        </div>
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


