export default function AuthLayout({
  children,
  title,
  subtitle,
  illustration,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  illustration?: string;
}) {
  return (
    <div className="min-h-screen bg-[#EFF3FA] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E5E5E5]">
        <div className="hidden lg:flex flex-col items-center justify-center bg-[#110843] text-white p-12">
          <h2 className="text-3xl font-bold text-center leading-snug">
            {title}
          </h2>
          <p className="text-gray-300 mt-4 text-center">{subtitle}</p>
          {illustration && (
            <img
              src={illustration}
              alt="illustration"
              className="mt-10 max-h-64 object-contain"
            />
          )}
        </div>
        <div className="flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14">
          {children}
        </div>
      </div>
    </div>
  );
}
