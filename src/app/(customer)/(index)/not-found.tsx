import Link from "next/link";
import Navbar from "./_components/navbar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#edf2f6] pb-16">
      {/* Top strip */}
      <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Shopverse</span>
          <span>Page not found - keep shopping safely</span>
          <span className="text-[#FFC736]">404</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#FFC736] px-4 pb-10 pt-1 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Navbar />
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto -mt-2 flex min-h-[60vh] max-w-7xl items-center justify-center px-4 sm:px-8 lg:px-16">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
          <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FFC736]/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-[#110843]/10 blur-3xl" />

          <div className="relative z-10">
            <p className="mx-auto inline-flex rounded-full bg-[#FFF4CC] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d99000]">
              Error 404
            </p>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-[#110843] md:text-5xl">
              This page wandered off the catalog.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
              The page you opened does not exist, may have moved, or the URL is
              mistyped. Let&apos;s get you back to a working shopping path.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="rounded-full bg-[#110843] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#24105e]"
              >
                Back to Home
              </Link>
              <Link
                href="/catalogs"
                className="rounded-full border border-[#110843]/15 bg-white px-6 py-3 text-sm font-bold text-[#110843] transition hover:bg-[#FFF4CC]"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
