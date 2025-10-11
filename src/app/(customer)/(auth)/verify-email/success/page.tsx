export default function VerifyEmailSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFF3FA]">
      <div className="bg-white p-10 rounded-3xl border border-gray-200 shadow-md max-w-md text-center">
        <img
          src="/assets/logos/logos-black.svg"
          alt="Logo"
          className="mx-auto mb-6 max-h-12"
        />
        <h1 className="text-2xl font-bold text-[#110843] mb-3">
          Email Verified 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your email has been successfully verified. You can now sign in to your
          account.
        </p>
        <a
          href="/sign-in"
          className="inline-block px-6 py-3 rounded-full bg-[#110843] text-white font-semibold hover:bg-[#3a2086] transition"
        >
          Go to Sign In
        </a>
      </div>
    </div>
  );
}
