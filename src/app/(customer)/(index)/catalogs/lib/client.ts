import type { TFilter, TProduct } from "@/app/(customer)/types";

// READ: Fetch catalog products from the API on the client side.
export async function fetchCatalogProducts(
  body?: TFilter,
): Promise<TProduct[]> {
  try {
    const response = await fetch("/api/catalog", {
      method: "POST",
      body: JSON.stringify(body ?? {}),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(
        `[fetchCatalogProducts] Catalog API unavailable: ${response.statusText}`,
      );
      return [];
    }

    const data: TProduct[] = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown fetch error";
    console.warn(
      `[fetchCatalogProducts] Using empty fallback data. ${message}`,
    );
    return [];
  }
}
