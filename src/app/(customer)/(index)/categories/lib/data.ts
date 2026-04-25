import { getImageUrl } from "@/lib/supabase";
import { prisma } from "lib/prisma";
import type {
  CategoryProductSource,
  CategoryWithProductsItem,
  CustomerProductItem,
} from "@/app/(customer)/types";

// READ LIST
export async function fetchCategoriesWithProducts(): Promise<CategoryWithProductsItem[]> {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            category: { select: { name: true } },
            images: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: createCategorySlug(category.name, category.slug),
      products: formatCategoryProducts(category.products),
    }));
  } catch (error) {
    console.error("Failed to fetch customer categories:", error);
    return [];
  }
}

// READ DETAIL
export async function getCategoryBySlug(slug: string) {
  try {
    return await prisma.category.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true,
        created_at: true,
        updated_at: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            category: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch category by slug:", error);
    return null;
  }
}

// READ STATIC PARAMS
export async function getAllCategorySlugs() {
  try {
    const categories = await prisma.category.findMany({
      select: { slug: true },
    });

    return categories.map((category) => ({ slug: category.slug }));
  } catch (error) {
    console.error("Failed to fetch category slugs:", error);
    return [];
  }
}

// READ METADATA
export async function getCategoryMeta(slug: string) {
  try {
    return await prisma.category.findUnique({
      where: { slug },
      select: { name: true },
    });
  } catch (error) {
    console.error("Failed to fetch category metadata:", error);
    return null;
  }
}

// FORMATTER
export function formatCategoryProducts(
  products: CategoryProductSource[],
): CustomerProductItem[] {
  return products.map(mapCategoryProduct);
}

function createCategorySlug(name: string, slug: string | null) {
  return slug ?? name.toLowerCase().replace(/\s+/g, "-");
}

function mapCategoryProduct(product: CategoryProductSource): CustomerProductItem {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    image_url: getImageUrl(product.images?.[0] ?? "", "products"),
    category_name: product.category.name,
  };
}
