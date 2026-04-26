import { generatePageSEO } from "@/lib/seo/seo-utils";
import Link from "next/link";
import { getProfile } from "./lib/data";
import FormProfile from "./_components/form-profile";
import Navbar from "../_components/navbar";

export async function generateMetadata() {
  return await generatePageSEO({
    title: "My Profile",
    description:
      "Manage your customer profile, account photo, and personal information.",
    keywords: ["profile", "account", "customer"],
    url: "/user",
  });
}

export default async function ProfilePage() {
  const res = await getProfile();

  if ("error" in res) {
    return (
      <main className="min-h-screen bg-[#edf2f6] px-4 py-10 sm:px-6">
        <section className="mx-auto flex min-h-screen max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="mx-auto mb-4 inline-flex rounded-full bg-[#FFF4CC] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d99000]">
              Account
            </p>
            <h1 className="text-2xl font-extrabold text-[#110843] sm:text-3xl">
              Unauthorized
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              {res.error} - please sign in to continue.
            </p>
            <Link
              href="/sign-in"
              className="mt-6 inline-flex rounded-full bg-[#110843] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#24105e]"
            >
              Sign In
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#edf2f6] pb-16">
      {/* Top strip */}
      <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Shopverse Account</span>
          <span>Manage profile - update photo - keep data fresh</span>
          <span className="text-[#FFC736]">Customer profile</span>
        </div>
      </div>

      {/* Header and hero */}
      <header className="bg-[#FFC736] px-4 pb-10 pt-1 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Navbar />

          <section className="relative mt-6 overflow-hidden rounded-3xl bg-[#110843] p-7 shadow-xl md:p-10">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FFC736]/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 max-w-2xl text-white">
              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#FFC736] backdrop-blur">
                My Profile
              </p>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
                Keep your account details up to date.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                Update your name and profile photo so checkout and account
                details stay clean and consistent.
              </p>
            </div>
          </section>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-8 lg:px-16">
        <FormProfile initialProfile={res} />
      </section>
    </main>
  );
}
