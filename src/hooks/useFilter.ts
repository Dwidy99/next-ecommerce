import { ProductStock } from "@prisma/client";
import { create } from "zustand";

export type TFilter = {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    stock?: ProductStock[];   // tidak perlu null, cukup optional array
    brands?: number[];
    locations?: number[];
    categories?: number[];
};

export interface FilterState {
    filter: TFilter;
    setFilter: (update: Partial<TFilter> | ((prev: TFilter) => Partial<TFilter>)) => void;
    resetFilter: () => void;
}

export const useFilter = create<FilterState>()((set, get) => ({
    filter: {
        search: "",
        minPrice: undefined,
        maxPrice: undefined,
        stock: [],
        brands: [],
        locations: [],
        categories: [],
    },

    setFilter: (input) => {
        const current = get().filter;
        const update = typeof input === "function" ? input(current) : input;
        set({ filter: { ...current, ...update } });
    },

    resetFilter: () => {
        set({
            filter: {
                search: "",
                minPrice: undefined,
                maxPrice: undefined,
                stock: [],
                brands: [],
                locations: [],
                categories: [],
            },
        });
    },
}));
