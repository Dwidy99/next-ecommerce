import SignInForm from "./_components/login-form";

export default function AdminLoginPage() {
  return (
    <main className="admin-auth-bg admin-auth-glow relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-6 sm:px-6 md:px-10">
      <div className="relative z-10 flex w-full items-center justify-center">
        <SignInForm />
      </div>
    </main>
  );
}
