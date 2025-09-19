import type { MetadataRoute } from "next";
import { services, airports, stations } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://logro-vtc.vercel.app";
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/aeropuertos`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/estaciones`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/localidades`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/aviso-legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politica-cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politica-privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politica-accesibilidad`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  services.forEach((s) => {
    entries.push({ url: `${base}/servicios/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.9 });
  });
  airports.forEach((a) => {
    entries.push({ url: `${base}/aeropuertos/${a.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  });
  stations.forEach((s) => {
    entries.push({ url: `${base}/estaciones/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  });

  return entries;
}


