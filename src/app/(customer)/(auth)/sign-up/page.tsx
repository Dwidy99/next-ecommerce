import SignUpForm from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF3FA] p-4 sm:p-6 lg:p-10">
      <section className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#E5E5E5] bg-white shadow-xl lg:grid-cols-2">
        <div className="hidden flex-col items-center justify-center bg-[#110843] p-12 text-white lg:flex">
          <div className="grid max-w-sm gap-6 text-center">
            <img
              src="/assets/logos/logos.svg"
              alt="Logo"
              className="mx-auto h-14 w-auto object-contain"
            />

            <h2 className="text-3xl font-bold leading-snug">
              Join <span className="text-[#FFC736]">Shopverse</span>
            </h2>
            <p className="text-sm text-gray-300">
              Fast, easy, and secure shopping experience. Create your free
              account and start your journey!
            </p>

            <img
              src="/assets/icons/sign-up-amico.svg"
              alt="Illustration"
              className="mx-auto mt-4 max-h-64 object-contain"
            />
          </div>
        </div>

        <div className="grid place-items-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <SignUpForm />
          </div>
        </div>
      </section>
    </main>
  );
}
