import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardShell from "./_components/dashboard-shell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getUser();

  if (!session) redirect("/login");

  return <DashboardShell>{children}</DashboardShell>;
}
