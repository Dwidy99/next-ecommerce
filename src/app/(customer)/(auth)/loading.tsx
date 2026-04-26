export default function AuthPageLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf2f6] px-4 py-10">
      <section className="w-full max-w-md animate-pulse rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mx-auto h-12 w-36 rounded-xl bg-[#FFF4CC]" />
        <div className="mt-8 h-8 w-9/12 rounded bg-slate-200" />
        <div className="mt-3 h-4 w-7/12 rounded bg-slate-200" />

        <div className="mt-8 space-y-4">
          <div className="h-12 rounded-xl bg-slate-100" />
          <div className="h-12 rounded-xl bg-slate-100" />
          <div className="h-12 rounded-full bg-[#FFC736]/70" />
        </div>
      </section>
    </main>
  );
}
