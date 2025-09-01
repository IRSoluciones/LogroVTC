import type { Metadata } from "next";
import Link from "next/link";
import { fetchServices, type StrapiItem, type ServiceDto } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Servicios | LogroVTC",
  description: "Servicios de traslados VTC en La Rioja: aeropuertos, Camino y mensajería.",
  alternates: { canonical: "https://logro-vtc.vercel.app/servicios" },
  openGraph: {
    title: "Servicios | LogroVTC",
    description: "Listado de servicios VTC.",
    url: "https://logro-vtc.vercel.app/servicios",
    type: "website",
  },
};

export default async function ServiciosIndexPage() {
  let items: Array<StrapiItem<ServiceDto>> = [];
  try {
    const json = await fetchServices();
    items = json.data;
  } catch {}

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Servicios</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <article key={it.id} className="rounded-xl border p-5 bg-card">
            <h2 className="text-xl font-semibold">{it.attributes.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{it.attributes.description}</p>
            <div className="mt-4">
              <Link className="underline" href={`/servicios/${it.attributes.slug}`}>Ver detalle</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}


