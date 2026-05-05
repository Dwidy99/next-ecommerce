"use server";

import { refreshAndRedirect } from "@/lib/nextjs";
import { slugify } from "@/lib/utils";
import { prisma } from "lib/prisma";

const homeContentPath = "/dashboard/home-content";

function text(data: FormData, key: string, fallback = "") {
  const value = data.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function optionalText(data: FormData, key: string) {
  const value = text(data, key);
  return value || null;
}

function numberValue(data: FormData, key: string, fallback = 0) {
  const value = Number(data.get(key));
  return Number.isFinite(value) ? value : fallback;
}

function isActive(data: FormData) {
  return data.get("is_active") === "on";
}

/* CONTENT SECTION CRUD */

export async function createContentSection(formData: FormData) {
  await prisma.contentSection.create({
    data: {
      key: text(formData, "key", slugify(text(formData, "name", "new-section"))),
      name: text(formData, "name", "New Section"),
      type: text(formData, "type", "custom"),
      title: optionalText(formData, "title"),
      highlight: optionalText(formData, "highlight"),
      description: optionalText(formData, "description"),
      sort_order: numberValue(formData, "sort_order"),
      is_active: true,
    },
  });

  refreshAndRedirect(homeContentPath);
}

export async function updateContentSection(formData: FormData) {
  const id = numberValue(formData, "id");
  if (!id) throw new Error("Invalid section ID");

  await prisma.contentSection.update({
    where: { id },
    data: {
      key: text(formData, "key", "section"),
      name: text(formData, "name", "Section"),
      type: text(formData, "type", "custom"),
      title: optionalText(formData, "title"),
      highlight: optionalText(formData, "highlight"),
      description: optionalText(formData, "description"),
      sort_order: numberValue(formData, "sort_order"),
      is_active: isActive(formData),
    },
  });

  refreshAndRedirect(homeContentPath);
}

export async function deleteContentSection(formData: FormData) {
  const id = numberValue(formData, "id");
  if (!id) throw new Error("Invalid section ID");

  await prisma.contentSection.delete({ where: { id } });
  refreshAndRedirect(homeContentPath);
}

/* CONTENT SECTION ITEM CRUD */

export async function createContentItem(formData: FormData) {
  const sectionId = numberValue(formData, "section_id");
  if (!sectionId) throw new Error("Invalid section ID");

  await prisma.contentSectionItem.create({
    data: {
      section_id: sectionId,
      type: text(formData, "type", "card"),
      title: optionalText(formData, "title"),
      subtitle: optionalText(formData, "subtitle"),
      description: optionalText(formData, "description"),
      image: optionalText(formData, "image"),
      icon: optionalText(formData, "icon"),
      label: optionalText(formData, "label"),
      button_text: optionalText(formData, "button_text"),
      button_url: optionalText(formData, "button_url"),
      reference_type: optionalText(formData, "reference_type"),
      reference_id: numberValue(formData, "reference_id") || null,
      sort_order: numberValue(formData, "sort_order"),
      is_active: true,
    },
  });

  refreshAndRedirect(homeContentPath);
}

export async function updateContentItem(formData: FormData) {
  const id = numberValue(formData, "id");
  if (!id) throw new Error("Invalid item ID");

  await prisma.contentSectionItem.update({
    where: { id },
    data: {
      type: text(formData, "type", "card"),
      title: optionalText(formData, "title"),
      subtitle: optionalText(formData, "subtitle"),
      description: optionalText(formData, "description"),
      image: optionalText(formData, "image"),
      icon: optionalText(formData, "icon"),
      label: optionalText(formData, "label"),
      button_text: optionalText(formData, "button_text"),
      button_url: optionalText(formData, "button_url"),
      reference_type: optionalText(formData, "reference_type"),
      reference_id: numberValue(formData, "reference_id") || null,
      sort_order: numberValue(formData, "sort_order"),
      is_active: isActive(formData),
    },
  });

  refreshAndRedirect(homeContentPath);
}

export async function deleteContentItem(formData: FormData) {
  const id = numberValue(formData, "id");
  if (!id) throw new Error("Invalid item ID");

  await prisma.contentSectionItem.delete({ where: { id } });
  refreshAndRedirect(homeContentPath);
}

/* ARTICLE MASTER CRUD */

export async function createArticle(formData: FormData) {
  const title = text(formData, "title", "New Article");

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
  });

  refreshAndRedirect(homeContentPath);
}

export async function updateArticle(formData: FormData) {
  const id = numberValue(formData, "id");
  const title = text(formData, "title", "New Article");
  if (!id) throw new Error("Invalid article ID");

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
  });

  refreshAndRedirect(homeContentPath);
}

export async function deleteArticle(formData: FormData) {
  const id = numberValue(formData, "id");
  if (!id) throw new Error("Invalid article ID");

  await prisma.article.delete({ where: { id } });
  refreshAndRedirect(homeContentPath);
}
