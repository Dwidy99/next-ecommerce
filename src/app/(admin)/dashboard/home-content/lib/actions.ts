"use server"

import { refreshAndRedirect } from "@/lib/nextjs"
import { slugify } from "@/lib/utils"
import { prisma } from "lib/prisma"

const homeContentPath = "/dashboard/home-content"

function text(data: FormData, key: string, fallback = "") {
  const value = data.get(key)
  return typeof value === "string" && value.trim() ? value.trim() : fallback
}

function optionalText(data: FormData, key: string) {
  const value = text(data, key)
  return value || null
}

function numberValue(data: FormData, key: string, fallback = 0) {
  const value = Number(data.get(key))
  return Number.isFinite(value) ? value : fallback
}

function isActive(data: FormData) {
  return data.get("is_active") === "on"
}

/* CREATE */

export async function createHomeBanner(formData: FormData) {
  await prisma.homeBanner.create({
    data: {
      eyebrow: optionalText(formData, "eyebrow"),
      title: text(formData, "title", "Untitled Banner"),
      description: optionalText(formData, "description"),
      image: text(formData, "image", "/assets/banners/1.jpg"),
      primary_label: optionalText(formData, "primary_label"),
      primary_url: optionalText(formData, "primary_url"),
      secondary_label: optionalText(formData, "secondary_label"),
      secondary_url: optionalText(formData, "secondary_url"),
      sort_order: numberValue(formData, "sort_order"),
      is_active: true,
    },
  })

  refreshAndRedirect(homeContentPath)
}

export async function createHomeBenefit(formData: FormData) {
  await prisma.homeBenefit.create({
    data: {
      title: text(formData, "title", "New Benefit"),
      description: text(formData, "description", "Short benefit description"),
      icon: optionalText(formData, "icon"),
      sort_order: numberValue(formData, "sort_order"),
      is_active: true,
    },
  })

  refreshAndRedirect(homeContentPath)
}

export async function createHomePromo(formData: FormData) {
  await prisma.homePromo.create({
    data: {
      title: text(formData, "title", "New Promo"),
      subtitle: optionalText(formData, "subtitle"),
      label: optionalText(formData, "label"),
      image: text(formData, "image", "/assets/banners/1.jpg"),
      button_text: optionalText(formData, "button_text"),
      button_url: optionalText(formData, "button_url"),
      sort_order: numberValue(formData, "sort_order"),
      is_active: true,
    },
  })

  refreshAndRedirect(homeContentPath)
}

export async function createArticle(formData: FormData) {
  const title = text(formData, "title", "New Article")

  await prisma.article.create({
    data: {
      title,
      slug: text(formData, "slug", slugify(title)),
      excerpt: optionalText(formData, "excerpt"),
      content: optionalText(formData, "content"),
      image: optionalText(formData, "image"),
      meta: optionalText(formData, "meta"),
      is_active: true,
      published_at: new Date(),
    },
  })

  refreshAndRedirect(homeContentPath)
}

/* UPDATE */

export async function updateHomeBanner(formData: FormData) {
  const id = numberValue(formData, "id")
  if (!id) throw new Error("Invalid banner ID")

  await prisma.homeBanner.update({
    where: { id },
    data: {
      eyebrow: optionalText(formData, "eyebrow"),
      title: text(formData, "title", "Untitled Banner"),
      description: optionalText(formData, "description"),
      image: text(formData, "image", "/assets/banners/1.jpg"),
      primary_label: optionalText(formData, "primary_label"),
      primary_url: optionalText(formData, "primary_url"),
      secondary_label: optionalText(formData, "secondary_label"),
      secondary_url: optionalText(formData, "secondary_url"),
      sort_order: numberValue(formData, "sort_order"),
      is_active: isActive(formData),
    },
  })

  refreshAndRedirect(homeContentPath)
}

export async function updateHomeBenefit(formData: FormData) {
  const id = numberValue(formData, "id")
  if (!id) throw new Error("Invalid benefit ID")

  await prisma.homeBenefit.update({
    where: { id },
    data: {
      title: text(formData, "title", "New Benefit"),
      description: text(formData, "description", "Short benefit description"),
      icon: optionalText(formData, "icon"),
      sort_order: numberValue(formData, "sort_order"),
      is_active: isActive(formData),
    },
  })

  refreshAndRedirect(homeContentPath)
}

export async function updateHomePromo(formData: FormData) {
  const id = numberValue(formData, "id")
  if (!id) throw new Error("Invalid promo ID")

  await prisma.homePromo.update({
    where: { id },
    data: {
      title: text(formData, "title", "New Promo"),
      subtitle: optionalText(formData, "subtitle"),
      label: optionalText(formData, "label"),
      image: text(formData, "image", "/assets/banners/1.jpg"),
      button_text: optionalText(formData, "button_text"),
      button_url: optionalText(formData, "button_url"),
      sort_order: numberValue(formData, "sort_order"),
      is_active: isActive(formData),
    },
  })

  refreshAndRedirect(homeContentPath)
}

export async function updateArticle(formData: FormData) {
  const id = numberValue(formData, "id")
  const title = text(formData, "title", "New Article")
  if (!id) throw new Error("Invalid article ID")

  await prisma.article.update({
    where: { id },
    data: {
      title,
      slug: text(formData, "slug", slugify(title)),
      excerpt: optionalText(formData, "excerpt"),
      content: optionalText(formData, "content"),
      image: optionalText(formData, "image"),
      meta: optionalText(formData, "meta"),
      is_active: isActive(formData),
    },
  })

  refreshAndRedirect(homeContentPath)
}

/* DELETE */

export async function deleteHomeBanner(formData: FormData) {
  const id = numberValue(formData, "id")
  if (!id) throw new Error("Invalid banner ID")
  await prisma.homeBanner.delete({ where: { id } })
  refreshAndRedirect(homeContentPath)
}

export async function deleteHomeBenefit(formData: FormData) {
  const id = numberValue(formData, "id")
  if (!id) throw new Error("Invalid benefit ID")
  await prisma.homeBenefit.delete({ where: { id } })
  refreshAndRedirect(homeContentPath)
}

export async function deleteHomePromo(formData: FormData) {
  const id = numberValue(formData, "id")
  if (!id) throw new Error("Invalid promo ID")
  await prisma.homePromo.delete({ where: { id } })
  refreshAndRedirect(homeContentPath)
}

export async function deleteArticle(formData: FormData) {
  const id = numberValue(formData, "id")
  if (!id) throw new Error("Invalid article ID")
  await prisma.article.delete({ where: { id } })
  refreshAndRedirect(homeContentPath)
}
