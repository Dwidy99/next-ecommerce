import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey)

export const getImageUrl = (name: string) => {
    const { data } = supabase
        .storage
        .from('e-commerce')
        .getPublicUrl(`public/brands/${name}`)

    return data.publicUrl
}