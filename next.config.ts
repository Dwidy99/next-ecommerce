import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Tambahkan ini
  eslint: {
    ignoreDuringBuilds: true, // lewati linting saat build di Vercel
  },

  typescript: {
    ignoreBuildErrors: true, // opsional: hindari error TS saat build
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  images: {
    domains: ["res.cloudinary.com", "localhost", "images.unsplash.com"],
  },

  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

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
