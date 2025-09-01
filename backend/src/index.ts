// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: any) {
    // Seed de FAQs y Reviews basados en el contenido estático original
    try {
      const faqCount = await strapi.entityService.count('api::faq.faq');
      if (!faqCount) {
        // Servicios: aeropuerto, camino, mensajeria
        const serviceFaqs: Record<string, { question: string; answer: string }[]> = {
          aeropuerto: [
            { question: '¿Puedo solicitar un traslado al aeropuerto a cualquier hora?', answer: 'Sí, operamos 24/7 con reserva previa. Recomendamos solicitar con antelación para garantizar disponibilidad, especialmente en madrugadas y fines de semana.' },
            { question: '¿Me recoge el conductor en la terminal?', answer: 'Sí, hacemos seguimiento del vuelo y te esperamos en llegadas con cartela si lo necesitas. Incluimos un tiempo de cortesía para la recogida.' },
            { question: '¿Aceptáis pago con tarjeta?', answer: 'Sí, todos nuestros vehículos aceptan pago con tarjeta y ofrecemos factura para empresas.' },
            { question: '¿Incluye silla infantil?', answer: 'Podemos llevar sistemas de retención infantil bajo petición previa y sin coste adicional, sujeto a disponibilidad.' },
            { question: '¿Qué ocurre si mi vuelo se retrasa?', answer: 'Ajustamos la recogida según el nuevo horario y te mantenemos informado sin coste de espera razonable.' },
            { question: '¿Cuánto equipaje puedo llevar?', answer: 'Vehículos con amplio maletero; avísanos de equipaje extra o voluminoso para asignar la flota adecuada.' },
            { question: '¿Realizáis traslados interprovinciales?', answer: 'Sí, realizamos servicios a cualquier aeropuerto y ciudad, nacionales e internacionales.' },
            { question: '¿Podéis recoger a terceros?', answer: 'Sí, coordinamos recogidas para familiares, clientes o invitados y compartimos estado por teléfono.' },
          ],
          camino: [
            { question: '¿Podéis trasladar mochilas entre etapas?', answer: 'Sí, recogemos y entregamos mochilas en alojamientos entre etapas. También transportamos bicicletas y equipaje voluminoso.' },
            { question: '¿Hacéis recogidas fuera de ruta?', answer: 'Sí, nos adaptamos a tu itinerario, acercamientos a inicio/fin de etapa y traslados intermedios si es necesario.' },
            { question: '¿Hay servicio para grupos?', answer: 'Disponemos de vehículos hasta 7 plazas y coordinación de flota para grupos mayores.' },
            { question: '¿Puedo cancelar sin coste?', answer: 'Con 24h de antelación no hay coste de cancelación. En cancelaciones de última hora pueden aplicarse cargos por desplazamiento.' },
            { question: '¿Transportáis bicicletas?', answer: 'Sí, contamos con remolque para hasta 7 bicicletas; reserva con antelación para garantizar disponibilidad.' },
            { question: '¿Qué cobertura tenéis?', answer: 'Toda La Rioja y Rioja Alavesa, además de conexiones con Navarra, País Vasco y Aragón.' },
            { question: '¿Podéis sugerir etapas u hoteles?', answer: 'Ofrecemos asesoramiento local para optimizar distancias, desniveles y logística de alojamiento.' },
            { question: '¿Se puede pagar por etapas?', answer: 'Sí, podemos presupuestar por etapa o servicio completo; se acepta pago con tarjeta.' },
          ],
          mensajeria: [
            { question: '¿El envío es directo sin paradas?', answer: 'Sí, es un servicio puerta a puerta dedicado, sin consolidación ni paradas intermedias.' },
            { question: '¿Ofrecéis prueba de entrega (POD)?', answer: 'Sí, enviamos confirmación de entrega y, si lo necesitas, firma y fotos del receptor.' },
            { question: '¿Qué tipo de mercancía transportáis?', answer: 'Documentación sensible, prototipos, piezas urgentes y paquetería no paletizada. Consulta para cargas especiales.' },
            { question: '¿Cobertura?', answer: 'España y Europa. Calculamos ruta directa y tiempo estimado de llegada al confirmar la solicitud.' },
            { question: '¿Tiempo de respuesta?', answer: 'Habitualmente podemos salir en menos de 60 minutos desde la confirmación dentro de La Rioja.' },
            { question: '¿Qué tamaño de bultos aceptáis?', answer: 'Desde sobres a cajas medianas; para palés u objetos muy voluminosos, consúltanos disponibilidad.' },
            { question: '¿Seguro de mercancías?', answer: 'Contamos con cobertura; para envíos de alto valor, podemos ampliar la póliza bajo petición.' },
            { question: '¿Recogidas múltiples?', answer: 'Podemos programar varias paradas manteniendo el recorrido directo; lo presupuestamos a medida.' },
          ],
        };

        for (const [slug, list] of Object.entries(serviceFaqs)) {
          for (const it of list) {
            await strapi.entityService.create('api::faq.faq', { data: { question: it.question, answer: it.answer, context: 'service', slug } });
          }
        }

        // Aeropuertos: misma FAQ para todos los slugs conocidos
        const airportFaqTemplate = [
          { question: '¿Puedo solicitar un traslado al aeropuerto a cualquier hora?', answer: 'Sí, operamos 24/7 con reserva previa. Recomendamos avisar con antelación para garantizar disponibilidad.' },
          { question: '¿Me viene a buscar el conductor hasta la terminal?', answer: 'Sí, realizamos recogida en terminal con cartela si lo deseas y seguimiento de vuelo para ajustar el horario.' },
          { question: '¿Cuánto equipaje puedo llevar?', answer: 'Nuestros vehículos admiten equipaje estándar por pasajero. Indícanos bultos especiales para asignar vehículo adecuado.' },
          { question: '¿Aceptáis pago con tarjeta?', answer: 'Sí, aceptamos tarjetas y ofrecemos factura para empresas.' },
          { question: '¿Qué pasa si mi vuelo se retrasa?', answer: 'Ajustamos la recogida al nuevo horario y mantenemos el contacto en todo momento.' },
          { question: '¿Podéis llevar sillas infantiles?', answer: 'Sí, bajo petición previa y sujeto a disponibilidad, sin coste adicional.' },
          { question: '¿Hacéis esperas o paradas?', answer: 'Podemos incluir una parada breve o un tiempo de espera; se cotiza según el caso.' },
          { question: '¿Dais precio cerrado?', answer: 'Sí, ofrecemos precio cerrado según origen/destino y condiciones del servicio.' },
        ];
        const airportSlugs = ['logrono-agoncillo','bilbao','pamplona','madrid-barajas','barcelona-el-prat','zaragoza','santander','vitoria','biarritz'];
        for (const slug of airportSlugs) {
          for (const it of airportFaqTemplate) {
            await strapi.entityService.create('api::faq.faq', { data: { question: it.question, answer: it.answer, context: 'airport', slug } });
          }
        }

        // Estaciones: misma FAQ para todos los slugs conocidos
        const stationFaqTemplate = [
          { question: '¿Llegáis con tiempo al andén?', answer: 'Sí, planificamos la recogida para llegar con antelación suficiente según el horario de tu tren o bus.' },
          { question: '¿Esperáis si el tren se retrasa?', answer: 'Sí, ofrecemos un margen de espera razonable. Si el retraso es prolongado, nos coordinamos contigo por teléfono.' },
          { question: '¿Podéis llevar bicicletas o equipaje voluminoso?', answer: 'Sí, bajo petición previa para asignar un vehículo adecuado.' },
          { question: '¿Emitís factura?', answer: 'Sí, emitimos factura para empresas y particulares que lo soliciten.' },
          { question: '¿Podéis recogerme dentro de la estación?', answer: 'Sí, nos coordinamos por teléfono para un punto de encuentro cómodo dentro o junto a la estación.' },
          { question: '¿Aceptáis mascotas?', answer: 'Aceptamos mascotas en transportín o bajo condiciones acordadas previamente.' },
          { question: '¿Realizáis traslados entre estaciones?', answer: 'Sí, conectamos estaciones y aeropuertos, y podemos incluir paradas intermedias.' },
          { question: '¿Qué ocurre si pierdo el tren?', answer: 'Podemos reprogramar el servicio sujeto a disponibilidad; indícanos la nueva hora cuanto antes.' },
        ];
        const stationSlugs = ['zaragoza-delicias','hendaya'];
        for (const slug of stationSlugs) {
          for (const it of stationFaqTemplate) {
            await strapi.entityService.create('api::faq.faq', { data: { question: it.question, answer: it.answer, context: 'station', slug } });
          }
        }
      }

      const reviewCount = await strapi.entityService.count('api::review.review');
      if (!reviewCount) {
        const homeReviews = [
          { author: 'melanie dorado', rating: 5, content: 'Tuvimos una experiencia buenísima. Todos los choferes son muy amables y destacar la limpieza de los vehículos. Muy recomendable 10 de 10', featured: true },
          { author: 'Ana Car', rating: 5, content: 'Me ha tocado ir un par de veces a la estación de madrugada desde Villamediana... Ninguna queja las veces que lo he utilizado' },
          { author: 'Carme Puig', rating: 5, content: 'Súper atentos y muy amables, puntualidad de 10... nos llevaron de Logroño a Roncesvalles y todo fue genial.' },
          { author: 'Martina Arnáez García', rating: 5, content: 'Hemos utilizado sus servicios y nos atendieron muy bien. Nos enseñaron muchas cosas bonitas...' },
          { author: 'Marijo Rodríguez de Aspiunza', rating: 5, content: 'Amabilidad y buen servicio, a un precio adecuado...' },
          { author: 'Francisco Javier Garcia Garcia', rating: 5, content: 'Taxi Laguardia genial', featured: true },
        ];
        for (const r of homeReviews) {
          await strapi.entityService.create('api::review.review', { data: { ...r, context: 'home' } });
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Bootstrap seed warning:', err);
    }
  },
};
