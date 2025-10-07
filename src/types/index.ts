export interface ActionResult {
    error: string;
    redirectUrl?: string;
    code?: string;
}

export type Tparams = {
    id: string
}

export type TProfile = {
    name: string;
    email: string;
    image: string | null;
    created_at: Date;
};

// ✅ Union type for profile fetch result
export type ProfileResult = TProfile | { error: string };

export type Tedit = {
    params: Tparams
}

export type TProduct = {
    id: number;
    image_url: string;
    name: string;
    category_name: string;
    price: number;
};

export type TCart = TProduct & { quantity: number }

// types.ts

export type TOrder = {
    id: number;
    code: string;
    total: number;
    status: "pending" | "success" | "failed" | "expired" | "cancelled";
    created_at: string;
    updated_at: string;

    orderDetail?: {
        address: string;
        city: string;
        postal_code: string;
        name: string;
        phone: string;
        notes: string;
    } | null;

    orderProduct?: {
        id: number;
        quantity: number;
        subtotal: number;
        product: {
            id: number;
            name: string;
            price: number;
            image?: string | null;
        };
    }[];
};
