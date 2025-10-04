// app/layout.tsx
import { Poppins } from "next/font/google";
import "@/app/globalsLanding.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={poppins.className}>
      {children}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          className: "rounded-xl shadow-lg",
          style: { background: "#110843", color: "white" },
        }}
      />
    </div>
  ); // jangan pakai <html> atau <body>
}
