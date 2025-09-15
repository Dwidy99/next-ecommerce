import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ypguddizaarcqalpozre.supabase.co",
      },
    ],
  },
  serverActions: {
    bodySizeLimit: "2mb", // ⬅️ Tambahkan ini untuk mengizinkan upload hingga 5MB
  },
};

export default nextConfig;