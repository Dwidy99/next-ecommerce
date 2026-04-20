import { rupiahFormat } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { getBrands, getCategories, getProducts } from "../lib/data"

const benefits = [
  {
    icon: "/assets/icons/crown.svg",
    title: "Quality",
    description: "Curated gadgets",
  },
  {
    icon: "/assets/icons/box.svg",
    title: "Ready Stock",
    description: "Fast processing",
  },
  {
    icon: "/assets/icons/tick-circle.svg",
    title: "Secure",
    description: "Safe checkout",
  },
  {
    icon: "/assets/icons/call.svg",
    title: "Support",
    description: "Friendly help",
  },
  {
    icon: "/assets/icons/cart.svg",
    title: "Delivery",
    description: "Track orders",
  },
]

const categoryIcons = [
  "/assets/icons/mobile.svg",
  "/assets/icons/monitor.svg",
  "/assets/icons/airpods.svg",
  "/assets/icons/watch.svg",
  "/assets/icons/game.svg",
  "/assets/icons/lamp.svg",
  "/assets/icons/box.svg",
  "/assets/icons/tag.svg",
]

const promoTiles = [
  {
    title: "Custom Daily Driver",
    subtitle: "Bundle laptop, phone, and accessories",
    image: "/assets/banners/1.jpg",
  },
  {
    title: "Office Setup",
    subtitle: "Clean desk essentials for better focus",
    image: "/assets/banners/2.jpg",
  },
  {
    title: "Audio Collection",
    subtitle: "Wireless sound for work and travel",
    image: "/assets/banners/3.jpg",
  },
  {
    title: "Smart Companion",
    subtitle: "Devices that keep your day moving",
    image: "/assets/banners/4.jpg",
  },
  {
    title: "Accessories Drop",
    subtitle: "Small upgrades, big daily impact",
    image: "/assets/banners/5.jpg",
  },
  {
    title: "Need a Bulk Order?",
    subtitle: "Talk with us for team and community packages.",
    image: "/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png",
  },
]

const articles = [
  {
    title: "How to Choose a Laptop for Work and Study",
    image: "/assets/banners/1.jpg",
    meta: "Tips • 5 min read",
  },
  {
    title: "Simple Ways to Build a Cleaner Desk Setup",
    image: "/assets/banners/2.jpg",
    meta: "Guide • 4 min read",
  },
  {
    title: "Accessories That Make Checkout Worth It",
    image: "/assets/banners/3.jpg",
    meta: "Review • 3 min read",
  },
]

function SectionTitle({
  title,
  highlight,
  description,
}: {
  title: string
  highlight?: string
  description?: string
}) {
  return (
    <div className="mx-auto mb-7 flex w-full max-w-3xl items-center gap-4 text-center">
      <div className="h-px flex-1 bg-slate-300" />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
          {title}{" "}
          {highlight && <span className="text-[#d99000]">{highlight}</span>}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      <div className="h-px flex-1 bg-slate-300" />
    </div>
  )
}

export function HomeTopStrip() {
  return (
    <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <span>Shopverse Commerce</span>
        <span>Gadget store • Bundle setup • Fast checkout</span>
        <span className="text-[#FFC736]">Online support</span>
      </div>
    </div>
  )
}

