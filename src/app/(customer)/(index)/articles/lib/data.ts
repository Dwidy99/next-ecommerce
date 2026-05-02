import { getErrorMessage, warnOnce } from "@/lib/error-message";
import type { CustomerArticleItem } from "@/app/(customer)/types";
import { prisma } from "lib/prisma";

type ArticleSort = "newest" | "oldest" | "title";

type GetArticlesParams = {
  search?: string;
  sort?: string;
};

// READ: Get active articles for the customer Articles page.
export async function getArticles({
  search = "",
  sort = "newest",
}: GetArticlesParams = {}): Promise<CustomerArticleItem[]> {
  try {
    const keyword = search.trim();
    const selectedSort = normalizeSort(sort);

    const articles = await prisma.article.findMany({
      where: {
        is_active: true,
        ...(keyword
          ? {
              OR: [
                { title: { contains: keyword, mode: "insensitive" } },
                { excerpt: { contains: keyword, mode: "insensitive" } },
                { content: { contains: keyword, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: getArticleOrderBy(selectedSort),
    });

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt ?? "Read more about this Shopverse guide.",
      image: resolveArticleImage(article.image ?? "/assets/banners/1.jpg"),
      meta: article.meta ?? "Article",
      publishedAt: article.published_at,
    }));
  } catch (error) {
    warnOnce(
      `Articles unavailable, using empty list. ${getErrorMessage(error, "Unknown database error")}`,
    );
    return [];
  }
}

function normalizeSort(sort: string): ArticleSort {
  if (sort === "oldest" || sort === "title") return sort;

  return "newest";
}

function getArticleOrderBy(sort: ArticleSort) {
  if (sort === "oldest") {
    return [{ published_at: "asc" as const }, { created_at: "asc" as const }];
  }

  if (sort === "title") {
    return [{ title: "asc" as const }];
  }

  return [{ published_at: "desc" as const }, { created_at: "desc" as const }];
}

function resolveArticleImage(image: string) {
  if (!image) return "/assets/products/placeholder.svg";
  if (image.startsWith("/") || /^https?:\/\//i.test(image)) return image;
  if (image.startsWith("assets/")) return `/${image}`;

  return image;
}
