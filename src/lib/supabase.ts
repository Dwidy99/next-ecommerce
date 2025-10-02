import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey)

export const getImageUrl = (name: string, path: 'brands' | 'products') => {
  const { data } = supabase
    .storage
    .from('e-commerce')
    .getPublicUrl(`public/${path}/${name}`)

  return data.publicUrl
}

export const uploadFile = async (file: File, path: 'brands' | 'products' = "brands") => {
  'image/png'

  const fileType = file.type.split('/')[1]
  const filename = `${path}-${Date.now()}.${fileType}`;

  const { error } = await supabase
    .storage
    .from('e-commerce')
    .upload(`public/${path}/${filename}`, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error;

  return filename;
}

export async function checkFileExists(filename: string, path: "brands" | "products" = "brands"): Promise<boolean> {
  const { error } = await supabase
    .storage
    .from("e-commerce")
    .download(`public/${path}/${filename}`);
  return !error;
}

export const deleteFile = async (filename: string, path: "brands" | "products" = "brands") => {
  const { data, error } = await supabase
    .storage
    .from('e-commerce')
    .remove([`public/${path}/${filename}`]);

  if (error) {
    console.warn("Failed delete old file:", error.message);
  }

}