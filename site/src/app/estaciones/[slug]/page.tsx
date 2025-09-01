import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchStationBySlug, type StationDto, type StrapiItem } from "@/lib/strapi";

type PageParams = Promise<{ slug: string }>;
type PageProps = { params: PageParams };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchStationBySlug(slug);
  const st = (item as StrapiItem<StationDto> | null)?.attributes;
  if (!st) return {};
  const title = `${st.name} | Traslados VTC | LogroVTC`;
  const description = st.description;
  const url = `https://logro-vtc.vercel.app/estaciones/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "es_ES" },
    keywords: st.keywords,
  };
}

export default async function StationPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await fetchStationBySlug(slug);
  const st = (item as StrapiItem<StationDto> | null)?.attributes;
  if (!st) return notFound();
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Traslados a {st.name}</h1>
      <p className="mt-3 text-muted-foreground">{st.intro}</p>
    </main>
  );
}


