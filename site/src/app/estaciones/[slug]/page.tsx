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

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stations, getStationBySlug, type Station } from "@/lib/site-data";
import { isStrapiEnabled, fetchStations, fetchStationBySlug, type StrapiItem, type StationDto } from "@/lib/strapi";
import HeroWithForm from "@/components/sections/HeroWithForm";
import ServicesNav from "@/components/sections/ServicesNav";
import Reviews from "@/components/sections/Reviews";
import Gallery from "@/components/sections/Gallery";
import CTASection from "@/components/sections/CTASection";
import FAQs from "@/components/sections/FAQs";
import OtherServices from "@/components/sections/OtherServices";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/visual/Reveal";

type PageParams = Promise<{ slug: string }>;
type PageProps = { params: PageParams };

export async function generateStaticParams() {
  if (isStrapiEnabled) {
    try {
      const json = await fetchStations();
      return json.data.map((it: StrapiItem<StationDto>) => ({ slug: it.attributes.slug }));
    } catch {}
  }
  return stations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (isStrapiEnabled) {
    const item = await fetchStationBySlug(slug);
    const st = item?.attributes;
    if (st) {
      const title = `${st.name} | Traslados VTC | LogroVTC`;
      const description = st.description;
      const url = `https://example.com/estaciones/${slug}`;
      return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: { title, description, url, type: "article", locale: "es_ES" },
        keywords: st.keywords,
      };
    }
  }
  const station = getStationBySlug(slug);
  if (!station) return {};
  const title = `${station.name} | Traslados VTC | LogroVTC`;
  const description = station.description;
  const url = `https://example.com/estaciones/${station.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "es_ES" },
    keywords: station.keywords,
  };
}

export default async function StationPage({ params }: PageProps) {
  const { slug } = await params;
  let station: Station | undefined = getStationBySlug(slug);
  if (isStrapiEnabled) {
    const item = await fetchStationBySlug(slug);
    const st = item?.attributes;
    if (st) {
      const inferredType: "tren" | "bus" = st.type === "tren" || st.type === "bus" ? st.type : "tren";
      station = {
        slug,
        name: st.name,
        city: st.city ?? "",
        type: inferredType,
        intro: st.intro,
        description: st.description,
        keywords: st.keywords ?? [],
      };
    }
  }
  if (!station) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 pt-0 pb-10">
      <Reveal>
        <HeroWithForm
          title={`Traslados a ${station.name}`}
          subtitle={station.intro}
          serviceType="aeropuerto"
          breadcrumbs={[
            { label: "Inicio", href: "/" },
            { label: "Estaciones", href: "/estaciones" },
            { label: station.name },
          ]}
        />
      </Reveal>

      <section className="mt-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight">Detalles del servicio</h2>
        </Reveal>
        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {["Recogida puntual", "Coordinación de horarios", "Confort hasta 7 plazas", "Servicio 24/7"].map((title, i) => (
            <Reveal key={i} delay={i * 80}>
              <Card className="border-border/80 bg-gradient-to-b from-card to-card/60 p-0">
                <CardContent className="p-4">
                  <h3 className="text-base font-medium">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {i === 0 && "En domicilio, hotel o empresa según prefieras."}
                    {i === 1 && "Nos ajustamos a la salida/llegada de tu tren o bus."}
                    {i === 2 && "Espacio para equipaje y pago con tarjeta."}
                    {i === 3 && "Disponibilidad con reserva previa en cualquier horario."}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal><ServicesNav /></Reveal>
      <Reveal><Reviews /></Reveal>
      <Reveal><Gallery count={8} /></Reveal>

      <Reveal><FAQs items={getStationFaqs()} /></Reveal>

      <Reveal><OtherServices /></Reveal>
      <Reveal><CTASection /></Reveal>
    </main>
  );
}

function getStationFaqs() {
  return [
    { q: "¿Llegáis con tiempo al andén?", a: "Sí, planificamos la recogida para llegar con antelación suficiente según el horario de tu tren o bus." },
    { q: "¿Esperáis si el tren se retrasa?", a: "Sí, ofrecemos un margen de espera razonable. Si el retraso es prolongado, nos coordinamos contigo por teléfono." },
    { q: "¿Podéis llevar bicicletas o equipaje voluminoso?", a: "Sí, bajo petición previa para asignar un vehículo adecuado." },
    { q: "¿Emitís factura?", a: "Sí, emitimos factura para empresas y particulares que lo soliciten." },
    { q: "¿Podéis recogerme dentro de la estación?", a: "Sí, nos coordinamos por teléfono para un punto de encuentro cómodo dentro o junto a la estación." },
    { q: "¿Aceptáis mascotas?", a: "Aceptamos mascotas en transportín o bajo condiciones acordadas previamente." },
    { q: "¿Realizáis traslados entre estaciones?", a: "Sí, conectamos estaciones y aeropuertos, y podemos incluir paradas intermedias." },
    { q: "¿Qué ocurre si pierdo el tren?", a: "Podemos reprogramar el servicio sujeto a disponibilidad; indícanos la nueva hora cuanto antes." },
  ];
}


