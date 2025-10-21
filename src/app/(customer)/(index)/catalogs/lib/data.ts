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

        if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);

        const data: TProduct[] = await res.json();
        return data ?? [];
    } catch (error) {
        console.error("[fetchProduct] Error:", error);
        return [];
    }
}
