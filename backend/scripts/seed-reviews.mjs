/*
  One-off seeder for Reviews in Strapi Cloud.
  Usage:
  STRAPI_URL="https://<your>.strapiapp.com" STRAPI_API_TOKEN="<token>" node backend/scripts/seed-reviews.mjs
*/

const STRAPI_URL = (process.env.STRAPI_URL || "").replace(/\/$/, "");
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

if (!STRAPI_URL || !STRAPI_API_TOKEN) {
  console.error("Missing STRAPI_URL or STRAPI_API_TOKEN env vars.");
  process.exit(1);
}

async function strapiFetch(path, init) {
  const url = `${STRAPI_URL}/api/${path.replace(/^\//, "")}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      ...(init && init.headers),
    },
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Strapi ${res.status}: ${t}`);
  }
  return res.json();
}

const SEED = [
  { author: "melanie dorado", rating: 5, content: "Tuvimos una experiencia buenísima. Todos los choferes son muy amables y destacar la limpieza de los vehículos. Muy recomendable 10 de 10", featured: true, context: "home" },
  { author: "Ana Car", rating: 5, content: "Me ha tocado ir un par de veces a la estación de madrugada desde Villamediana... Ninguna queja las veces que lo he utilizado", featured: false, context: "home" },
  { author: "Carme Puig", rating: 5, content: "Súper atentos y muy amables, puntualidad de 10... nos llevaron de Logroño a Roncesvalles y todo fue genial.", context: "home" },
  { author: "Martina Arnáez García", rating: 5, content: "Hemos utilizado sus servicios y nos atendieron muy bien. Nos enseñaron muchas cosas bonitas...", context: "home" },
  { author: "Marijo Rodríguez de Aspiunza", rating: 5, content: "Amabilidad y buen servicio, a un precio adecuado...", context: "home" },
  { author: "Francisco Javier Garcia Garcia", rating: 5, content: "Taxi laguardia genial", featured: true, context: "home" },
];

async function existsReview(author, content) {
  const params = new URLSearchParams();
  params.set("filters[author][$eq]", author);
  params.set("filters[content][$eq]", content);
  params.set("pagination[pageSize]", "1");
  const json = await strapiFetch(`reviews?${params.toString()}`);
  return Array.isArray(json.data) && json.data.length > 0;
}

async function createReview(data) {
  return strapiFetch("reviews", {
    method: "POST",
    body: JSON.stringify({ data }),
  });
}

(async () => {
  let created = 0;
  for (const r of SEED) {
    const has = await existsReview(r.author, r.content);
    if (has) {
      console.log(`skip: ${r.author} (exists)`);
      continue;
    }
    await createReview(r);
    created++;
    console.log(`created: ${r.author}`);
  }
  console.log(`done. created=${created}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});


