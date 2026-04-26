import SignInForm from "./_components/sign-in-form";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] p-4 sm:p-6 lg:p-10">
      <section className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#E5E5E5] bg-white shadow-xl lg:grid-cols-2">
        <div className="hidden flex-col items-center justify-center bg-[#110843] p-12 text-white lg:flex">
          <div className="flex max-w-sm flex-col items-center gap-6 text-center">
            <img
              src="/assets/logos/logos.svg"
              alt="Logo"
              className="h-14 w-auto object-contain"
            />

            <h2 className="text-3xl font-bold leading-snug">
              Welcome back to{" "}
              <span className="text-[#FFC736]">Everjoy Commerce</span>
            </h2>
            <p className="text-sm text-gray-300">
              Sign in to continue your shopping experience with fast and secure
              checkout.
            </p>

            <img
              src="/assets/icons/signin-hero.svg"
              alt="Login Illustration"
              className="mt-10 max-h-64 object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
          <div className="mt-8 text-center text-sm text-gray-500 lg:hidden">
            &copy; {new Date().getFullYear()} Everjoy Commerce
          </div>
        </div>
      </section>
    </main>
  );
}
