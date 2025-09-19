import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/mail",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.in" },
      { protocol: "https", hostname: "**.vercel.app" },
    ],
  },
  async rewrites() {
    return [
      // Permite usar /api/* aunque la app esté bajo basePath /mail
      { source: "/api/:path*", destination: "/mail/api/:path*" },
    ];
  },
};

export default nextConfig;
