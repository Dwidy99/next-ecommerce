import { getErrorMessage, warnOnce } from "@/lib/error-message";
import type { CustomerArticleDetail } from "@/app/(customer)/types";
import { prisma } from "lib/prisma";

// READ: Get one active article by slug for the customer detail page.
export async function getArticleBySlug(
  slug: string,
): Promise<CustomerArticleDetail | null> {
  try {
    const article = await prisma.article.findFirst({
      where: {
        slug,
        is_active: true,
      },
    });

    if (!article) return null;

    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt ?? "",
      content: article.content ?? article.excerpt ?? "",
      image: resolveArticleImage(article.image ?? "/assets/banners/1.jpg"),
      meta: article.meta ?? "Article",
      publishedAt: article.published_at,
    };
  } catch (error) {
    warnOnce(
      `Article unavailable, using not found state. ${getErrorMessage(error, "Unknown database error")}`,
    );
    return null;
  }
}

// READ: Get recent articles for simple recommendations.
export async function getRecentArticles(currentSlug: string) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        is_active: true,
        slug: {
          not: currentSlug,
        },
      },
      orderBy: [{ published_at: "desc" }, { created_at: "desc" }],
      take: 3,
    });

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      image: resolveArticleImage(article.image ?? "/assets/banners/1.jpg"),
      meta: article.meta ?? "Article",
    }));
  } catch (error) {
    warnOnce(
      `Recent articles unavailable. ${getErrorMessage(error, "Unknown database error")}`,
    );
    return [];
  }
}

function resolveArticleImage(image: string) {
  if (!image) return "/assets/products/placeholder.svg";
  if (image.startsWith("/") || /^https?:\/\//i.test(image)) return image;
  if (image.startsWith("assets/")) return `/${image}`;

  return image;
}
