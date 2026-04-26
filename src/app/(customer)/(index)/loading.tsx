export default function CustomerPageLoading() {
  return (
    <main className="min-h-screen bg-[#edf2f6] pb-16">
      {/* Top strip */}
      <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Shopverse</span>
          <span>Loading your shopping experience</span>
          <span className="text-[#FFC736]">Please wait</span>
        </div>
      </div>

      {/* Header and hero skeleton */}
      <header className="bg-[#FFC736] px-4 pb-10 pt-4 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="h-[68px] animate-pulse rounded-[20px] bg-white/70 shadow-sm" />

          <section className="relative mt-6 overflow-hidden rounded-[28px] bg-[#110843] p-7 shadow-xl md:p-10">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FFC736]/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 max-w-2xl animate-pulse">
              <div className="h-9 w-40 rounded-full bg-white/15" />
              <div className="mt-5 h-10 w-11/12 rounded-xl bg-white/20 md:h-14" />
              <div className="mt-3 h-10 w-8/12 rounded-xl bg-white/20 md:h-14" />
              <div className="mt-5 h-4 w-10/12 rounded bg-white/15" />
              <div className="mt-3 h-4 w-7/12 rounded bg-white/15" />
            </div>
          </section>
        </div>
      </header>

      {/* Main content skeleton */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-8 lg:px-16">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex animate-pulse flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="mt-3 h-8 w-56 rounded bg-slate-200" />
            </div>
            <div className="h-4 w-72 rounded bg-slate-200" />
          </div>

          <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="h-36 rounded-xl bg-[#FFF4CC] sm:h-44" />
                <div className="mt-4 h-4 w-10/12 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-6/12 rounded bg-slate-200" />
                <div className="mt-5 h-5 w-5/12 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
