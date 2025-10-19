import { getUser } from "@/lib/auth";
import { prisma } from "lib/prisma";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  const { user } = await getUser();

  // 🔹 Fetch kategori dari database
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });

  return <NavbarClient user={user} categories={categories} />;
}
