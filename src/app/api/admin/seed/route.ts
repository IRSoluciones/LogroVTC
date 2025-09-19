import { NextResponse } from "next/server";
import { adminClient, assertAdmin } from "../_utils";
import { services as localServices, airports as localAirports, stations as localStations } from "@/lib/site-data";

export async function POST(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;
  const supabase = adminClient();

  const results: Record<string, unknown> = {};
  try {
    // Seed reviews (de la versión estática)
    const reviewsSeed = [
      { author: "melanie dorado", rating: 5, content: "Tuvimos una experiencia buenísima. Todos los choferes son muy amables y destacar la limpieza de los vehículos. Muy recomendable 10 de 10", featured: true, context: "home" },
      { author: "Ana Car", rating: 5, content: "Me ha tocado ir un par de veces a la estación de madrugada desde Villamediana... Ninguna queja las veces que lo he utilizado", featured: false, context: "home" },
      { author: "Carme Puig", rating: 5, content: "Súper atentos y muy amables, puntualidad de 10... nos llevaron de Logroño a Roncesvalles y todo fue genial.", context: "home" },
      { author: "Martina Arnáez García", rating: 5, content: "Hemos utilizado sus servicios y nos atendieron muy bien. Nos enseñaron muchas cosas bonitas...", context: "home" },
      { author: "Marijo Rodríguez de Aspiunza", rating: 5, content: "Amabilidad y buen servicio, a un precio adecuado...", context: "home" },
      { author: "Francisco Javier Garcia Garcia", rating: 5, content: "Taxi laguardia genial", featured: true, context: "home" },
    ];
    if (reviewsSeed.length) {
      const { error: revErr } = await supabase.from("reviews").insert(reviewsSeed);
      if (revErr && !revErr.message.includes("duplicate")) {
        // seguimos aunque ya existan
        throw revErr;
      }
      results.reviews = reviewsSeed.length;
    }

    // Seed services
    const servicesPayload = localServices.map((s) => ({
      slug: s.slug,
      name: s.name,
      title: s.title,
      description: s.description,
      intro: s.intro,
      keywords: s.keywords,
      benefits: s.benefits,
    }));
    const { error: svcErr } = await supabase.from("services").upsert(servicesPayload, { onConflict: "slug" });
    if (svcErr) throw svcErr;
    results.services = servicesPayload.length;

    // Seed airports
    const airportsPayload = localAirports.map((a) => ({
      slug: a.slug,
      name: a.name,
      city: a.city,
      code: a.code,
      intro: a.intro,
      description: a.description,
      keywords: a.keywords,
    }));
    const { error: airErr } = await supabase.from("airports").upsert(airportsPayload, { onConflict: "slug" });
    if (airErr) throw airErr;
    results.airports = airportsPayload.length;

    // Seed stations
    const stationsPayload = localStations.map((s) => ({
      slug: s.slug,
      name: s.name,
      city: s.city,
      type: s.type,
      intro: s.intro,
      description: s.description,
      keywords: s.keywords,
    }));
    const { error: stErr } = await supabase.from("stations").upsert(stationsPayload, { onConflict: "slug" });
    if (stErr) throw stErr;
    results.stations = stationsPayload.length;

    // Seed FAQs (estáticas)
    const faqsServiceAeropuerto = [
      { q: "¿Puedo solicitar un traslado al aeropuerto a cualquier hora?", a: "Sí, operamos 24/7 con reserva previa. Recomendamos solicitar con antelación para garantizar disponibilidad, especialmente en madrugadas y fines de semana." },
      { q: "¿Me recoge el conductor en la terminal?", a: "Sí, hacemos seguimiento del vuelo y te esperamos en llegadas con cartela si lo necesitas. Incluimos un tiempo de cortesía para la recogida." },
      { q: "¿Aceptáis pago con tarjeta?", a: "Sí, todos nuestros vehículos aceptan pago con tarjeta y ofrecemos factura para empresas." },
      { q: "¿Incluye silla infantil?", a: "Podemos llevar sistemas de retención infantil bajo petición previa y sin coste adicional, sujeto a disponibilidad." },
      { q: "¿Qué ocurre si mi vuelo se retrasa?", a: "Ajustamos la recogida según el nuevo horario y te mantenemos informado sin coste de espera razonable." },
      { q: "¿Cuánto equipaje puedo llevar?", a: "Vehículos con amplio maletero; avísanos de equipaje extra o voluminoso para asignar la flota adecuada." },
      { q: "¿Realizáis traslados interprovinciales?", a: "Sí, realizamos servicios a cualquier aeropuerto y ciudad, nacionales e internacionales." },
      { q: "¿Podéis recoger a terceros?", a: "Sí, coordinamos recogidas para familiares, clientes o invitados y compartimos estado por teléfono." },
    ].map((x) => ({ context: "service", slug: "aeropuerto", question: x.q, answer: x.a }));
    const faqsServiceCamino = [
      { q: "¿Podéis trasladar mochilas entre etapas?", a: "Sí, recogemos y entregamos mochilas en alojamientos a la hora acordada. También transportamos bicicletas y equipaje voluminoso." },
      { q: "¿Hacéis recogidas fuera de ruta?", a: "Sí, nos adaptamos a tu itinerario, acercamientos a inicio/fin de etapa y traslados intermedios si es necesario." },
      { q: "¿Hay servicio para grupos?", a: "Disponemos de vehículos hasta 7 plazas y coordinación de flota para grupos mayores." },
      { q: "¿Puedo cancelar sin coste?", a: "Con 24h de antelación no hay coste de cancelación. En cancelaciones de última hora pueden aplicarse cargos por desplazamiento." },
      { q: "¿Transportáis bicicletas?", a: "Sí, contamos con remolque para hasta 7 bicicletas; reserva con antelación para garantizar disponibilidad." },
      { q: "¿Qué cobertura tenéis?", a: "Toda La Rioja y Rioja Alavesa, además de conexiones con Navarra, País Vasco y Aragón." },
      { q: "¿Podéis sugerir etapas u hoteles?", a: "Ofrecemos asesoramiento local para optimizar distancias, desniveles y logística de alojamiento." },
      { q: "¿Se puede pagar por etapas?", a: "Sí, podemos presupuestar por etapa o servicio completo; se acepta pago con tarjeta." },
    ].map((x) => ({ context: "service", slug: "camino", question: x.q, answer: x.a }));
    const faqsServiceMensajeria = [
      { q: "¿El envío es directo sin paradas?", a: "Sí, es un servicio puerta a puerta dedicado, sin consolidación ni paradas intermedias." },
      { q: "¿Ofrecéis prueba de entrega (POD)?", a: "Sí, enviamos confirmación de entrega y, si lo necesitas, firma y fotos del receptor." },
      { q: "¿Qué tipo de mercancía transportáis?", a: "Documentación sensible, prototipos, piezas urgentes y paquetería no paletizada. Consulta para cargas especiales." },
      { q: "¿Cobertura?", a: "España y Europa. Calculamos ruta directa y tiempo estimado de llegada al confirmar la solicitud." },
      { q: "¿Tiempo de respuesta?", a: "Habitualmente podemos salir en menos de 60 minutos desde la confirmación dentro de La Rioja." },
      { q: "¿Qué tamaño de bultos aceptáis?", a: "Desde sobres a cajas medianas; para palés u objetos muy voluminosos, consúltanos disponibilidad." },
      { q: "¿Seguro de mercancías?", a: "Contamos con cobertura; para envíos de alto valor, podemos ampliar la póliza bajo petición." },
      { q: "¿Recogidas múltiples?", a: "Podemos programar varias paradas manteniendo el recorrido directo; lo presupuestamos a medida." },
    ].map((x) => ({ context: "service", slug: "mensajeria", question: x.q, answer: x.a }));
    const faqsAirport = [
      { q: "¿Puedo solicitar un traslado al aeropuerto a cualquier hora?", a: "Sí, operamos 24/7 con reserva previa. Recomendamos avisar con antelación para garantizar disponibilidad." },
      { q: "¿Me viene a buscar el conductor hasta la terminal?", a: "Sí, realizamos recogida en terminal con cartela si lo deseas y seguimiento de vuelo para ajustar el horario." },
      { q: "¿Cuánto equipaje puedo llevar?", a: "Nuestros vehículos admiten equipaje estándar por pasajero. Indícanos bultos especiales para asignar vehículo adecuado." },
      { q: "¿Aceptáis pago con tarjeta?", a: "Sí, aceptamos tarjetas y ofrecemos factura para empresas." },
      { q: "¿Qué pasa si mi vuelo se retrasa?", a: "Ajustamos la recogida al nuevo horario y mantenemos el contacto en todo momento." },
      { q: "¿Podéis llevar sillas infantiles?", a: "Sí, bajo petición previa y sujeto a disponibilidad, sin coste adicional." },
      { q: "¿Hacéis esperas o paradas?", a: "Podemos incluir una parada breve o un tiempo de espera; se cotiza según el caso." },
      { q: "¿Dais precio cerrado?", a: "Sí, ofrecemos precio cerrado según origen/destino y condiciones del servicio." },
    ].map((x) => ({ context: "airport", slug: "generic", question: x.q, answer: x.a }));
    const faqsStation = [
      { q: "¿Llegáis con tiempo al andén?", a: "Sí, planificamos la recogida para llegar con antelación suficiente según el horario de tu tren o bus." },
      { q: "¿Esperáis si el tren se retrasa?", a: "Sí, ofrecemos un margen de espera razonable. Si el retraso es prolongado, nos coordinamos contigo por teléfono." },
      { q: "¿Podéis llevar bicicletas o equipaje voluminoso?", a: "Sí, bajo petición previa para asignar un vehículo adecuado." },
      { q: "¿Emitís factura?", a: "Sí, emitimos factura para empresas y particulares que lo soliciten." },
      { q: "¿Podéis recogerme dentro de la estación?", a: "Sí, nos coordinamos por teléfono para un punto de encuentro cómodo dentro o junto a la estación." },
      { q: "¿Aceptáis mascotas?", a: "Aceptamos mascotas en transportín o bajo condiciones acordadas previamente." },
      { q: "¿Realizáis traslados entre estaciones?", a: "Sí, conectamos estaciones y aeropuertos, y podemos incluir paradas intermedias." },
      { q: "¿Qué ocurre si pierdo el tren?", a: "Podemos reprogramar el servicio sujeto a disponibilidad; indícanos la nueva hora cuanto antes." },
    ].map((x) => ({ context: "station", slug: "generic", question: x.q, answer: x.a }));

    const allFaqs = [...faqsServiceAeropuerto, ...faqsServiceCamino, ...faqsServiceMensajeria, ...faqsAirport, ...faqsStation];
    if (allFaqs.length) {
      const { error: faqErr } = await supabase.from("faqs").insert(allFaqs);
      if (faqErr) throw faqErr;
      results.faqs = allFaqs.length;
    }

    return NextResponse.json({ ok: true, results });
  } catch (e) {
    const message = e instanceof Error ? e.message : "failed";
    return NextResponse.json({ ok: false, error: message, results }, { status: 500 });
  }
}


