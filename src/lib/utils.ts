import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function rupiahFormat(value: number) {
  return Intl.NumberFormat("id-ID", {
    style: 'currency',
    currency: "IDR",
  }).format(value)
}

export function dateFormat(date: Date | null, format = 'DD MMMM YYYY') {
  if (!date) {
    return dayjs().format(format)
  }
  return dayjs(date).format(format)
}

export function validateFiles(files: File[]): string | null {
  const MAX_SIZE = 300 * 1024; // 300 KB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  if (files.length !== 3) {
    return "You must upload exactly 3 images.";
  }

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `File ${file.name} is not a supported image type.`;
    }
    if (file.size > MAX_SIZE) {
      return `File ${file.name} is too large. Maximum allowed size is 300 KB.`;
    }
  }

  return null; // valid
}


export function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}
