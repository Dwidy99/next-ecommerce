/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Masih boleh, tapi gunakan hanya jika perlu
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Server Actions (masih experimental, aman digunakan)
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // ✅ Ganti images.domains → remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },

  // ✅ Security headers
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
