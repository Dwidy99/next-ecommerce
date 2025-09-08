import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
        {
        protocol: 'https',
        hostname: 'ypguddizaarcqalpozre.supabase.co'
      }
    ],
  },
};

export default nextConfig;
