import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Aktifkan fitur-fitur eksperimental modern
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // Batas upload untuk Server Actions
    },
  },

  // ✅ Atur domain gambar agar tidak error di Next Image
  images: {
    domains: ["res.cloudinary.com", "localhost", "images.unsplash.com"],
  },

  // ✅ Pastikan environment variables diinject ke runtime
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  typescript: {
    ignoreBuildErrors: false, // ubah ke true kalau masih ada type warning
  },

  // ✅ Atur header atau redirects opsional
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
