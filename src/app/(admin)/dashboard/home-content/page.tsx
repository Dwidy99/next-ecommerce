import type { Article, ContentSection, ContentSectionItem } from "@prisma/client";
import {
  HelpCircle,
  LayoutTemplate,
  Newspaper,
  Rows3,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createArticle,
  createContentItem,
  createContentSection,
  deleteArticle,
  deleteContentItem,
  deleteContentSection,
  updateArticle,
  updateContentItem,
  updateContentSection,
} from "./lib/actions";
import { getHomeContent } from "./lib/data";

type SectionWithItems = ContentSection & {
  items: ContentSectionItem[];
};

type FieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
  helper?: string;
};

type SelectOption = {
  label: string;
  value: string;
};

const sectionTypeOptions: SelectOption[] = [
  { label: "Hero Banner / Carousel", value: "hero_banner" },
  { label: "Benefit Icon Strip", value: "benefit_strip" },
  { label: "Promo Mosaic / Category Cards", value: "promo_mosaic" },
  { label: "Catalog Hero Banner", value: "catalog_banner" },
  { label: "Collaboration Section", value: "collaboration" },
  { label: "Article Preview Section", value: "article_preview" },
  { label: "Custom Section", value: "custom" },
];

const itemTypeOptions: SelectOption[] = [
  { label: "Banner", value: "banner" },
  { label: "Benefit", value: "benefit" },
  { label: "Promo Card", value: "promo" },
  { label: "Category Card", value: "category_card" },
  { label: "Brand / Collaboration", value: "brand" },
  { label: "Article Reference", value: "article" },
  { label: "Custom Card", value: "card" },
];

const referenceTypeOptions: SelectOption[] = [
  { label: "No Reference", value: "" },
  { label: "Category", value: "category" },
  { label: "Product", value: "product" },
  { label: "Article", value: "article" },
  { label: "Brand", value: "brand" },
];

