import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "lib/prisma"

function warnCategoryFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

// READ: Get all categories for the admin table and product form dropdown.
export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    })
  } catch (error) {
    warnCategoryFallback("Categories", error)
    return []
  }
}

// READ: Get one category for the edit page.
export async function getCategoryById(id: string) {
  const categoryId = Number.parseInt(id)

  if (Number.isNaN(categoryId)) {
    return null
  }

  try {
    return await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })
  } catch (error) {
    warnCategoryFallback("Category", error)
    return null
  }
}
