import type { ReactNode } from "react";

export type TProduct = {
  id: number;
  image_url: string;
  name: string;
  category_name: string;
  price: number;
};

export type CustomerProductItem = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category_name: string;
};

export type CardProductProps = {
  item: TProduct;
};

export type ListProductProps = {
  title: ReactNode;
  isShowDetail: boolean;
  limit?: number;
};

export type CarouselImagesProps = {
  images: string[];
};

export type PriceInfoProps = {
  item: TProduct;
  isLogIn: boolean;
};

