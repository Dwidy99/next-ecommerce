// app/layout.tsx
import { Poppins } from "next/font/google";
import "@/app/globalsLanding.css";
import { Toaster } from "sonner";
import Footer from "./_components/footer";
import Link from "next/link";
import Image from "next/image";
import { getSiteConfig } from "@/lib/seo/config";
import { defaultMetadata } from "@/lib/seo/default-metadata";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext"],
});

export async function generateMetadata() {
  const config = await getSiteConfig("ID");
  return {
    ...defaultMetadata,
    title: config.title,
    description: config.description,
    icons: { icon: config.icon },
  };
}

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={poppins.className}>
      <div className="lg:hidden md:hidden w-full bg-white border-b border-gray-100 shadow-sm py-3 px-4 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logos/logos-black.svg"
              alt="Shopverse logo"
              width={120}
              height={32}
              className="w-auto h-8 object-contain"
              priority
            />
          </Link>

          {/* 🔹 Tambahkan tombol cart kecil di mobile */}
          <Link href="/carts" className="flex items-center">
            <Image
              src="/assets/icons/cart.svg"
              alt="cart"
              width={26}
              height={26}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
      {children}
      <Footer />
      <Toaster richColors position="top-center" />
    </div>
  ); // jangan pakai <html> atau <body>
}
