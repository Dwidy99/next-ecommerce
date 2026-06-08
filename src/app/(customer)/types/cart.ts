import type { TProduct } from "./product";

export type TCart = TProduct & { quantity: number };

