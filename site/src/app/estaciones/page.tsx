import type { Metadata } from "next";
import Link from "next/link";
import { fetchStations, type StrapiItem, type StationDto } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Estaciones | LogroVTC",
  description: "Traslados a estaciones de tren y bus cercanas a La Rioja.",
  alternates: { canonical: "https://logro-vtc.vercel.app/estaciones" },
};

export default async function EstacionesIndexPage() {
  let items: Array<StrapiItem<StationDto>> = [];
  try {
    const json = await fetchStations();
    items = json.data;
  } catch {}
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Estaciones</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((it) => (
          <article key={it.id} className="rounded-xl border p-5 bg-card">
            <h2 className="text-lg font-semibold">{it.attributes.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{it.attributes.intro}</p>
            <div className="mt-4">
              <Link className="underline" href={`/estaciones/${it.attributes.slug}`}>Ver traslado</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { stations } from "@/lib/site-data";
import { isStrapiEnabled, fetchStations } from "@/lib/strapi";
import Reveal from "@/components/visual/Reveal";

export const metadata: Metadata = {
  title: "Estaciones | LogroVTC",
  description: "Traslados a estaciones de tren y bus cercanas a La Rioja.",
  alternates: { canonical: "https://example.com/estaciones" },
  openGraph: { title: "Estaciones | LogroVTC", description: "Listado de estaciones.", url: "https://example.com/estaciones", type: "website" },
};

export default async function EstacionesIndexPage() {
  const list = isStrapiEnabled
    ? await (async () => {
        try {
          const json = await fetchStations();
          return json.data.map((it) => it.attributes);
        } catch (e) {
          return stations;
        }
      })()
    : stations;
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight">Estaciones</h1>
      </Reveal>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {list.map((s: { slug: string; name: string; intro: string }, i: number) => (
          <Reveal key={s.slug} delay={i * 80}>
            <Card className="border-border/80 bg-gradient-to-b from-card to-card/60">
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.intro}</p>
                <div className="mt-4">
                  <Link className="underline" href={`/estaciones/${s.slug}`}>Ver traslado</Link>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}


