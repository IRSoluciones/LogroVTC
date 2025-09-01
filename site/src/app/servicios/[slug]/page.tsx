import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchServiceBySlug, type ServiceDto, type StrapiItem } from "@/lib/strapi";

type PageParams = Promise<{ slug: string }>;
type PageProps = { params: PageParams };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchServiceBySlug(slug);
  const s = (item as StrapiItem<ServiceDto> | null)?.attributes;
  if (!s) return {};
  const title = `${s.name} | LogroVTC`;
  const description = s.description;
  const url = `https://logro-vtc.vercel.app/servicios/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "es_ES" },
    keywords: s.keywords,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const item = await fetchServiceBySlug(slug);
  const s = (item as StrapiItem<ServiceDto> | null)?.attributes;
  if (!s) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">{s.title}</h1>
      <p className="mt-3 text-muted-foreground">{s.intro}</p>
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {(s.benefits ?? []).map((b, i) => (
          <article key={i} className="rounded-xl border p-5 bg-card">
            <h3 className="text-base font-medium">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
}


