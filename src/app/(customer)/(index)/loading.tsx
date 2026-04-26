import Loading from "../_components/loading-skeleton";

export default function CustomerPageLoading() {
  return (
    <main className="min-h-screen bg-[#edf2f6] px-4 py-10 sm:px-8 lg:px-16">
      <section className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <Loading count={8} type="grid" />
      </section>
    </main>
  );
}
