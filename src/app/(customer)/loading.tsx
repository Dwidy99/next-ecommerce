"use client";

import { cn } from "@/lib/utils";
import type { CustomerLoadingProps } from "./types";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-gray-200", className)} />
  );
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
