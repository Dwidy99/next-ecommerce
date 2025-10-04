import { getUser } from "@/lib/auth";
import Link from "next/link";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  const { user } = await getUser();

  return (
    <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#110843] p-5 rounded-2xl shadow-md">
      {/* Logo */}
      <Link href="/">
        <img src="/assets/logos/logo.svg" alt="logo" className="w-auto h-8" />
      </Link>

      {/* Menu */}
      <ul className="flex items-center gap-[30px]">
        {["Shop", "Categories", "Payments"].map((item) => (
          <li
            key={item}
            className="hover:text-[#FFC736] text-white transition-all duration-200"
          >
            <Link
              href={
                item === "Shop"
                  ? "/catalogs"
                  : item === "Categories"
                  ? "/categories"
                  : "/payment/purchase-history"
              }
              className="font-medium"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Client side user actions */}
      <NavbarClient user={user} />
    </nav>
  );
}
