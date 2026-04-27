import AdminLoginForm from "./_components/login-form";

export default function AdminLoginPage() {
  return (
    <main className="admin-auth-bg admin-auth-glow relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-10">
      <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-[#110843] p-10 text-white lg:flex">
          <div>
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#FFC736]">
              Shopverse Admin
            </div>
            <h1 className="mt-6 max-w-sm text-4xl font-bold leading-tight">
              Manage products, orders, and customers in one clean workspace.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
              A focused dashboard experience built with shadcn UI patterns and
              simple feature-based structure.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            {["Products", "Orders", "Customers"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <p className="font-semibold text-[#FFC736]">{item}</p>
                <p className="mt-1 text-xs text-white/60">Quick access</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
