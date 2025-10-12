import { getUser } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "lib/prisma";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  const { user } = await getUser();

  // 🔹 Ambil daftar kategori dari database
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#110843] px-6 py-4 rounded-2xl shadow-md relative">
      {/* 🔸 Logo */}
      <Link href="/">
        <img
          src="/assets/logos/logos.svg"
          alt="logo"
          className="h-8 md:h-10 w-auto object-contain"
        />
      </Link>

      {/* 🔸 Menu Utama */}
      <ul className="flex items-center gap-8 text-white font-medium">
        <li className="hover:text-[#FFC736] transition-all duration-200">
          <Link href="/catalogs">Shop</Link>
        </li>

        {/* 🔹 Dropdown Categories */}
        <li className="relative group cursor-pointer">
          <span className="hover:text-[#FFC736] transition-all duration-200">
            Categories
          </span>

          {/* Dropdown menu */}
          <ul
            className="
              absolute left-0 top-[100%]
              hidden group-hover:flex flex-col
              min-w-[160px] bg-white text-[#110843]
              rounded-lg shadow-md z-50 border border-gray-100
              opacity-0 group-hover:opacity-100
              translate-y-2 group-hover:translate-y-0
              transition-all duration-200 ease-out hover:rounded-xl hover:shadow-sm

            "
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.name}`}
                    className="
    block px-4 py-[6px] text-[15px] rounded-md
    hover:bg-[#FFF2B3] hover:text-[#110843]
    hover:rounded-lg hover:scale-[1.02]
    transition-all duration-200 ease-out
  "
                  >
                    {cat.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-[6px] text-gray-500 text-sm">
                No categories
              </li>
            )}
          </ul>
        </li>

        <li className="hover:text-[#FFC736] transition-all duration-200">
          <Link href="/payment/purchase-history">Payments</Link>
        </li>
      </ul>

      {/* 🔸 Client-side actions (Cart, Avatar, Logout) */}
      <NavbarClient user={user} />
    </nav>
  );
}
