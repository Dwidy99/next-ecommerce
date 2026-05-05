import { getErrorMessage, warnOnce } from "@/lib/error-message";
import { getImageUrl } from "@/lib/supabase";
import type {
  CustomerBrandItem,
  CustomerCategoryItem,
  CustomerProductItem,
  HomeArticleItem,
  HomeBannerItem,
  HomeBenefitItem,
  HomePromoItem,
} from "@/app/(customer)/types";
import { prisma } from "lib/prisma";

type ContentSectionItemSource = {
  id: number;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image: string | null;
  icon: string | null;
  label: string | null;
  button_text: string | null;
  button_url: string | null;
};

const fallbackHomeBanners: HomeBannerItem[] = [
  {
    id: 1,
    eyebrow: "Shopverse Picks",
    title: "Discover curated gadgets for work, study, and entertainment.",
    description:
      "Shop quality products with organized categories, fast checkout, and a smoother catalog experience.",
    image: "/assets/banners/5.jpg",
    primaryLabel: "Explore Now",
    primaryHref: "/catalogs",
    secondaryLabel: "View Cart",
    secondaryHref: "/carts",
  },
  {
    id: 2,
    eyebrow: "Office Setup",
    title: "Build a cleaner desk setup with everyday essentials.",
    description:
      "Find devices and accessories that help your workspace feel focused, practical, and ready to use.",
    image: "/assets/banners/2.jpg",
    primaryLabel: "Browse Catalog",
    primaryHref: "/catalogs",
    secondaryLabel: "See Categories",
    secondaryHref: "/catalogs",
  },
  {
    id: 3,
    eyebrow: "Smart Companion",
    title: "Keep your day moving with gadgets that match your routine.",
    description:
      "From daily drivers to smart accessories, find useful products without digging through noise.",
    image: "/assets/banners/4.jpg",
    primaryLabel: "Start Shopping",
    primaryHref: "/catalogs",
    secondaryLabel: "View Cart",
    secondaryHref: "/carts",
  },
];

const fallbackHomeBenefits: HomeBenefitItem[] = [
  {
    id: 1,
    icon: "/assets/icons/crown.svg",
    title: "Quality",
    description: "Curated gadgets",
  },
  {
    id: 2,
    icon: "/assets/icons/box.svg",
    title: "Ready Stock",
    description: "Fast processing",
  },
  {
    id: 3,
    icon: "/assets/icons/tick-circle.svg",
    title: "Secure",
    description: "Safe checkout",
  },
  {
    id: 4,
    icon: "/assets/icons/call.svg",
    title: "Support",
    description: "Friendly help",
  },
  {
    id: 5,
    icon: "/assets/icons/cart.svg",
    title: "Delivery",
    description: "Track orders",
  },
];

const fallbackHomePromos: HomePromoItem[] = [
  {
    id: 1,
    title: "Custom Daily Driver",
    subtitle: "Bundle laptop, phone, and accessories",
    label: "Custom",
    image: "/assets/banners/1.jpg",
    buttonText: "Learn More",
    buttonHref: "/catalogs",
  },
  {
    id: 2,
    title: "Office Setup",
    subtitle: "Clean desk essentials for better focus",
    label: "Custom",
    image: "/assets/banners/2.jpg",
    buttonText: "Learn More",
    buttonHref: "/catalogs",
  },
  {
    id: 3,
    title: "Audio Collection",
    subtitle: "Wireless sound for work and travel",
    label: "Custom",
    image: "/assets/banners/3.jpg",
    buttonText: "Learn More",
    buttonHref: "/catalogs",
  },
  {
    id: 4,
    title: "Smart Companion",
    subtitle: "Devices that keep your day moving",
    label: "Custom",
    image: "/assets/banners/4.jpg",
    buttonText: "Learn More",
    buttonHref: "/catalogs",
  },
  {
    id: 5,
    title: "Accessories Drop",
    subtitle: "Small upgrades, big daily impact",
    label: "Custom",
    image: "/assets/banners/5.jpg",
    buttonText: "Learn More",
    buttonHref: "/catalogs",
  },
  {
    id: 6,
    title: "Need a Bulk Order?",
    subtitle: "Talk with us for team and community packages.",
    label: "Custom",
    image: "/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png",
    buttonText: "Learn More",
    buttonHref: "/catalogs",
  },
];

const fallbackHomeArticles: HomeArticleItem[] = [
  {
    id: 1,
    title: "How to Choose a Laptop for Work and Study",
    image: "/assets/banners/1.jpg",
    meta: "Tips - 5 min read",
    href: "/articles/how-to-choose-a-laptop-for-work-and-study",
  },
  {
    id: 2,
    title: "Simple Ways to Build a Cleaner Desk Setup",
    image: "/assets/banners/2.jpg",
    meta: "Guide - 4 min read",
    href: "/articles/simple-ways-to-build-a-cleaner-desk-setup",
  },
  {
    id: 3,
    title: "Accessories That Make Checkout Worth It",
    image: "/assets/banners/3.jpg",
    meta: "Review - 3 min read",
    href: "/articles/accessories-that-make-checkout-worth-it",
  },
];

