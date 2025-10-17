// src/app/(admin)/dashboard/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardShell from "./_components/dashboard-shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard Panel",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getUser();
  if (!session) return redirect("/dashboard/sign-in");

  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
