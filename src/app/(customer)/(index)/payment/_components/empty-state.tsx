"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  showBackButton?: boolean;
};

export default function EmptyState({
  title = "No transactions yet",
  message = "You haven't made any purchases yet. Start exploring our products and find what you love!",
  actionLabel = "Go Shopping",
  actionHref = "/catalogs",
  showBackButton = false,
}: EmptyStateProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
      {/* 🔹 Illustration */}
      <div className="relative w-52 h-52 md:w-64 md:h-64 mb-8">
        <Image
          src="/assets/icons/empty-cart.svg"
          alt="Empty state illustration"
          fill
          className="object-contain opacity-90"
          priority
        />
      </div>

      {/* 🔹 Text */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#110843] mb-3">
        {title}
      </h1>
      <p className="text-gray-600 text-sm md:text-base max-w-md mb-8 leading-relaxed">
        {message}
      </p>

      {/* 🔹 Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href={actionHref}>
          <Button className="flex items-center gap-2 bg-[#110843] hover:bg-[#2b127a] text-white rounded-full px-6 py-3">
            <ShoppingCart className="w-4 h-4" /> {actionLabel}
          </Button>
        </Link>

        {showBackButton && (
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full border-[#110843] text-[#110843] hover:bg-[#110843]/5 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4" /> Back Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
