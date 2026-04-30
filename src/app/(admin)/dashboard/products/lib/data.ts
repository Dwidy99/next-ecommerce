import type {
  AdminProductFormOptions,
  AdminProductTableItem,
} from "@/app/(admin)/types"
import { getErrorMessage, warnOnce } from "@/lib/error-message"
import { prisma } from "lib/prisma"
import { getBrands } from "../../brands/lib/data"
import { getCategories } from "../../categories/lib/data"
import { getLocations } from "../../locations/lib/data"

function warnProductFallback(source: string, error: unknown) {
  warnOnce(`${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`)
}

// READ: Get all products for the admin table.
export async function getProducts(): Promise<AdminProductTableItem[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        _count: {
          select: {
            orders: true,
          },
        },
        name: true,
        created_at: true,
        price: true,
        stock: true,
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
        images: true,
      },
    })

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      image_url: product.images[0] ?? "",
      category: product.category?.name ?? "Uncategorized",
      brand: product.brand?.name ?? "No brand",
      location: product.location?.name ?? "No location",
      price: Number(product.price),
      total_sales: product._count.orders,
      stock: product.stock,
      createdAt: product.created_at,
    }))
  } catch (error) {
    warnProductFallback("Products", error)
    return []
  }
}

// READ: Get one product for the edit page.
export async function getProductById(id: number) {
  try {
    return await prisma.product.findUnique({
      where: { id },
    })
  } catch (error) {
    warnProductFallback("Product", error)
    return null
  }
}

// READ: Get relation options used by the create and edit product forms.
export async function getProductFormOptions(): Promise<AdminProductFormOptions> {
  const [categories, brands, locations] = await Promise.all([
    getCategories(),
    getBrands(),
    getLocations(),
  ])

  return {
    categories: categories.map(({ id, name }) => ({ id, name })),
    brands: brands.map(({ id, name }) => ({ id, name })),
    locations: locations.map(({ id, name }) => ({ id, name })),
  }
}

