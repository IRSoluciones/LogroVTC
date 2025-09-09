import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Fija la raíz para evitar que detecte otro package-lock fuera
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.strapiapp.com" },
      { protocol: 
        
        "
        https", hostname: "**.railway.app" },
      { protocol: "https", hostname: "**.onrender.com" },
      { protocol: "http", hostname: "localhost", port: "1337" },
    ],
  },
};

export default nextConfig;