// READ: Get dynamic hero banners with static fallback content.
export async function getHomeBanners(): Promise<HomeBannerItem[]> {
  try {
    const sectionItems = await getContentSectionItems("home_hero");
    if (sectionItems.length > 0) {
      return sectionItems.map((item) => ({
        id: item.id,
        eyebrow: item.label ?? "Shopverse Picks",
        title: item.title ?? "Discover curated products for your routine.",
        description: item.description ?? item.subtitle ?? "",
        image: resolveHomeImage(item.image ?? "/assets/banners/5.jpg"),
        primaryLabel: item.button_text ?? "Explore Now",
        primaryHref: item.button_url ?? "/catalogs",
        secondaryLabel: "View Cart",
        secondaryHref: "/carts",
      }));
    }

    return fallbackHomeBanners;
  } catch (error) {
    warnDatabaseFallback("Home banners", error);
    return fallbackHomeBanners;
  }
}

// READ: Get dynamic benefit cards with static fallback content.
export async function getHomeBenefits(): Promise<HomeBenefitItem[]> {
  try {
    const sectionItems = await getContentSectionItems("home_benefits");
    if (sectionItems.length > 0) {
      return sectionItems.map((item) => ({
        id: item.id,
        title: item.title ?? "Benefit",
        description: item.description ?? item.subtitle ?? "",
        icon: resolveHomeImage(item.icon ?? "/assets/icons/box.svg"),
      }));
    }

    return fallbackHomeBenefits;
  } catch (error) {
    warnDatabaseFallback("Home benefits", error);
    return fallbackHomeBenefits;
  }
}

// READ: Get dynamic promo tiles with static fallback content.
export async function getHomePromos(): Promise<HomePromoItem[]> {
  try {
    const sectionItems = await getContentSectionItems("home_promos");
    if (sectionItems.length > 0) {
      return sectionItems.map((item) => ({
        id: item.id,
        title: item.title ?? "Promo",
        subtitle: item.subtitle ?? item.description ?? "",
        label: item.label ?? "Custom",
        image: resolveHomeImage(item.image ?? "/assets/banners/1.jpg"),
        buttonText: item.button_text ?? "Learn More",
        buttonHref: item.button_url ?? "/catalogs",
      }));
    }

    return fallbackHomePromos;
  } catch (error) {
    warnDatabaseFallback("Home promos", error);
    return fallbackHomePromos;
  }
}

// READ: Get dynamic article cards with static fallback content.
export async function getHomeArticles(): Promise<HomeArticleItem[]> {
  try {
    const articles = await prisma.article.findMany({
      where: { is_active: true },
      orderBy: [{ published_at: "desc" }, { created_at: "desc" }],
      take: 3,
    });

    if (articles.length === 0) return fallbackHomeArticles;

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      image: resolveHomeImage(article.image ?? "/assets/banners/1.jpg"),
      meta: article.meta ?? "Article",
      href: `/articles/${article.slug}`,
    }));
  } catch (error) {
    warnDatabaseFallback("Home articles", error);
    return fallbackHomeArticles;
  }
}

// READ: Get reusable CMS section items by section key.
async function getContentSectionItems(
  key: string,
): Promise<ContentSectionItemSource[]> {
  try {
    const section = await prisma.contentSection.findFirst({
      where: {
        key,
        is_active: true,
      },
      select: {
        items: {
          where: { is_active: true },
          orderBy: [{ sort_order: "asc" }, { id: "asc" }],
          select: {
            id: true,
            title: true,
            subtitle: true,
            description: true,
            image: true,
            icon: true,
            label: true,
            button_text: true,
            button_url: true,
          },
        },
      },
    });

    return section?.items ?? [];
  } catch {
    return [];
  }
}

// READ: Get homepage category cards.
export async function getCategories(): Promise<CustomerCategoryItem[]> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return categories.map(mapCategoryItem);
  } catch (error) {
    warnDatabaseFallback("Categories", error);
    return [];
  }
}

// READ: Get homepage featured products.
export async function getProducts(): Promise<CustomerProductItem[]> {
  try {
    const products = await prisma.product.findMany({
      take: 8,
      orderBy: [
        {
          orders: {
            _count: "desc",
          },
        },
        { created_at: "desc" },
      ],
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
        category: {
          select: { name: true },
        },
      },
    });

    return products.map(mapProductItem);
  } catch (error) {
    warnDatabaseFallback("Products", error);
    return [];
  }
}

// READ: Get homepage brand logos.
export async function getBrands(): Promise<CustomerBrandItem[]> {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        id: true,
        logo: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return brands.map(mapBrandItem);
  } catch (error) {
    warnDatabaseFallback("Brands", error);
    return [];
  }
}

// MAPPERS
function mapCategoryItem(category: {
  id: number;
  name: string;
  slug: string | null;
  _count?: {
    products?: number;
  };
}): CustomerCategoryItem {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    productCount: category._count?.products ?? 0,
  };
}

function mapProductItem(product: {
  id: number;
  name: string;
  price: bigint | number;
  images: string[];
  category?: {
    name: string;
  } | null;
}): CustomerProductItem {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    image_url: getImageUrl(product.images?.[0] ?? "", "products"),
    category_name: product.category?.name ?? "Product",
  };
}

function mapBrandItem(brand: { id: number; logo: string }): CustomerBrandItem {
  return {
    id: brand.id,
    logo: brand.logo,
    logo_url: getImageUrl(brand.logo, "brands"),
  };
}

function resolveHomeImage(image: string) {
  if (!image) return "/assets/products/placeholder.svg";
  if (image.startsWith("/") || /^https?:\/\//i.test(image)) return image;
  if (image.startsWith("assets/")) return `/${image}`;

  return image;
}

// ERROR HELPER
function warnDatabaseFallback(source: string, error: unknown) {
  warnOnce(
    `${source} unavailable, using fallback data. ${getErrorMessage(error, "Unknown database error")}`,
  );
}
