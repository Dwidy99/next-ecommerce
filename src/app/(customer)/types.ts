import type { ProductStock } from "@prisma/client";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

// Shared server action response type.
export interface ActionResult {
  error: string;
  redirectUrl?: string;
  code?: string;
  message?: string;
}

// CRUD: User/Profile data.
export type TProfile = {
  name: string;
  email: string;
  image: string | null;
  created_at: Date;
};

export type ProfileResult = TProfile | { error: string };

// CRUD: Product and cart data.
export type TProduct = {
  id: number;
  image_url: string;
  name: string;
  category_name: string;
  price: number;
};

export type TCart = TProduct & { quantity: number };

export type CustomerProductItem = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category_name: string;
};

// CRUD: Category data.
export type CustomerCategoryItem = {
  id: number;
  name: string;
  slug: string | null;
  productCount: number;
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

// CRUD: Brand data.
export type CustomerBrandItem = {
  id: number;
  logo: string;
  logo_url: string;
};

// CRUD: Order and payment data.
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

export type OrderStatusConfig = {
  label: string;
  description: string;
  badgeClassName: string;
  icon: LucideIcon;
};

// Query: Catalog filter data.
export type FilterOption = {
  id: number;
  name: string;
};

export type TFilter = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  stock?: ProductStock[];
  brands?: number[];
  locations?: number[];
  categories?: number[];
};

export type FilterKey = "stock" | "brands" | "locations" | "categories";

export type FilterCheckboxOption =
  | FilterOption
  | {
      id: ProductStock;
      name: string;
    };

// Page props: dynamic routes and search params.
export type ResetPasswordPageProps = {
  params: Promise<{ token: string }>;
};

export type VerifyEmailPageProps = {
  params: Promise<{ token: string }>;
};

export type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export type DetailProductPageProps = {
  params: Promise<{ id: string }>;
};

export type PaymentResultPageProps = {
  searchParams?: Promise<{
    code?: string;
  }>;
};

// Component props: product, category, cart, profile, and payment UI.
export type CardProductProps = {
  item: TProduct;
};

export type ListProductProps = {
  title: ReactNode;
  isShowDetail: boolean;
};

export type CarouselImagesProps = {
  images: string[];
};

export type PriceInfoProps = {
  item: TProduct;
  isLogIn: boolean;
};

export type FormProfileProps = {
  initialProfile: TProfile;
};

export type FilterCheckboxListProps = {
  name: FilterKey;
  options: FilterCheckboxOption[];
};

export type OrdersListProps = {
  orders?: TOrder[];
};

export type EmptyStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  showBackButton?: boolean;
};

export type PaymentStatusProps = {
  status: "success" | "pending" | "failed" | "cancelled";
  code?: string;
};

export type NoDataProps = {
  title?: string;
  message?: string;
  icon?: string;
};

export type SearchBarProps = {
  currentPage?: string;
  title?: string;
};

export type CustomerLoadingProps = {
  count?: number;
  type?: "grid" | "list";
  className?: string;
};

// Navbar data and props.
export type NavbarUser = {
  id: number;
  name: string;
  email: string;
  role: "customer" | "superadmin";
  image?: string | null;
} | null;

export type NavbarCategoryItem = {
  id: number;
  name: string;
  slug: string | null;
};

export type NavbarSite = {
  webname: string;
  logo?: string | null;
};

export type NavbarClientProps = {
  user: NavbarUser;
  categories: NavbarCategoryItem[];
  site: NavbarSite;
};

export type NavbarSiteConfigSource = {
  shortName?: string | null;
  title?: string | null;
  logo?: string | null;
};


