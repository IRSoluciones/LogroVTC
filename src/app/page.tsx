"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Mail,
  Package,
  Plane,
  Route,
  Globe2,
  Bike,
  ParkingCircle,
  MapPin,
  MessageCircle,
  FileCheck,
  FileText,
  Receipt,
  PhoneCall,
  Home,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import InteractiveBackground from "@/components/visual/InteractiveBackground";
import ServiceModal from "@/components/ui/modal";
import GenericModal from "@/components/ui/generic-modal";
import Reveal from "@/components/visual/Reveal";
import { airports, stations } from "@/lib/site-data";

export default function HomePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalServiceType, setModalServiceType] = useState<"aeropuerto" | "camino" | "mensajeria">("aeropuerto");
  const [genericModalOpen, setGenericModalOpen] = useState(false);
  const galleryImages = Array.from({ length: 12 }, (_, i) => `/vehicles/vehicle-${i + 1}.jpg`).slice(0, 4);

  const openModal = (serviceType: "aeropuerto" | "camino" | "mensajeria") => {
    setModalServiceType(serviceType);
    setModalOpen(true);
  };

  const openGenericModal = () => {
    setGenericModalOpen(true);
  };

  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* HERO con superposición y tipografía display */}
      <Reveal>
        <section id="inicio" className="relative pt-10 md:pt-16">
          <InteractiveBackground />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-[var(--font-display)] text-6xl md:text-7xl font-extrabold leading-[0.95]">
                Traslados VTC en La Rioja
                <br /> y el Norte de España
              </h1>
              <p className="mt-5 text-muted-foreground text-lg max-w-prose">
                LogroVTC es un equipo de conductores profesionales con base en La Rioja y Rioja Alavesa. Realizamos
                traslados a aeropuertos y estaciones, apoyo al Camino de Santiago, mensajería urgente y rutas turísticas por
                todo el norte de España. Flota moderna, atención cercana, puntualidad y pago con tarjeta.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="tel:684200659">
                    Llamar ahora <ArrowRight size={16} />
                  </a>
                </Button>
                <Button variant="outline" size="lg" onClick={openGenericModal}>
                  Solicitar presupuesto <Mail size={16} />
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Formulario de solicitud rápido ocupando la columna */}
              <form action="/api/contact" method="post" className="relative rounded-2xl border border-border bg-white/80 backdrop-blur p-6">
                <h3 className="text-xl font-semibold mb-1">Solicita tu servicio</h3>
                <p className="text-sm text-muted-foreground mb-3">Este formulario se enviará al equipo de LogroVTC. Nos pondremos en contacto contigo lo antes posible para confirmar los detalles de tu traslado.</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <input name="nombre" placeholder="Nombre" required className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
                  <input name="telefono" placeholder="Teléfono" required className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
                </div>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  <input name="origen" placeholder="Origen" required className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
                  <input name="destino" placeholder="Destino" required className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
                </div>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  <input type="date" name="fecha" className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
                  <input type="time" name="hora" className="h-11 rounded-md border border-input px-3 outline-none focus:ring-2 focus:ring-ring/50" />
                </div>
                <textarea name="detalles" rows={6} placeholder="Detalles del servicio (nº de pasajeros, equipaje, paradas, instrucciones, etc.)" className="mt-3 w-full rounded-md border border-input px-3 py-2 outline-none focus:ring-2 focus:ring-ring/50" />
                <Button type="submit" className="w-full mt-4">Solicitar servicio</Button>
              </form>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FEATURES DESTACADAS */}
      <Reveal>
        <section id="features" className="mt-16">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Pago con tarjeta", desc: "Aceptamos tarjetas y pagos digitales. Factura para empresa." },
              { title: "Cobertura regional, nacional e internacional", desc: "Servicios a cualquier punto de España y rutas internacionales." },
              { title: "Conductores experimentados", desc: "Profesionales locales con atención cercana y puntualidad." },
              { title: "Hasta 7 plazas", desc: "Flota amplia: turismos y furgonetas confort hasta 7 pasajeros." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card className="border-border/80 bg-gradient-to-b from-card to-card/60 p-0">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* SERVICIOS RESUMEN */}
      <Reveal>
        <section id="servicios" className="mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Servicios principales</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[{
              icon: <Plane className="text-primary w-6 h-6" />, 
              title: "Transporte a aeropuertos", 
              desc: "Traslados a aeropuertos y estaciones: Madrid, Bilbao, Zaragoza, Barcelona, Logroño…",
              slug: "aeropuerto"
            }, {
              icon: <Route className="text-primary w-6 h-6" />, 
              title: "Camino de Santiago", 
              desc: "Asistencia y traslados entre etapas en coche o furgoneta. Expertos en apoyo al peregrino.",
              slug: "camino"
            }, {
              icon: <Package className="text-primary w-6 h-6" />, 
              title: "Mensajería urgente", 
              desc: "Entregas puerta a puerta en toda España y Europa con seguimiento.",
              slug: "mensajeria"
            }].map(({ icon, title, desc, slug }, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <Card className="border-border/80 bg-gradient-to-b from-card to-card/60 p-0">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      {icon}
                      <h3 className="text-lg font-medium">{title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
                    <div className="mt-4">
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        <Link href={`/servicios/${slug}`}>
                          Ver más detalles
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* OPINIONES DE CLIENTES */}
      <Reveal>
        <section id="opiniones" className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold">Lo que dicen nuestros clientes</h3>
            <p className="mt-3 text-muted-foreground">Experiencias reales de viajeros que han confiado en nuestros servicios</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "melanie dorado", avatar: "m", bg: "bg-orange-500", time: "Hace 2 semanas", review: "Tuvimos una experiencia buenisa. Todos los choferes son muy amables y destacar la limpieza de los vehículos. Muy recomendable 10 de 10", isNew: true },
              { name: "Ana Car", avatar: "A", bg: "bg-blue-500", time: "Hace un mes", review: "Me ha tocado ir un par de veces a la estación de madrugada desde Villamediana... Ninguna queja las veces que lo he utilizado", reviews: "11 reseñas" },
              { name: "Carme Puig", avatar: "C", bg: "bg-purple-500", time: "Hace 3 meses", review: "Super atentos y muy amables, puntualidad de 10... nos llevaron de Logroño a Roncesvalles y todo fue genial." },
              { name: "Martina Arnáez García", avatar: "", bg: "bg-amber-200", time: "Hace 7 años", review: "Hemos utilizado sus servicios de taxi y nos atendieron muy bien. Nos enseñaron muchas cosas bonitas..." },
              { name: "Marijo Rodríguez de Aspiunza", avatar: "👓", bg: "bg-blue-400", time: "Hace 2 años", review: "Amabilidad y buen servicio, a un precio adecuado..." },
              { name: "Francisco Javier Garcia Garcia", avatar: "F", bg: "bg-purple-500", time: "Hace 3 semanas", review: "Taxi laguardia genial", isNew: true }
            ].map((review, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card className="border-border/80 bg-gradient-to-br from-card to-card/60">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full ${review.bg} flex items-center justify-center text-white font-semibold text-lg`}>
                        {review.avatar || (review.name === "Martina Arnáez García" ? <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-brown-600 rounded-full"></div> : review.name.charAt(0))}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{review.name}</h4>
                        {review.reviews && <div className="text-sm text-muted-foreground">{review.reviews}</div>}
                      </div>
                      <div className="text-xs text-muted-foreground">{review.time}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-lg">★</span>
                        ))}
                      </div>
                      <span className="font-semibold text-sm">5/5</span>
                      {review.isNew && <span className="bg-black text-white text-xs px-2 py-1 rounded">NUEVA</span>}
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      &ldquo;{review.review}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* SECCIÓN AEROPUERTO (layout alterno con overlay) */}
      <Reveal>
        <section id="aeropuerto" className="mt-24">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="relative md:col-span-5 order-2 md:order-1">
              <div className="sticky top-24 h-[500px] rounded-2xl overflow-hidden border border-border">
                <Image src="/vehicles/vehicle-2.jpg" alt="Traslado aeropuerto" fill className="object-cover" />
              </div>
              <div className="absolute -top-5 -right-5 w-56 rotate-1 rounded-xl border border-border bg-white/80 backdrop-blur shadow-md p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Traslados</div>
                <div className="text-xl font-semibold">Puntualidad garantizada</div>
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-4xl font-bold leading-tight">Aeropuerto sin estrés</h3>
                  <p className="mt-3 text-muted-foreground">
                    Desplazamientos al aeropuerto desde el lugar que nos indiques y traslados de llegada a tu casa, empresa,
                    hotel, bodega u otro destino, sin esperas. También realizamos recogida de viajeros y transporte/recogida
                    de equipajes y mercancías.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><Plane className="text-primary shrink-0 w-6 h-6"/> Al aeropuerto desde cualquier origen</div>
                    <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><Home className="text-primary shrink-0 w-6 h-6"/> Desde aeropuerto a casa/empresa/hotel</div>
                    <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><UserPlus className="text-primary shrink-0 w-6 h-6"/> Recogida de viajeros en terminal</div>
                    <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><Package className="text-primary shrink-0 w-6 h-6"/> Equipajes y mercancías</div>
                  </div>
                </div>
                
                {/* Lista de aeropuertos y estaciones con enlaces */}
                <div className="rounded-2xl border border-border p-6 bg-card">
                  <h4 className="text-xl font-semibold">Aeropuertos y estaciones</h4>
                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <ul className="list-disc pl-5">
                      {airports.slice(0, 5).map((a) => (
                        <li key={a.slug}>
                          <Link className="underline" href={`/aeropuertos/${a.slug}`}>{a.name}</Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="list-disc pl-5">
                      {airports.slice(5).map((a) => (
                        <li key={a.slug}>
                          <Link className="underline" href={`/aeropuertos/${a.slug}`}>{a.name}</Link>
                        </li>
                      ))}
                      {stations.map((s) => (
                        <li key={s.slug}>
                          <Link className="underline" href={`/estaciones/${s.slug}`}>{s.name}</Link>
                        </li>
                      ))}
                      <li>Otros bajo solicitud</li>
                    </ul>
                  </div>
                  <div className="mt-4 text-sm">
                    <Link className="underline" href="/aeropuertos">Ver todos los aeropuertos</Link>
                    <span> · </span>
                    <Link className="underline" href="/estaciones">Ver todas las estaciones</Link>
                  </div>
                </div>

                {/* Botones estandarizados */}
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <a href="tel:684200659">Llamar ahora</a>
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => openModal("aeropuerto")}>
                    Pedir presupuesto
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECCIÓN CAMINO (split con tarjeta de ruta) */}
      <Reveal>
        <section id="camino" className="mt-24">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7">
              <h3 className="text-4xl font-bold leading-tight">Camino de Santiago</h3>
              <p className="mt-3 text-muted-foreground">
                Traslados entre etapas, transfer de mochilas y recogidas en alojamientos. Flexibilidad total para que solo te centres en caminar.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><Bike className="text-primary shrink-0 w-6 h-6"/> Remolques para bicicletas (hasta 7) y equipaje</div>
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><Package className="text-primary shrink-0 w-6 h-6"/> Traslado de mochilas entre etapas</div>
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><ParkingCircle className="text-primary shrink-0 w-6 h-6"/> Parking cubierto y gratuito durante tu ruta</div>
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><MapPin className="text-primary shrink-0 w-6 h-6"/> Recogidas y acercamientos a cualquier etapa</div>
                <div className="rounded-lg border border-border p-3 col-span-2 inline-flex items-center gap-2"><MessageCircle className="text-primary shrink-0 w-6 h-6"/> Asesoramiento local durante el viaje</div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button asChild className="flex-1">
                  <a href="tel:684200659">Llamar ahora</a>
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => openModal("camino")}>
                  Pedir presupuesto
                </Button>
              </div>
            </div>
            <div className="md:col-span-5 relative">
              <div className="sticky top-24 h-[500px] rounded-2xl overflow-hidden border border-border">
                <Image src="/vehicles/vehicle-3.jpg" alt="Camino de Santiago" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-5 -left-5 w-56 -rotate-3 rounded-xl border border-border bg-white/80 backdrop-blur shadow-md p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Etapas</div>
                <div className="text-xl font-semibold">Logística y apoyo</div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECCIÓN MENSAJERÍA (paneles destacados) */}
      <Reveal>
        <section id="mensajeria" className="mt-24">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 relative">
              <div className="sticky top-24 h-[500px] rounded-2xl overflow-hidden border border-border">
                <Image src="/vehicles/vehicle-4.jpg" alt="Mensajería urgente" fill className="object-cover" />
              </div>
              <div className="absolute -top-5 -left-5 w-56 rotate-2 rounded-xl border border-border bg-white/80 backdrop-blur shadow-md p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Express</div>
                <div className="text-xl font-semibold">Ruta directa sin paradas</div>
              </div>
            </div>
            <div className="md:col-span-7">
              <h3 className="text-4xl font-bold leading-tight">Mensajería urgente</h3>
              <p className="mt-3 text-muted-foreground">
                Entrega puerta a puerta en España y Europa. Documentación sensible, prototipos o piezas críticas con custodia directa.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><ArrowRight className="text-primary shrink-0 w-6 h-6"/> Ruta directa sin paradas intermedias</div>
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><FileCheck className="text-primary shrink-0 w-6 h-6"/> Entrega con prueba de entrega (POD)</div>
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><PhoneCall className="text-primary shrink-0 w-6 h-6"/> Seguimiento y contacto directo con el conductor</div>
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><FileText className="text-primary shrink-0 w-6 h-6"/> Documentación sensible y prototipos</div>
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><Receipt className="text-primary shrink-0 w-6 h-6"/> Facturación y servicio para empresas</div>
                <div className="rounded-lg border border-border p-3 inline-flex items-center gap-2"><Globe2 className="text-primary shrink-0 w-6 h-6"/> Cobertura nacional y europea</div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button asChild className="flex-1">
                  <a href="tel:684200659">Llamar ahora</a>
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => openModal("mensajeria")}>
                  Pedir presupuesto
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* OTROS SERVICIOS */}
      <Reveal>
        <section id="otros" className="mt-24">
          <h3 className="text-3xl font-semibold">Otros servicios</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { title: "Rutas por La Rioja", desc: "Ruta de bodegas, Camino de Santiago, Museo del Vino y más. Quién mejor que un local para enseñarte su tierra." },
              { title: "Ruta del Ebro (GR-99)", desc: "Traslados y logística en etapas del Camino Natural del Ebro. Transporte de bicicletas, mascotas y equipaje." },
              { title: "Coche con conductor", desc: "Servicio discrecional sin distintivo para reuniones y eventos. Posibilidad de conductor en otro idioma." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <Card className="border-border/80">
                  <CardContent className="p-5">
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* GALERÍA */}
      <Reveal>
        <section id="galeria" className="mt-24">
          <h3 className="text-3xl font-semibold">Galería de vehículos</h3>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <Reveal key={i} delay={i * 80}>
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border"
                  aria-label={`Ampliar vehículo ${i + 1}`}
                >
                  <Image src={src} alt={`Vehículo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </button>
              </Reveal>
            ))}
          </div>

          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setLightboxIndex(null)}
            >
              <div className="relative w-[92vw] max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
                <Image src={galleryImages[lightboxIndex]} alt={`Vehículo ${lightboxIndex + 1}`} fill className="object-contain" sizes="(max-width: 1024px) 92vw, 1024px" />
                <button
                  onClick={() => setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-black grid place-items-center"
                  aria-label="Imagen anterior"
                >
                  ‹
                </button>
                <button
                  onClick={() => setLightboxIndex((prev) => (prev! + 1) % galleryImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-black grid place-items-center"
                  aria-label="Imagen siguiente"
                >
                  ›
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute right-2 top-2 h-9 w-9 rounded-full bg-white/80 text-black grid place-items-center"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </section>
      </Reveal>

      {/* CONTACTO IN-PAGE */}
      <Reveal>
        <section id="contacto" className="mt-24 mb-16">
          <div className="rounded-2xl border border-border p-8 md:p-10 bg-gradient-to-br from-card to-card/70">
            <div className="md:flex items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold">¿Necesitas un traslado ahora?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Llámanos o envíanos el formulario y te respondemos rápido.</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Button asChild size="lg" className="flex-1">
                  <a href="tel:684200659">Llamar ahora</a>
                </Button>
                <Button variant="outline" size="lg" className="flex-1" onClick={openGenericModal}>
                  Solicitar presupuesto <Mail size={16} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      
      {/* Modal de solicitud de servicio */}
      <ServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceType={modalServiceType}
      />
      {/* Modal genérico */}
      <GenericModal
        isOpen={genericModalOpen}
        onClose={() => setGenericModalOpen(false)}
      />
    </main>
  );
}
