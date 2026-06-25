"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
