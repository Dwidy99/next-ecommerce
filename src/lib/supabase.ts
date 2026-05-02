import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseKey)

const SUPABASE_BUCKET_PUBLIC_PREFIX = "/storage/v1/object/public/e-commerce/"
const fallbackImageByPath = {
  brands: "/assets/logos/logos.svg",
  products: "/assets/products/placeholder.svg",
  users: "/assets/icons/profile-circle.svg",
} satisfies Record<"brands" | "products" | "users", string>

export type UploadPath = "brands" | "products" | "users"

function normalizeStoragePath(
  name: string,
  path: UploadPath
) {
  const value = name.trim()

  if (!value) return ""

  if (/^https?:\/\//i.test(value)) {
    return value
  }

  const cleanName = value.replace(/^\/+/, "")

  if (cleanName.startsWith("assets/")) {
    return `/${cleanName}`
  }

  if (cleanName.startsWith("uploads/")) {
    return fallbackImageByPath[path]
  }

  const prefixes = [
    `public/${path}/`,
    `${path}/`,
    "public/",
  ]

  const normalizedName = prefixes.reduce((result, prefix) => {
    return result.startsWith(prefix) ? result.slice(prefix.length) : result
  }, cleanName)

  return `public/${path}/${normalizedName}`
}

function extractSupabaseStoragePath(value: string) {
  try {
    const url = new URL(value)
    const marker = "/storage/v1/object/public/e-commerce/"
    const markerIndex = url.pathname.indexOf(marker)

    if (markerIndex === -1) return ""

    return url.pathname.slice(markerIndex + marker.length)
  } catch {
    return ""
  }
}

export const getImageUrl = (
  name: string,
  path: UploadPath
) => {
  if (!name) return "";

  const value = name.trim()

  if (!value) return ""

  const normalizedPath = value.includes(SUPABASE_BUCKET_PUBLIC_PREFIX)
    ? normalizeStoragePath(extractSupabaseStoragePath(value), path)
    : normalizeStoragePath(value, path)

  if (!normalizedPath) return ""

  if (normalizedPath.startsWith("/")) {
    return normalizedPath
  }

  const { data } = supabase.storage
    .from("e-commerce")
    .getPublicUrl(normalizedPath);

  return data.publicUrl;
};

export async function checkFileExists(filename: string, path: UploadPath = "users"): Promise<boolean> {
  const { error } = await supabase
    .storage
    .from("e-commerce")
    .download(`public/${path}/${filename}`);
  return !error;
}

export const deleteFile = async (
  filename: string,
  path: UploadPath = "users"
) => {
  if (!filename) return;

  const { error } = await supabase.storage
    .from("e-commerce")
    .remove([`public/${path}/${filename}`]);

  if (error) {
    console.warn("Failed to delete old file:", error.message);
  }
};
