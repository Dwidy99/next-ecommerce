import type {
  Article,
  HomeBanner,
  HomeBenefit,
  HomePromo,
} from "@prisma/client"
import { LayoutTemplate, Newspaper } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  createArticle,
  createHomeBanner,
  createHomeBenefit,
  createHomePromo,
  deleteArticle,
  deleteHomeBanner,
  deleteHomeBenefit,
  deleteHomePromo,
  updateArticle,
  updateHomeBanner,
  updateHomeBenefit,
  updateHomePromo,
} from "./lib/actions"
import { getHomeContent } from "./lib/data"

type FieldProps = {
  label: string
  name: string
  defaultValue?: string | number | null
  placeholder?: string
  textarea?: boolean
  required?: boolean
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  textarea,
  required,
}: FieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
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
  )
}

function ActiveAndOrder({
  isActive = true,
  sortOrder = 0,
}: {
  isActive?: boolean
  sortOrder?: number
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
  )
}

function ActiveCheckbox({ isActive = true }: { isActive?: boolean }) {
  return (
    <label className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm">
      <input
        type="checkbox"
        name="is_active"
        defaultChecked={isActive}
        className="size-4"
      />
      Active
    </label>
  )
}

function DeleteButton({ action, id }: { action: (formData: FormData) => void | Promise<void>; id: number }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="destructive"
        className="bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100 hover:text-red-800"
      >
        Delete
      </Button>
    </form>
  )
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">{children}</CardContent>
    </Card>
  )
}

function BannerForm({ banner }: { banner?: HomeBanner }) {
  const isEdit = Boolean(banner)

  return (
    <form action={isEdit ? updateHomeBanner : createHomeBanner} className="grid gap-4 rounded-2xl border bg-background p-4">
      {banner && <input type="hidden" name="id" value={banner.id} />}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Eyebrow" name="eyebrow" defaultValue={banner?.eyebrow} placeholder="Smart Companion" />
        <Field label="Image Path / URL" name="image" defaultValue={banner?.image} placeholder="/assets/banners/4.jpg" required />
      </div>
      <Field label="Title" name="title" defaultValue={banner?.title} placeholder="Hero title" required />
      <Field label="Description" name="description" defaultValue={banner?.description} textarea />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Primary Label" name="primary_label" defaultValue={banner?.primary_label} placeholder="Start Shopping" />
        <Field label="Primary URL" name="primary_url" defaultValue={banner?.primary_url} placeholder="/catalogs" />
        <Field label="Secondary Label" name="secondary_label" defaultValue={banner?.secondary_label} placeholder="View Cart" />
        <Field label="Secondary URL" name="secondary_url" defaultValue={banner?.secondary_url} placeholder="/carts" />
      </div>
      <ActiveAndOrder isActive={banner?.is_active ?? true} sortOrder={banner?.sort_order ?? 0} />
      <div className="flex flex-wrap justify-end gap-2">
        {banner && <DeleteButton action={deleteHomeBanner} id={banner.id} />}
        <Button type="submit">{isEdit ? "Save Banner" : "Add Banner"}</Button>
      </div>
    </form>
  )
}

function BenefitForm({ benefit }: { benefit?: HomeBenefit }) {
  const isEdit = Boolean(benefit)

  return (
    <form action={isEdit ? updateHomeBenefit : createHomeBenefit} className="grid gap-4 rounded-2xl border bg-background p-4">
      {benefit && <input type="hidden" name="id" value={benefit.id} />}
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Title" name="title" defaultValue={benefit?.title} placeholder="Quality" required />
        <Field label="Description" name="description" defaultValue={benefit?.description} placeholder="Curated gadgets" required />
        <Field label="Icon Path" name="icon" defaultValue={benefit?.icon} placeholder="/assets/icons/crown.svg" />
      </div>
      <ActiveAndOrder isActive={benefit?.is_active ?? true} sortOrder={benefit?.sort_order ?? 0} />
      <div className="flex flex-wrap justify-end gap-2">
        {benefit && <DeleteButton action={deleteHomeBenefit} id={benefit.id} />}
        <Button type="submit">{isEdit ? "Save Benefit" : "Add Benefit"}</Button>
      </div>
    </form>
  )
}

