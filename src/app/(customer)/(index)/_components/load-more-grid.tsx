"use client";

import React, { useEffect, useMemo, useState } from "react";

type LoadMoreGridProps = {
  children: React.ReactNode;
  initialCount?: number;
  incrementBy?: number;
  className?: string;
  buttonLabel?: string;
};

export default function LoadMoreGrid({
  children,
  initialCount = 9,
  incrementBy = 9,
  className = "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3",
  buttonLabel = "Load More",
}: LoadMoreGridProps) {
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const [visibleCount, setVisibleCount] = useState(initialCount);

  useEffect(() => {
    setVisibleCount(initialCount);
  }, [initialCount, items.length]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMoreItems = visibleCount < items.length;

  return (
    <div className="grid gap-8">
      <div className={className}>{visibleItems}</div>

      {hasMoreItems && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((current) => current + incrementBy)}
            className="rounded-full bg-[#110843] px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-[#24105e] focus:outline-none focus:ring-4 focus:ring-[#FFC736]/30"
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
}
