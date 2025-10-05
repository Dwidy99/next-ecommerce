// app/layout.tsx
import { Poppins } from "next/font/google";
import "@/app/globalsLanding.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "Shopverse",
  description: "Next-gen shopping experience",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={poppins.className}>
      {children}
      <Toaster richColors position="top-center" />
    </div>
  ); // jangan pakai <html> atau <body>
}
