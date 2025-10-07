// app/(customer)/(auth)/sign-in/page.tsx
import Navbar from "../../(index)/_components/navbar";
import SignInForm from "./_components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="bg-[#EFF3FA] min-h-screen pb-[50px] flex flex-col">
      <header className="bg-[#FFF9D9] pt-[30px] h-[351px] -mb-[181px]">
        <Navbar />
      </header>

      {/* ✅ Tambahkan wrapper flexbox untuk centering */}
      <main className="flex flex-1 justify-center items-center">
        <SignInForm />
      </main>
    </div>
  );
}
