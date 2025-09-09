import type { MetadataRoute } from "next";
import { services, airports, stations, localities } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
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
  // Localidades
  entries.push({ url: `${base}/localidades`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
  localities.forEach((l) => {
    entries.push({ url: `${base}/localidades/${l.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  });

  return entries;
}


