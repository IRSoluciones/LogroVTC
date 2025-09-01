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
    // Seed básico de FAQs y Reviews si no existen
    try {
      const faqCount = await strapi.entityService.count('api::faq.faq');
      if (!faqCount) {
        const seedFaqs = [
          { question: '¿Puedo solicitar un traslado al aeropuerto a cualquier hora?', answer: 'Sí, operamos 24/7 con reserva previa.', context: 'service', slug: 'aeropuerto' },
          { question: '¿Me recoge el conductor en la terminal?', answer: 'Sí, seguimiento de vuelo y recogida en llegadas.', context: 'service', slug: 'aeropuerto' },
          { question: '¿Podéis trasladar mochilas entre etapas?', answer: 'Sí, recogida y entrega en alojamientos.', context: 'service', slug: 'camino' },
        ];
        for (const data of seedFaqs) {
          await strapi.entityService.create('api::faq.faq', { data });
        }
      }

      const reviewCount = await strapi.entityService.count('api::review.review');
      if (!reviewCount) {
        const seedReviews = [
          { author: 'Cliente', rating: 5, content: 'Servicio excelente', featured: true, context: 'home' },
          { author: 'Ana', rating: 5, content: 'Muy puntuales y amables', featured: false, context: 'home' },
        ];
        for (const data of seedReviews) {
          await strapi.entityService.create('api::review.review', { data });
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Bootstrap seed warning:', err);
    }
  },
};
