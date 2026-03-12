"use client";

interface LoadingProps {
  count?: number;
  type?: "grid" | "list";
}

export default function Loading({ count = 4, type = "grid" }: LoadingProps) {
  return (
    <section
      id="loading-skeleton"
      className="flex w-full animate-pulse flex-col gap-6 sm:gap-8"
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="h-6 w-40 rounded-md bg-gray-200 sm:h-8 sm:w-52" />
        <div className="h-9 w-28 rounded-full bg-gray-200 sm:h-10 sm:w-32" />
      </div>

      <div
        className={
          type === "grid"
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
            : "flex flex-col gap-4 sm:gap-6"
        }
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex w-full items-center gap-4 rounded-xl bg-white p-4 ring-1 ring-[#E5E5E5] sm:p-5"
          >
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 sm:h-12 sm:w-12" />

            <div className="flex w-full flex-col gap-2">
              <div className="h-4 w-3/4 rounded bg-gray-300 sm:h-5" />
              <div className="h-3 w-1/2 rounded bg-gray-200 sm:h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
