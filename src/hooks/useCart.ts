
import { TCart } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
    products: TCart[];
    addProduct: (cart: TCart) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeProduct: (id: number) => void;
    resetCart: () => void;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            products: [],

            // Tambah produk ke cart (jika sudah ada, update quantity)
            addProduct: (cart) => {
                const existing = get().products.find((item) => item.id === cart.id);

                if (existing) {
                    const updated = get().products.map((item) =>
                        item.id === cart.id ? { ...item, quantity: item.quantity + cart.quantity } : item
                    );
                    set({ products: updated });
                } else {
                    set({ products: [...get().products, cart] });
                }
            },

            // Tambah quantity produk
            increaseQuantity: (id) => {
                const updated = get().products.map((item) =>
                    item.id === id
                        ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                        : item
                );
                set({ products: updated });
            },

            // Kurangi quantity produk (hapus jika 0)
            decreaseQuantity: (id) => {
                const updated = get().products
                    .map((item) =>
                        item.id === id
                            ? { ...item, quantity: (item.quantity ?? 1) - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0);

                set({ products: updated });
            },

            // Hapus produk dari cart
            removeProduct: (id) => {
                set({
                    products: get().products.filter((item) => item.id !== id),
                });
            },

            // Reset cart
            resetCart: () => set({ products: [] }),
        }),
        {
            name: "cart-product-shopverse",
            storage: createJSONStorage(() => sessionStorage),
        },
    )
);
