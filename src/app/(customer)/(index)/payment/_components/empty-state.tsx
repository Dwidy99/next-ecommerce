"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import type { EmptyStateProps } from "@/app/(customer)/types";

export default function EmptyState({
  title = "No transactions yet",
  message = "You have not made any purchases yet. Start exploring our products and find something worth checking out.",
  actionLabel = "Go Shopping",
  actionHref = "/catalogs",
  showBackButton = false,
}: EmptyStateProps) {
  return (
    <main className="bg-[#f7f4ea] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-3xl border border-[#f1d78a] bg-white shadow-xl">
          <div className="bg-[#110843] px-6 py-10 text-center text-white md:px-10">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC736]">
              Purchase History
            </span>
            <h1 className="mt-5 text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75 md:text-base">
              {message}
            </p>
          </div>

          <div className="flex flex-col items-center px-6 py-10 text-center md:px-10">
            <div className="relative mb-8 h-52 w-52 md:h-64 md:w-64">
              <Image
                src="/assets/icons/empty-cart.svg"
                alt="Empty state illustration"
                fill
                className="object-contain opacity-95"
                priority
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={actionHref}>
                <Button className="h-12 rounded-full bg-[#110843] px-6 text-white hover:bg-[#24105f]">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {actionLabel}
                </Button>
              </Link>

              {showBackButton && (
                <Link href="/">
                  <Button
                    variant="outline"
                    className="h-12 rounded-full border-[#110843]/15 px-6 text-[#110843] hover:bg-[#110843]/5"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back Home
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
