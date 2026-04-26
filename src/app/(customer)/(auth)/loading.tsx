import Loading from "../_components/loading-skeleton";

export default function AuthPageLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf2f6] px-4 py-10">
      <section className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <Loading count={3} type="list" />
      </section>
    </main>
  );
}