export function HomeHero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 md:px-6">
      <div className="relative overflow-hidden rounded-[22px] bg-[#110843] shadow-sm ring-1 ring-black/5">
        <Image
          src="/assets/banners/5.jpg"
          alt="Shopverse gadget banner"
          width={1800}
          height={720}
          priority
          className="h-[360px] w-full object-cover md:h-[520px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#110843]/90 via-[#110843]/55 to-black/10" />
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FFC736]/25 blur-3xl" />
        <div className="absolute inset-0 flex items-center px-6 md:px-14">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#FFC736] backdrop-blur">
              Shopverse picks
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Temukan gadget pilihan untuk kerja, belajar, dan hiburan.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
              Belanja produk berkualitas dengan kategori rapi, checkout cepat,
              dan pengalaman katalog yang nyaman.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/catalogs"
                className="rounded-md bg-[#FFC736] px-7 py-3 text-sm font-bold text-[#110843] shadow-lg shadow-yellow-950/20 transition hover:bg-[#ffda63]"
              >
                Klik untuk Selengkapnya
              </Link>
              <Link
                href="/carts"
                className="rounded-md bg-white/15 px-7 py-3 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/25"
              >
                Lihat Keranjang
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
          {[0, 1, 2, 3, 4].map((item) => (
            <span
              key={item}
              className={`h-2 rounded-full ${
                item === 0 ? "w-8 bg-[#FFC736]" : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function BenefitStrip() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 md:grid-cols-5 md:px-6">
      {benefits.map((benefit) => (
        <div
          key={benefit.title}
          className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-[#FFC736]"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF4CC]">
            <Image src={benefit.icon} alt="" width={18} height={18} />
          </span>
          <span>
            <span className="block text-sm font-bold text-slate-950">
              {benefit.title}
            </span>
            <span className="block text-xs text-slate-500">
              {benefit.description}
            </span>
          </span>
        </div>
      ))}
    </section>
  )
}

export async function CompactCategoryGrid() {
  const categories = await getCategories()

  if (categories.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <SectionTitle
        title="Kategori"
        highlight="Produk"
        description="Pilih kategori yang paling sesuai dengan kebutuhanmu."
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.slice(0, 10).map((category: any, index: number) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug ?? category.id}`}
            className={`group flex items-center gap-3 rounded-xl px-4 py-3 shadow-sm ring-1 transition ${
              index === 7
                ? "bg-[#110843] text-white ring-[#110843]"
                : "bg-white text-slate-950 ring-slate-200 hover:-translate-y-0.5 hover:ring-[#FFC736]"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                index === 7 ? "bg-[#FFC736]/20" : "bg-[#FFF4CC]"
              }`}
            >
              <Image
                src={categoryIcons[index % categoryIcons.length]}
                alt=""
                width={18}
                height={18}
              />
            </span>
            <span>
              <span className="block text-sm font-bold leading-tight">
                {category.name}
              </span>
              <span
                className={`text-xs ${
                  index === 7 ? "text-white/65" : "text-slate-500"
                }`}
              >
                {category._count?.products ?? 0} item
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function PromoMosaic() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <div className="grid gap-4 md:grid-cols-3">
        {promoTiles.slice(0, 6).map((tile, index) => (
          <Link
            key={tile.title}
            href="/catalogs"
            className={`group relative min-h-[190px] overflow-hidden rounded-xl bg-slate-900 shadow-sm ${
              index === 5 ? "md:col-span-3 md:min-h-[360px]" : ""
            }`}
          >
            <Image
              src={tile.image}
              alt={tile.title}
              width={900}
              height={520}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#FFC736]">
                Custom
              </p>
              <h3 className="mt-2 max-w-md text-2xl font-extrabold leading-none">
                {tile.title}
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/75">
                {tile.subtitle}
              </p>
              {index === 5 && (
                <span className="mt-5 w-fit rounded-md bg-[#FFC736] px-5 py-2 text-sm font-bold text-[#110843]">
                  Info Selengkapnya
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export async function ProductScroller() {
  const products = await getProducts()

  if (products.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionTitle
        title="Merchandise"
        highlight="Terlaris"
        description="Produk populer yang paling sering dilihat pelanggan."
      />
      <div className="flex gap-4 overflow-x-auto pb-5">
        {products.slice(0, 8).map((product: any, index: number) => (
          <Link
            key={product.id}
            href={`/detail-product/${product.id}`}
            className="group w-[230px] shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-[250px] bg-[#FFF4CC]">
              <Image
                src={product.image_url || "/assets/products/placeholder.svg"}
                alt={product.name}
                width={420}
                height={420}
                className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 rounded-full bg-[#ff5b2e] px-3 py-1 text-[10px] font-bold text-white">
                {index % 2 === 0 ? "HOT" : "NEW"}
              </span>
            </div>
            <div className="border-t-4 border-[#FFC736] p-4">
              <p className="line-clamp-1 text-sm font-bold text-slate-950">
                {product.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {product.category?.name ?? "Product"}
              </p>
              <p className="mt-3 text-sm font-extrabold text-[#d99000]">
                {rupiahFormat(Number(product.price))}
              </p>
              <span className="mt-4 block rounded-md bg-[#FFC736] py-2 text-center text-xs font-bold text-[#110843] transition group-hover:bg-[#ffda63]">
                Add to Buy
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export async function CollaborationSection() {
  const brands = await getBrands()

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionTitle
        title="Kolaborasi"
        description="Partner dan brand yang tersedia di katalog Shopverse."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {["Kolaborasi", "Potensi", "Manfaat"].map((title, index) => (
          <div
            key={title}
            className="rounded-xl bg-white p-7 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-[#FFC736]"
          >
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4CC]">
              <Image
                src={benefits[index].icon}
                alt=""
                width={18}
                height={18}
              />
            </div>
            <h3 className="font-bold uppercase tracking-wide text-slate-950">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Bangun pengalaman belanja yang rapi, cepat, dan mudah
              dikembangkan.
            </p>
          </div>
        ))}
      </div>

      {brands.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {brands.slice(0, 4).map((brand: any) => (
            <div
              key={brand.id}
              className="flex min-h-[110px] items-center justify-center rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:ring-[#FFC736]"
            >
              <Image
                src={brand.logo_url || "/assets/logos/logo-black.svg"}
                alt={brand.logo}
                width={180}
                height={70}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export function ArticleSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionTitle
        title="Artikel"
        highlight="Terbaru"
        description="Inspirasi singkat untuk memilih produk dengan lebih percaya diri."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.title}
            className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-[#FFC736]"
          >
            <Image
              src={article.image}
              alt={article.title}
              width={700}
              height={380}
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {article.meta}
              </p>
              <h3 className="mt-2 line-clamp-2 text-base font-bold leading-6 text-slate-950">
                {article.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

