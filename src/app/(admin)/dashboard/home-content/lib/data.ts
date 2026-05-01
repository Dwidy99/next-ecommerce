import { prisma } from "lib/prisma"

// READ: Get all editable Landing Page content for the Admin dashboard.
export async function getHomeContent() {
  const [banners, benefits, promos, articles] = await Promise.all([
    prisma.homeBanner.findMany({ orderBy: [{ sort_order: "asc" }, { id: "asc" }] }),
    prisma.homeBenefit.findMany({ orderBy: [{ sort_order: "asc" }, { id: "asc" }] }),
    prisma.homePromo.findMany({ orderBy: [{ sort_order: "asc" }, { id: "asc" }] }),
    prisma.article.findMany({ orderBy: [{ published_at: "desc" }, { created_at: "desc" }] }),
  ])

  return {
    banners,
    benefits,
    promos,
    articles,
  }
}
