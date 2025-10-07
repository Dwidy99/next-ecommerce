// src/app/(customer)/(index)/profile/page.tsx
import { getProfile } from "./lib/data";
import FormProfile from "./_components/form-profile";
import Navbar from "../_components/navbar";

export default async function ProfilePage() {
  const res = await getProfile();

  if ("error" in res) {
    return (
      <main className="container max-w-[1130px] mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Unauthorized</h1>
        <p className="text-gray-600">
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
      <header className="bg-[#FFF9D9] pt-[30px] h-[351px] -mb-[181px]">
        <Navbar />
      </header>
      <main className="container max-w-[1130px] mx-auto py-20">
        <FormProfile initialProfile={res} />
      </main>
    </>
  );
}
