import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import Navbar from "../../_components/navbar";
import { generatePageSEO } from "@/lib/seo/seo-utils";
import type { ArticleDetailPageProps } from "@/app/(customer)/types";
import { getArticleBySlug, getRecentArticles } from "./lib/data";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Shopverse",
      description: "The article you are looking for does not exist.",
    };
  }

  return await generatePageSEO({
    title: article.title,
    description: article.excerpt || article.content,
    keywords: [article.title, "article", "shopverse"],
    image: article.image,
    url: `/articles/${article.slug}`,
  });
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) redirect("/");

  const recentArticles = await getRecentArticles(article.slug);
  const contentParagraphs = article.content
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#edf2f6] pb-16">
      <div className="hidden bg-[#07111f] text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Shopverse Article</span>
          <span>Simple guides - cleaner shopping decisions</span>
          <span className="text-[#FFC736]">Latest insight</span>
        </div>
      </div>

      <header className="bg-[#FFC736] px-4 pb-10 pt-1 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Navbar />

          <section className="relative mt-6 overflow-hidden rounded-3xl bg-[#110843] p-7 shadow-xl md:p-10">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#FFC736]/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute right-10 top-10 hidden h-28 w-28 rounded-full border border-white/10 lg:block" />

            <div className="relative z-10 max-w-3xl text-white">
              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#FFC736] backdrop-blur">
                {article.meta}
              </p>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                  {article.excerpt}
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full bg-[#FFC736] px-6 py-3 text-sm font-bold text-[#110843] shadow-lg shadow-yellow-950/20 transition hover:bg-[#ffda63]"
                >
                  Back to Home
                </Link>
                <Link
                  href="/catalogs"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          </section>
        </div>
      </header>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 px-4 sm:px-8 lg:grid-cols-[1fr_360px] lg:px-16">
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <Image
            src={article.image}
            alt={article.title}
            width={1400}
            height={720}
            className="h-72 w-full object-cover md:h-[420px]"
            priority
          />

          <div className="p-6 md:p-10">
            <div className="mb-7 flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d99000]">
                  Article Detail
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#110843] sm:text-3xl">
                  {article.title}
                </h2>
              </div>
              {article.publishedAt && (
                <p className="text-sm font-semibold text-slate-500">
                  {article.publishedAt.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>

            <div className="grid gap-5 text-sm leading-7 text-slate-600 md:text-base">
              {contentParagraphs.length > 0 ? (
                contentParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))
              ) : (
                <p>
                  This article is being prepared. Please check back later for
                  more details.
                </p>
              )}
            </div>
          </div>
        </article>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d99000]">
            More Articles
          </p>
          <h3 className="mt-1 text-xl font-extrabold text-[#110843]">
            Keep Reading
          </h3>

          <div className="mt-5 grid gap-4">
            {recentArticles.length === 0 ? (
              <p className="text-sm leading-6 text-slate-500">
                More articles will appear here when available.
              </p>
            ) : (
              recentArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/articles/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition hover:-translate-y-0.5 hover:border-[#FFC736] hover:bg-white"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={260}
                    className="h-32 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {item.meta}
                    </p>
                    <h4 className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-[#110843]">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
