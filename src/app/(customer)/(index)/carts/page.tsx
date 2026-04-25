import { generatePageSEO } from "@/lib/seo/seo-utils";
import Navbar from "../_components/navbar";
import CartClient from "./_components/cart-client";

export async function generateMetadata() {
  return await generatePageSEO({
    title: "Shopping Cart",
    description:
      "Review selected products, adjust quantities, and continue checkout securely.",
    keywords: ["cart", "shopping cart", "checkout"],
    url: "/carts",
  });
}

export default function CartsPage() {
  return (
    <main className="min-h-screen bg-[#edf2f6] pb-16">
      {/* Top strip */}
      <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Shopverse Cart</span>
          <span>Review items - adjust quantity - checkout safely</span>
          <span className="text-[#FFC736]">Secure checkout</span>
        </div>
      </div>

      {/* Header and hero */}
      <header className="bg-[#FFC736] px-4 pb-10 pt-1 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Navbar />

          <section className="relative mt-6 overflow-hidden rounded-[28px] bg-[#110843] p-7 shadow-xl md:p-10">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FFC736]/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 max-w-2xl text-white">
              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#FFC736] backdrop-blur">
                Shopping Cart
              </p>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
                Review your items before checkout.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                Check selected products, update quantities, and continue to the
                checkout form when everything looks right.
              </p>
            </div>
          </section>
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-8 lg:px-16">
        <CartClient />
      </section>
    </main>
  );
}
