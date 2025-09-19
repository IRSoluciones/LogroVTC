import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://logro-vtc.vercel.app";
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
