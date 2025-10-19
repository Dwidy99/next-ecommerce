import React from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] text-white text-center py-10 px-4 sm:px-8 lg:px-16">
      {/* 🔹 Contact Section */}
      <h3 className="uppercase text-lg font-semibold mt-2 mb-4 tracking-wide">
        Contact Us
      </h3>

      <div className="flex flex-col items-center justify-center gap-3 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
        <div className="flex items-start justify-center gap-2 text-gray-300">
          <MapPin className="w-5 h-5 shrink-0 text-[#FFC736]" />
          <p>
            Green Valley Residence, Block D7 No.15, Jl. Raya Sukamaju,
            Pagedangan, Tangerang Selatan, Banten, 15339 – Indonesia
          </p>
        </div>

        <div className="flex items-start justify-center gap-2 text-gray-300">
          <Clock className="w-5 h-5 shrink-0 text-[#FFC736]" />
          <p>
            Monday – Saturday: 9:00 AM – 9:00 PM | Sunday & Public Holidays:
            Closed
          </p>
        </div>

        <div className="flex items-start justify-center gap-2 text-gray-300 flex-wrap">
          <Phone className="w-5 h-5 shrink-0 text-[#FFC736]" />
          <p>
            0812-2208-6355 | 0816-1754-1639 | 0877-3357-4341 | 0859-4707-4368
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-300">
          <Mail className="w-5 h-5 shrink-0 text-[#FFC736]" />
          <p>support@shopverse.com</p>
        </div>
      </div>

      {/* 🔹 Follow Us */}
      <h3 className="uppercase text-lg font-semibold mt-10 mb-4 tracking-wide">
        Follow Us
      </h3>

      <div className="flex justify-center items-center gap-6">
        <Link
          href="https://www.instagram.com"
          target="_blank"
          className="hover:text-[#FFC736] transition-transform transform hover:scale-110"
        >
          <Instagram className="w-7 h-7" />
        </Link>
        <Link
          href="https://www.facebook.com"
          target="_blank"
          className="hover:text-[#FFC736] transition-transform transform hover:scale-110"
        >
          <Facebook className="w-7 h-7" />
        </Link>
        <Link
          href="https://www.youtube.com"
          target="_blank"
          className="hover:text-[#FFC736] transition-transform transform hover:scale-110"
        >
          <Youtube className="w-7 h-7" />
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          className="hover:text-[#FFC736] transition-transform transform hover:scale-110"
        >
          <Twitter className="w-7 h-7" />
        </Link>
      </div>

      {/* 🔹 Divider & Copyright */}
      <hr className="border-gray-700 my-8 w-11/12 mx-auto" />
      <p className="text-xs sm:text-sm text-gray-400">
        © 2025 Dwi – Shopverse. All Rights Reserved.
      </p>
    </footer>
  );
}
