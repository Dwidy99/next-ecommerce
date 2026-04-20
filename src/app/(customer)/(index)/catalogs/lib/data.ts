import { TFilter } from "@/hooks/useFilter";
import { TProduct } from "@/types";

export async function fetchProduct(body?: TFilter): Promise<TProduct[]> {
    try {
        const res = await fetch("/api/catalog", {
            method: "POST",
            body: JSON.stringify(body ?? {}),
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        if (!res.ok) {
            console.warn(`[fetchProduct] Catalog API unavailable: ${res.statusText}`);
            return [];
        }

        const data: TProduct[] = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown fetch error";
        console.warn(`[fetchProduct] Using empty fallback data. ${message}`);
        return [];
    }
}
