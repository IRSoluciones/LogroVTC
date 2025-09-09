import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/visual/Reveal";
import HeroWithForm from "@/components/sections/HeroWithForm";
import { localities, getLocalityBySlug } from "@/lib/site-data";

type PageParams = Promise<{ slug: string }> | { slug: string };
type PageProps = { params: PageParams };

export async function generateStaticParams() {
  return localities.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocalityBySlug(slug);
  if (!l) return {};
  const title = `${l.name} | VTC y traslados | LogroVTC`;
  const description = l.intro;
  const url = `https://example.com/localidades/${l.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "es_ES" },
    keywords: l.keywords,
  };
}

export default async function LocalityPage({ params }: PageProps) {
  const { slug } = await params;
  const l = getLocalityBySlug(slug);
  if (!l) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 pt-0 pb-10">
      <Reveal>
        <HeroWithForm
          title={`VTC en ${l.name}`}
          subtitle={l.intro}
          serviceType="aeropuerto"
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Localidades", href: "/localidades" },
            { label: l.name },
          ]}
        />
      </Reveal>

      <section className="mt-16">
        <Reveal>
          <div className="prose prose-neutral max-w-none">
            <p>{l.description}</p>
            <ul>
              <li>Traslados a aeropuertos más cercanos</li>
              <li>Apoyo al Camino de Santiago y rutas locales</li>
              <li>Visitas a bodegas y enoturismo</li>
              <li>Servicios para empresas y eventos</li>
            </ul>
          </div>
        </Reveal>
      </section>
    </main>
  );
}


