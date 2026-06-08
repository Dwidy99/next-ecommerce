import type { ReactNode } from "react";

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
  variant?: "page" | "section";
  className?: string;
};

export type LoadMoreGridProps = {
  children: ReactNode;
  initialCount?: number;
  incrementBy?: number;
  className?: string;
  buttonLabel?: string;
};

