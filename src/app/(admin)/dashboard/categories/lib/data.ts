import { getErrorMessage, warnOnce } from "@/lib/error-message";
import { prisma } from "lib/prisma";

function warnCategoryFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`);
}

export async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    warnCategoryFallback("Categories", error);
    return [];
  }
}


export async function getCategoryById(id: string) {
  try {
    return await prisma.category.findFirst({
      where: {
        id: Number.parseInt(id)
      }
    })
  } catch (error) {
    warnCategoryFallback("Category", error);
    return null;
  }
}
