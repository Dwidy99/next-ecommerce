-- Add dynamic Home/Landing Page content tables.
CREATE TABLE "HomeBanner" (
  "id" SERIAL NOT NULL,
  "eyebrow" TEXT,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "image" TEXT NOT NULL,
  "primary_label" TEXT,
  "primary_url" TEXT,
  "secondary_label" TEXT,
  "secondary_url" TEXT,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "HomeBanner_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HomeBenefit" (
  "id" SERIAL NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "HomeBenefit_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HomePromo" (
  "id" SERIAL NOT NULL,
  "title" TEXT NOT NULL,
  "subtitle" TEXT,
  "label" TEXT,
  "image" TEXT NOT NULL,
  "button_text" TEXT,
  "button_url" TEXT,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "HomePromo_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Article" (
  "id" SERIAL NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "excerpt" TEXT,
  "content" TEXT,
  "image" TEXT,
  "meta" TEXT,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "published_at" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
CREATE INDEX "HomeBanner_is_active_sort_order_idx" ON "HomeBanner"("is_active", "sort_order");
CREATE INDEX "HomeBenefit_is_active_sort_order_idx" ON "HomeBenefit"("is_active", "sort_order");
CREATE INDEX "HomePromo_is_active_sort_order_idx" ON "HomePromo"("is_active", "sort_order");
CREATE INDEX "Article_is_active_published_at_idx" ON "Article"("is_active", "published_at");