function PromoForm({ promo }: { promo?: HomePromo }) {
  const isEdit = Boolean(promo)

  return (
    <form action={isEdit ? updateHomePromo : createHomePromo} className="grid gap-4 rounded-2xl border bg-background p-4">
      {promo && <input type="hidden" name="id" value={promo.id} />}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={promo?.title} placeholder="Custom Daily Driver" required />
        <Field label="Image Path / URL" name="image" defaultValue={promo?.image} placeholder="/assets/banners/1.jpg" required />
        <Field label="Subtitle" name="subtitle" defaultValue={promo?.subtitle} />
        <Field label="Label" name="label" defaultValue={promo?.label} placeholder="Custom" />
        <Field label="Button Text" name="button_text" defaultValue={promo?.button_text} placeholder="View Products" />
        <Field label="Button URL" name="button_url" defaultValue={promo?.button_url} placeholder="/catalogs" />
      </div>
      <ActiveAndOrder isActive={promo?.is_active ?? true} sortOrder={promo?.sort_order ?? 0} />
      <div className="flex flex-wrap justify-end gap-2">
        {promo && <DeleteButton action={deleteHomePromo} id={promo.id} />}
        <Button type="submit">{isEdit ? "Save Promo" : "Add Promo"}</Button>
      </div>
    </form>
  )
}

function ArticleForm({ article }: { article?: Article }) {
  const isEdit = Boolean(article)

  return (
    <form action={isEdit ? updateArticle : createArticle} className="grid gap-4 rounded-2xl border bg-background p-4">
      {article && <input type="hidden" name="id" value={article.id} />}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={article?.title} placeholder="Article title" required />
        <Field label="Slug" name="slug" defaultValue={article?.slug} placeholder="article-slug" />
        <Field label="Image Path / URL" name="image" defaultValue={article?.image} placeholder="/assets/banners/1.jpg" />
        <Field label="Meta" name="meta" defaultValue={article?.meta} placeholder="Tips - 5 min read" />
      </div>
      <Field label="Excerpt" name="excerpt" defaultValue={article?.excerpt} textarea />
      <Field label="Content" name="content" defaultValue={article?.content} textarea />
      <ActiveCheckbox isActive={article?.is_active ?? true} />
      <div className="flex flex-wrap justify-end gap-2">
        {article && <DeleteButton action={deleteArticle} id={article.id} />}
        <Button type="submit">{isEdit ? "Save Article" : "Add Article"}</Button>
      </div>
    </form>
  )
}

export default async function HomeContentPage() {
  const { banners, benefits, promos, articles } = await getHomeContent()

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-3xl border bg-[#110843] p-6 text-white shadow-sm md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <Badge className="bg-[#FFC736] text-[#110843] hover:bg-[#FFC736]">
              Landing Page Content
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Manage dynamic Home content in one simple place.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Update hero banners, benefit cards, promo sections, and article cards without editing code.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <LayoutTemplate className="h-5 w-5 text-[#FFC736]" />
                <div>
                  <p className="text-2xl font-bold">{banners.length + promos.length}</p>
                  <p className="text-xs text-white/65">Visual Sections</p>
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

      <SectionCard title="Hero Banners" description="Carousel slides shown at the top of the Home page.">
        <BannerForm />
        {banners.map((banner) => <BannerForm key={banner.id} banner={banner} />)}
      </SectionCard>

      <SectionCard title="Benefits" description="Small trust cards below the hero section.">
        <BenefitForm />
        {benefits.map((benefit) => <BenefitForm key={benefit.id} benefit={benefit} />)}
      </SectionCard>

      <SectionCard title="Promo Tiles" description="Marketing tiles shown in the Home promo mosaic.">
        <PromoForm />
        {promos.map((promo) => <PromoForm key={promo.id} promo={promo} />)}
      </SectionCard>

      <SectionCard title="Articles" description="Latest article cards shown near the bottom of Home.">
        <ArticleForm />
        {articles.map((article) => <ArticleForm key={article.id} article={article} />)}
      </SectionCard>
    </div>
  )
}
