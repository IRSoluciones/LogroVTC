import type { Metadata } from "next";
import Link from "next/link";
import { fetchAirports, type StrapiItem } from "@/lib/strapi";
import type { AirportDto } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Aeropuertos | LogroVTC",
  description: "Traslados a aeropuertos desde La Rioja y Rioja Alavesa.",
  alternates: { canonical: "https://logro-vtc.vercel.app/aeropuertos" },
};

export default async function AeropuertosIndexPage() {
  let items: Array<StrapiItem<AirportDto>> = [];
  try {
    const json = await fetchAirports();
    items = json.data;
  } catch {}
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Aeropuertos</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((it) => (
          <article key={it.id} className="rounded-xl border p-5 bg-card">
            <h2 className="text-lg font-semibold">{it.attributes.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{it.attributes.intro}</p>
            <div className="mt-4">
              <Link className="underline" href={`/aeropuertos/${it.attributes.slug}`}>Ver traslado</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}


