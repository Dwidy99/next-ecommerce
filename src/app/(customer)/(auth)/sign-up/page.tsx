import SignUpForm from "./_components/signup-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#EFF3FA] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div
        className="
          grid grid-cols-1 lg:grid-cols-2 
          w-full max-w-6xl 
          bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E5E5E5]
        "
      >
        {/* 🟣 LEFT COLUMN — BRAND / ILLUSTRATION */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-[#110843] text-white p-12">
          <div className="flex flex-col items-center text-center space-y-6 max-w-sm">
            <img
              src="/assets/logos/logos.svg"
              alt="Logo"
              className="h-14 w-auto object-contain"
            />

            <h2 className="text-3xl font-bold leading-snug">
              Join <span className="text-[#FFC736]">Everjoy Commerce</span>
            </h2>
            <p className="text-gray-300 text-sm">
              Fast, easy, and secure shopping experience. Create your free
              account and start your journey!
            </p>

            {/* Decorative Illustration */}
            <img
              src="/assets/icons/sign-up-amico.svg"
              alt="Illustration"
              className="mt-10 max-h-64 object-contain"
            />
          </div>
        </div>

        {/* 🟡 RIGHT COLUMN — FORM */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <SignUpForm />
          </div>
          <div className="mt-8 text-sm text-gray-500 text-center lg:hidden">
            © {new Date().getFullYear()} Everjoy Commerce
          </div>
        </div>
      </div>
    </div>
  );
}
