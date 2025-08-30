import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Dashboard",
  description: "Admin dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {session, user} = await getUser();
  if(session && user.role === "superadmin") {
    return redirect('/dashboard')
  }

  return (
    <div className="dashboard-layout">{children}</div>
  );
}
