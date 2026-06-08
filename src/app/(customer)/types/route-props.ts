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

export type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export type ArticlesPageProps = {
  searchParams?: Promise<{
    search?: string;
    sort?: string;
  }>;
};

export type PaymentResultPageProps = {
  searchParams?: Promise<{
    code?: string;
  }>;
};

