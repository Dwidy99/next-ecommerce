export interface ActionResult {
  error: string;
  redirectUrl?: string;
  code?: string;
  message?: string;
}

export type TProfile = {
  name: string;
  email: string;
  image: string | null;
  created_at: Date;
};

export type ProfileResult = TProfile | { error: string };

export type TProduct = {
  id: number;
  image_url: string;
  name: string;
  category_name: string;
  price: number;
};

export type TCart = TProduct & { quantity: number };

export type TOrder = {
  id: number;
  code: string;
  total: number;
  status: "pending" | "success" | "failed" | "expired" | "cancelled";
  created_at: string;
  updated_at: string;
  detail?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    notes: string;
  } | null;
  products?: {
    id: number;
    quantity: number;
    subtotal: number;
    product: {
      id: number;
      name: string;
      price: number;
      images?: string[];
    };
  }[];
  orderDetail?: TOrder["detail"];
  orderProduct?: TOrder["products"];
};

export type CustomerCategoryItem = {
  id: number;
  name: string;
  slug: string | null;
  productCount: number;
};

export type CustomerProductItem = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category_name: string;
};

export type CustomerBrandItem = {
  id: number;
  logo: string;
  logo_url: string;
};

export type FilterOption = {
  id: number;
  name: string;
};

export type CategoryProductSource = {
  id: number;
  name: string;
  price: bigint | number;
  images?: string[] | null;
  category: {
    name: string;
  };
};

export type CategoryWithProductsItem = {
  id: number;
  name: string;
  slug: string;
  products: CustomerProductItem[];
};

