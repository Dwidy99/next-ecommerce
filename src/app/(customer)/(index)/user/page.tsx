import { getProfile } from "./lib/data";
import FormProfile from "./_components/form-profile";
import Navbar from "../_components/navbar";

export default async function ProfilePage() {
  const res = await getProfile();

  if ("error" in res) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Unauthorized
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          {res.error} — please{" "}
          <a href="/sign-in" className="text-[#110843] font-semibold underline">
            sign in
          </a>{" "}
          to continue.
        </p>
      </main>
    );
  }

  return (
    <>
      <header className="bg-[#FFF9D9] py-8 sm:py-1 px-4 sm:px-8 lg:px-16 h-[280px] md:h-[320px] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9D9] to-transparent" />
        <Navbar />
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 -mt-24 md:-mt-28 pb-20">
        <FormProfile initialProfile={res} />
      </main>
    </>
  );
}
