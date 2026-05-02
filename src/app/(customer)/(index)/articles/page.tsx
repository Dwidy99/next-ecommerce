import { CalendarDays, Eye, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../_components/navbar";
import NoData from "../_components/no-data";
import LoadMoreGrid from "../_components/load-more-grid";
import { generatePageSEO } from "@/lib/seo/seo-utils";
import type {
  ArticlesPageProps,
  CustomerArticleItem,
} from "@/app/(customer)/types";
import { getArticles } from "./lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await generatePageSEO({
    title: "Articles",
    description:
      "Read Shopverse articles, guides, and product inspiration for smarter shopping decisions.",
    keywords: ["articles", "guides", "shopverse", "shopping tips"],
    url: "/articles",
  });
}

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params = await searchParams;
  const search = params?.search ?? "";
  const sort = params?.sort ?? "newest";
  const articles = await getArticles({ search, sort });

  return (
    <main className="min-h-screen bg-[#edf2f6] pb-16">
      <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Shopverse Articles</span>
          <span>Buying guides - setup ideas - smarter checkout</span>
          <span className="text-[#FFC736]">Fresh reads</span>
        </div>
      </div>

      <header className="border-b border-slate-200 bg-white px-4 pt-1 shadow-sm sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Navbar />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-8 lg:px-16">
        <p className="mx-auto mb-4 inline-flex rounded-full bg-[#FFF4CC] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#d99000]">
          Articles
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#110843] md:text-5xl">
          Articles
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
          Insights, guides, and product inspiration from the Shopverse catalog
          ecosystem.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <form className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_180px_130px]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                name="search"
                defaultValue={search}
                placeholder="Search articles..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-[#110843] outline-none transition placeholder:text-slate-400 focus:border-[#FFC736] focus:bg-white focus:ring-4 focus:ring-[#FFC736]/20"
              />
            </label>

            <select
              name="sort"
              defaultValue={sort}
              className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-[#110843] outline-none transition focus:border-[#FFC736] focus:bg-white focus:ring-4 focus:ring-[#FFC736]/20"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title A-Z</option>
            </select>

            <button
              type="submit"
              className="h-12 rounded-xl bg-[#FFC736] px-5 text-sm font-extrabold text-[#110843] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ffda63]"
            >
              Apply
            </button>
          </div>
        </form>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-8 lg:px-16">
        {articles.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <NoData
              title="No articles found"
              message="Try another keyword or reset the article filter."
            />
          </div>
        ) : (
          <LoadMoreGrid
            initialCount={9}
            incrementBy={5}
            buttonLabel="Load More Articles"
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </LoadMoreGrid>
        )}
      </section>
    </main>
  );
}

function ArticleCard({ article }: { article: CustomerArticleItem }) {
  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#FFC736] hover:shadow-xl hover:shadow-slate-200/70">
      <Link
        href={`/articles/${article.slug}`}
        className="block overflow-hidden rounded-xl bg-slate-100"
      >
        <Image
          src={article.image}
          alt={article.title}
          width={760}
          height={430}
          className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <Link href={`/articles/${article.slug}`}>
          <h2 className="line-clamp-2 text-xl font-extrabold leading-7 text-[#110843] transition group-hover:text-[#d99000]">
            {article.title}
          </h2>
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-[#d99000]" />
            {formatArticleDate(article.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-[#d99000]" />
            {getReadableViews(article.id)}
          </span>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-500">
          {article.excerpt}
        </p>

        <Link
          href={`/articles/${article.slug}`}
          className="mt-5 inline-flex w-fit rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#FFC736] hover:bg-[#FFF4CC] hover:text-[#110843]"
        >
          Read
        </Link>
      </div>
    </article>
  );
}

function formatArticleDate(date: Date | null) {
  if (!date) return "Draft";

  return date.toISOString().slice(0, 10);
}

function getReadableViews(id: number) {
  return `${120 + id * 37}x`;
}