const sectionGuide = [
  {
    key: "home_hero",
    type: "hero_banner",
    usage: "Banner carousel at the top of Home.",
  },
  {
    key: "home_benefits",
    type: "benefit_strip",
    usage: "Small icon cards below the Home banner.",
  },
  {
    key: "home_promos",
    type: "promo_mosaic",
    usage: "Marketing cards and secondary banners on Home.",
  },
  {
    key: "catalog_hero",
    type: "catalog_banner",
    usage: "Large banner at the top of the Catalog page.",
  },
];

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  textarea,
  required,
  helper,
}: FieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
      {textarea ? (
        <Textarea
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <Input
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
  helper,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  options: SelectOption[];
  helper?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option.value || "empty"} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ActiveAndOrder({
  isActive = true,
  sortOrder = 0,
}: {
  isActive?: boolean;
  sortOrder?: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
      <Field label="Sort Order" name="sort_order" defaultValue={sortOrder} />
      <label className="flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={isActive}
          className="h-4 w-4 accent-[#110843]"
        />
        Active
      </label>
    </div>
  );
}

function DeleteButton({
  action,
}: {
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <Button
      type="submit"
      formAction={action}
      variant="destructive"
      className="bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100 hover:text-red-800"
    >
      Delete
    </Button>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">{children}</CardContent>
    </Card>
  );
}

function CmsGuide() {
  return (
    <Card className="border-[#FFE08A] bg-[#FFF9E8] shadow-sm">
      <CardHeader>
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FFC736] text-[#110843]">
            <HelpCircle className="h-5 w-5" />
          </span>
          <div>
            <CardTitle>CMS Usage Guide</CardTitle>
            <CardDescription>
              Keep these keys stable because customer pages use them to load
              dynamic content.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {sectionGuide.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl border border-[#FFE08A] bg-white p-4"
            >
              <p className="font-mono text-xs font-bold text-[#d99000]">
                {item.key}
              </p>
              <p className="mt-1 text-sm font-semibold text-[#110843]">
                {item.type}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.usage}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SectionForm({ section }: { section?: SectionWithItems }) {
  const isEdit = Boolean(section);

  return (
    <form
      action={isEdit ? updateContentSection : createContentSection}
      className="grid gap-4 rounded-2xl border bg-background p-4"
    >
      {section && <input type="hidden" name="id" value={section.id} />}

      <div className="grid gap-4 md:grid-cols-3">
        <Field
          label="Section Key"
          name="key"
          defaultValue={section?.key}
          placeholder="home_hero"
          helper="Used by the code. Example: home_hero, home_benefits, catalog_hero."
          required
        />
        <Field
          label="Admin Name"
          name="name"
          defaultValue={section?.name}
          placeholder="Home Hero"
          helper="Only shown in Admin so you can recognize this section."
          required
        />
        <SelectField
          label="Section Type"
          name="type"
          defaultValue={section?.type}
          options={sectionTypeOptions}
          helper="Controls the intent of this section."
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={section?.title} />
        <Field
          label="Highlight"
          name="highlight"
          defaultValue={section?.highlight}
          placeholder="Products"
        />
      </div>

      <Field
        label="Description"
        name="description"
        defaultValue={section?.description}
        textarea
      />

      <ActiveAndOrder
        isActive={section?.is_active ?? true}
        sortOrder={section?.sort_order ?? 0}
      />

      <div className="flex flex-wrap justify-end gap-2">
        {section && <DeleteButton action={deleteContentSection} />}
        <Button type="submit">{isEdit ? "Save Section" : "Add Section"}</Button>
      </div>
    </form>
  );
}

function ItemForm({
  sectionId,
  item,
}: {
  sectionId: number;
  item?: ContentSectionItem;
}) {
  const isEdit = Boolean(item);

  return (
    <form
      action={isEdit ? updateContentItem : createContentItem}
      className="grid gap-4 rounded-2xl border bg-muted/20 p-4"
    >
      <input type="hidden" name="section_id" value={sectionId} />
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="grid gap-4 md:grid-cols-3">
        <SelectField
          label="Item Type"
          name="type"
          defaultValue={item?.type}
          options={itemTypeOptions}
          helper="Choose what this item represents."
          required
        />
        <Field label="Title" name="title" defaultValue={item?.title} />
        <Field label="Subtitle" name="subtitle" defaultValue={item?.subtitle} />
      </div>

      <Field
        label="Description"
        name="description"
        defaultValue={item?.description}
        textarea
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Image Path / URL" name="image" defaultValue={item?.image} />
        <Field label="Icon Path / URL" name="icon" defaultValue={item?.icon} />
        <Field label="Label" name="label" defaultValue={item?.label} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Button Text"
          name="button_text"
          defaultValue={item?.button_text}
        />
        <Field
          label="Button URL"
          name="button_url"
          defaultValue={item?.button_url}
          placeholder="/catalogs"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SelectField
          label="Reference Type"
          name="reference_type"
          defaultValue={item?.reference_type}
          options={referenceTypeOptions}
          helper="Optional. Use this if the item points to a master table."
        />
        <Field
          label="Reference ID"
          name="reference_id"
          defaultValue={item?.reference_id}
          placeholder="1"
          helper="Optional ID from Category, Product, Article, or Brand."
        />
      </div>

      <ActiveAndOrder
        isActive={item?.is_active ?? true}
        sortOrder={item?.sort_order ?? 0}
      />

      <div className="flex flex-wrap justify-end gap-2">
        {item && <DeleteButton action={deleteContentItem} />}
        <Button type="submit">{isEdit ? "Save Item" : "Add Item"}</Button>
      </div>
    </form>
  );
}

function ArticleForm({ article }: { article?: Article }) {
  const isEdit = Boolean(article);

  return (
    <form
      action={isEdit ? updateArticle : createArticle}
      className="grid gap-4 rounded-2xl border bg-background p-4"
    >
      {article && <input type="hidden" name="id" value={article.id} />}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={article?.title} required />
        <Field label="Slug" name="slug" defaultValue={article?.slug} />
        <Field label="Image Path / URL" name="image" defaultValue={article?.image} />
        <Field label="Meta" name="meta" defaultValue={article?.meta} />
      </div>

      <Field label="Excerpt" name="excerpt" defaultValue={article?.excerpt} textarea />
      <Field label="Content" name="content" defaultValue={article?.content} textarea />

      <ActiveAndOrder isActive={article?.is_active ?? true} />

      <div className="flex flex-wrap justify-end gap-2">
        {article && <DeleteButton action={deleteArticle} />}
        <Button type="submit">{isEdit ? "Save Article" : "Add Article"}</Button>
      </div>
    </form>
  );
}

export default async function HomeContentPage() {
  const { sections, articles } = await getHomeContent();
  const itemCount = sections.reduce((total, section) => total + section.items.length, 0);

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              Unified Content CMS
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Manage Home, Catalog, Articles, and page sections from one place.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Use sections for page areas and items for banners, benefits, promo
              cards, category cards, or references to existing master data.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <LayoutTemplate className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{sections.length}</p>
                  <p className="text-xs text-white/65">Sections</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Rows3 className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{itemCount}</p>
                  <p className="text-xs text-white/65">Section Items</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <Newspaper className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{articles.length}</p>
                  <p className="text-xs text-white/65">Articles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionCard
        title="Content Sections"
        description="Create reusable page sections. Example keys: home_hero, home_benefits, home_promos, catalog_hero."
      >
        <CmsGuide />
        <SectionForm />

        {sections.map((section) => (
          <div
            key={section.id}
            className="grid gap-4 rounded-3xl border bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d99000]">
                  {section.key}
                </p>
                <h3 className="text-xl font-bold">{section.name}</h3>
              </div>
              <Badge variant={section.is_active ? "default" : "secondary"}>
                {section.type}
              </Badge>
            </div>

            <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Title
                </p>
                <p className="mt-1 font-semibold">{section.title ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Description
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {section.description ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Items
                </p>
                <p className="mt-1 font-semibold">
                  {section.items.length} item(s)
                </p>
              </div>
            </div>

            <details className="group rounded-2xl border bg-background p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">
                <span>Edit Section Settings</span>
                <span className="text-sm text-muted-foreground transition group-open:rotate-180">
                  v
                </span>
              </summary>
              <div className="mt-4">
                <SectionForm section={section} />
              </div>
            </details>

            <div className="grid gap-3 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#d99000]" />
                <p className="font-semibold">Manage Section Items</p>
              </div>

              <details className="group rounded-2xl border bg-white p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">
                  <span>Add New Item</span>
                  <span className="text-sm text-muted-foreground transition group-open:rotate-180">
                    v
                  </span>
                </summary>
                <div className="mt-4">
                  <ItemForm sectionId={section.id} />
                </div>
              </details>

              {section.items.map((item) => (
                <details
                  key={item.id}
                  className="group rounded-2xl border bg-white p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span>
                      <span className="font-semibold">
                        {item.title ?? "Untitled Item"}
                      </span>
                      <span className="ml-2 rounded-full bg-[#FFF4CC] px-2 py-1 text-xs font-semibold text-[#110843]">
                        {item.type}
                      </span>
                    </span>
                    <span className="text-sm text-muted-foreground transition group-open:rotate-180">
                      v
                    </span>
                  </summary>
                  <div className="mt-4">
                    <ItemForm sectionId={section.id} item={item} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </SectionCard>

      <SectionCard
        title="Articles"
        description="Master article data. Home article sections can still display these articles dynamically."
      >
        <ArticleForm />
        {articles.map((article) => (
          <ArticleForm key={article.id} article={article} />
        ))}
      </SectionCard>
    </div>
  );
}
