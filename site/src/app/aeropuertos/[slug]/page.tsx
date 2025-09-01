import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchAirportBySlug, type AirportDto, type StrapiItem } from "@/lib/strapi";

type PageParams = Promise<{ slug: string }>;
type PageProps = { params: PageParams };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchAirportBySlug(slug);
  const a = (item as StrapiItem<AirportDto> | null)?.attributes;
  if (!a) return {};
  const title = `${a.name} | Traslados VTC | LogroVTC`;
  const description = a.description;
  const url = `https://logro-vtc.vercel.app/aeropuertos/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "es_ES" },
    keywords: a.keywords,
  };
}

export default async function AirportPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await fetchAirportBySlug(slug);
  const a = (item as StrapiItem<AirportDto> | null)?.attributes;
  if (!a) return notFound();
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Traslados a {a.name}{a.code ? ` (${a.code})` : ""}</h1>
      <p className="mt-3 text-muted-foreground">{a.intro}</p>
    </main>
  );
}


