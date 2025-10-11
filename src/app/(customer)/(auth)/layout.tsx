import { Poppins } from "next/font/google";
import React, { ReactNode } from "react";
import "../../globalsLanding.css";
import { Toaster } from "sonner";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "Shopverse",
  description: "Next-gen shopping experience",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-96x96.png",
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

export default async function AuthRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { session, user } = await getUser();
  if (session && user.role === "customer") {
    return redirect("/catalogs");
  }

  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
