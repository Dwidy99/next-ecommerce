export type HomeBannerItem = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type HomeBenefitItem = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type HomePromoItem = {
  id: number;
  title: string;
  subtitle: string;
  label: string;
  image: string;
  buttonText: string;
  buttonHref: string;
};

export type HomeArticleItem = {
  id: number;
  title: string;
  image: string;
  meta: string;
  href: string;
};

