import SignInForm from "./_components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#EFF3FA] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div
        className="
          grid grid-cols-1 lg:grid-cols-2
          w-full max-w-6xl
          bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E5E5E5]
        "
      >
        {/* 🟣 LEFT COLUMN — Illustration / Brand */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-[#110843] text-white p-12">
          <div className="flex flex-col items-center text-center space-y-6 max-w-sm">
            <img
              src="/assets/logos/logos.svg"
              alt="Logo"
              className="h-14 w-auto object-contain"
            />

            <h2 className="text-3xl font-bold leading-snug">
              Welcome back to{" "}
              <span className="text-[#FFC736]">Everjoy Commerce</span>
            </h2>
            <p className="text-gray-300 text-sm">
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

        {/* 🟡 RIGHT COLUMN — Sign In Form */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
          <div className="mt-8 text-sm text-gray-500 text-center lg:hidden">
            © {new Date().getFullYear()} Everjoy Commerce
          </div>
        </div>
      </div>
    </div>
  );
}
