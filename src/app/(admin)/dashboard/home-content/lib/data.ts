import { prisma } from "lib/prisma";

// READ: Get all editable CMS sections and article master data.
export async function getHomeContent() {
  const [sections, articles] = await Promise.all([
    prisma.contentSection.findMany({
      include: {
        items: {
          orderBy: [{ sort_order: "asc" }, { id: "asc" }],
        },
      },
      orderBy: [{ sort_order: "asc" }, { id: "asc" }],
    }),
    prisma.article.findMany({
      orderBy: [{ published_at: "desc" }, { created_at: "desc" }],
    }),
  ]);

  return {
    sections,
    articles,
  };
}
