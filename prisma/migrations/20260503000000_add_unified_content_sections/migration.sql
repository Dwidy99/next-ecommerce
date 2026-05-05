-- Create unified content section tables for reusable CMS content.
CREATE TABLE "ContentSection" (
  "id" SERIAL NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "title" TEXT,
  "highlight" TEXT,
  "description" TEXT,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ContentSection_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ContentSection_key_key" ON "ContentSection"("key");

CREATE TABLE "ContentSectionItem" (
  "id" SERIAL NOT NULL,
  "section_id" INTEGER NOT NULL,
  "type" TEXT NOT NULL,
  "title" TEXT,
  "subtitle" TEXT,
  "description" TEXT,
  "image" TEXT,
  "icon" TEXT,
  "label" TEXT,
  "button_text" TEXT,
  "button_url" TEXT,
  "reference_type" TEXT,
  "reference_id" INTEGER,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ContentSectionItem_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "ContentSectionItem"
ADD CONSTRAINT "ContentSectionItem_section_id_fkey"
FOREIGN KEY ("section_id") REFERENCES "ContentSection"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed default sections so the customer pages work immediately after migration.
INSERT INTO "ContentSection" ("key", "name", "type", "title", "highlight", "description", "sort_order", "is_active", "updated_at")
VALUES
  ('home_hero', 'Home Hero Carousel', 'hero_banner', NULL, NULL, NULL, 1, true, CURRENT_TIMESTAMP),
  ('home_benefits', 'Home Benefit Icons', 'benefit_strip', NULL, NULL, NULL, 2, true, CURRENT_TIMESTAMP),
  ('home_promos', 'Home Promo Cards', 'promo_mosaic', NULL, NULL, NULL, 4, true, CURRENT_TIMESTAMP),
  ('catalog_hero', 'Catalog Hero Banner', 'catalog_banner', 'Find the right gadget without digging through noise.', NULL, 'Filter by price, stock, brand, location, and category with a cleaner catalog experience that still fits Shopverse.', 10, true, CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;

INSERT INTO "ContentSectionItem" ("section_id", "type", "title", "subtitle", "description", "image", "label", "button_text", "button_url", "sort_order", "is_active", "updated_at")
SELECT section."id", 'banner', banner."title", NULL, banner."description", banner."image", banner."eyebrow", COALESCE(banner."primary_label", 'Explore Now'), COALESCE(banner."primary_url", '/catalogs'), banner."sort_order", banner."is_active", CURRENT_TIMESTAMP
FROM "HomeBanner" banner
JOIN "ContentSection" section ON section."key" = 'home_hero';

INSERT INTO "ContentSectionItem" ("section_id", "type", "title", "description", "icon", "sort_order", "is_active", "updated_at")
SELECT section."id", 'benefit', benefit."title", benefit."description", benefit."icon", benefit."sort_order", benefit."is_active", CURRENT_TIMESTAMP
FROM "HomeBenefit" benefit
JOIN "ContentSection" section ON section."key" = 'home_benefits';

INSERT INTO "ContentSectionItem" ("section_id", "type", "title", "subtitle", "image", "label", "button_text", "button_url", "sort_order", "is_active", "updated_at")
SELECT section."id", 'promo', promo."title", promo."subtitle", promo."image", promo."label", promo."button_text", promo."button_url", promo."sort_order", promo."is_active", CURRENT_TIMESTAMP
FROM "HomePromo" promo
JOIN "ContentSection" section ON section."key" = 'home_promos';

INSERT INTO "ContentSectionItem" ("section_id", "type", "title", "description", "image", "label", "sort_order", "is_active", "updated_at")
SELECT section."id", 'banner', section."title", section."description", '/assets/banners/mba13-m2-digitalmat-gallery-1-202402-Photoroom 2.png', 'Product Catalog', 0, true, CURRENT_TIMESTAMP
FROM "ContentSection" section
WHERE section."key" = 'catalog_hero';
