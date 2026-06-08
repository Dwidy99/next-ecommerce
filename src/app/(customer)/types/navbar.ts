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

