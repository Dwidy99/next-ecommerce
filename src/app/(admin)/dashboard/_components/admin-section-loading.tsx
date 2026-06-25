import { Card, CardContent, CardHeader } from "@/components/ui/card";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className}`} />;
}

export function AdminStatsLoading({ count = 2 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-5 w-5 bg-white/20" />
            <div className="grid flex-1 gap-2">
              <SkeletonBlock className="h-7 w-16 bg-white/20" />
              <SkeletonBlock className="h-3 w-28 bg-white/15" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminTableLoading({ rows = 5 }: { rows?: number }) {
  return (
    <div className="grid gap-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="grid gap-3 rounded-xl border p-4 md:grid-cols-[1.4fr_1fr_0.8fr]"
        >
          <SkeletonBlock className="h-10" />
          <SkeletonBlock className="h-10" />
          <SkeletonBlock className="h-10" />
        </div>
      ))}
    </div>
  );
}

export function AdminCardTableLoading() {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader className="grid gap-3">
        <SkeletonBlock className="h-6 w-44" />
        <SkeletonBlock className="h-4 w-full max-w-md" />
      </CardHeader>
      <CardContent>
        <AdminTableLoading />
      </CardContent>
    </Card>
  );
}

export function AdminListPageLoading({ stats = 2 }: { stats?: number }) {
  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div className="grid gap-4">
            <SkeletonBlock className="h-6 w-40 bg-white/20" />
            <SkeletonBlock className="h-10 w-full max-w-xl bg-white/20" />
            <SkeletonBlock className="h-5 w-full max-w-2xl bg-white/15" />
          </div>
          <AdminStatsLoading count={stats} />
        </div>
      </section>

      <AdminCardTableLoading />
    </div>
  );
}
