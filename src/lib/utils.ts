import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format number to Indonesian Rupiah
 */
export function rupiahFormat(value?: number | bigint | null) {
  if (!value) return "Rp0"

  const number = typeof value === "bigint" ? Number(value) : value

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number)
}

/**
 * Format date
 */
export function dateFormat(date?: Date | string | null) {
  if (!date) return "-"

  const d = new Date(date)

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d)
}

/**
 * Convert text to slug
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

/**
 * Validate uploaded images
 */
export function validateFiles(files: File[]): string | null {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
  const maxSize = 2 * 1024 * 1024 // 2MB

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, JPEG, and PNG files are allowed."
    }

    if (file.size > maxSize) {
      return "File size must be less than 2MB."
    }
  }

  return null
}