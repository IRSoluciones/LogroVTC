// Cliente Strapi con soporte de tags y fallback controlado por variables de entorno

// Evitar dependencia directa de tipos Node en entornos donde no estén presentes
declare const process: { env?: Record<string, string | undefined> };

const STRAPI_URL = process?.env?.STRAPI_URL;
const STRAPI_API_TOKEN = process?.env?.STRAPI_API_TOKEN;

export const isStrapiEnabled = Boolean(STRAPI_URL && STRAPI_API_TOKEN);

type QueryParams = Record<string, string | number | boolean | undefined>;

function buildUrl(path: string, params?: QueryParams) {
  const base = (STRAPI_URL || "").replace(/\/$/, "");
  const url = new URL(`${base}/api/${path.replace(/^\//, "")}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

interface NextFetchOptions extends RequestInit {
  next?: { tags?: string[] };
}

export async function strapiFetch<T>(path: string, options?: { tags?: string[]; params?: QueryParams }) {
  if (!isStrapiEnabled) {
    throw new Error("Strapi no está habilitado: define STRAPI_URL y STRAPI_API_TOKEN");
  }
  const url = buildUrl(path, options?.params);
  const init: NextFetchOptions = {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  };
  if (options?.tags && options.tags.length > 0) {
    init.next = { tags: options.tags };
  }
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Error Strapi ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

// Tipos mínimos para respuestas de Strapi v4
export type StrapiItem<A> = { id: number; attributes: A };
export type StrapiListResponse<A> = { data: StrapiItem<A>[]; meta: unknown };
export type StrapiSingleResponse<A> = { data: StrapiItem<A> | null; meta: unknown };

// Helpers de dominio (ajústalos a tus content-types reales)
export type ServiceDto = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  keywords?: string[];
  benefits?: { title: string; desc: string }[];
};

export async function fetchServices() {
  return strapiFetch<StrapiListResponse<ServiceDto>>("services", {
    tags: ["services"],
    params: { populate: "deep" },
  });
}

export async function fetchServiceBySlug(slug: string) {
  const json = await strapiFetch<StrapiListResponse<ServiceDto>>("services", {
    tags: ["services"],
    params: { "filters[slug][$eq]": slug, populate: "deep" },
  });
  return json.data[0] ?? null;
}

export type AirportDto = {
  slug: string;
  name: string;
  city?: string;
  code?: string;
  intro: string;
  description: string;
  keywords?: string[];
};

export async function fetchAirports() {
  return strapiFetch<StrapiListResponse<AirportDto>>("airports", {
    tags: ["airports"],
    params: { populate: "*" },
  });
}

export async function fetchAirportBySlug(slug: string) {
  const json = await strapiFetch<StrapiListResponse<AirportDto>>("airports", {
    tags: ["airports"],
    params: { "filters[slug][$eq]": slug, populate: "*" },
  });
  return json.data[0] ?? null;
}

export type StationDto = {
  slug: string;
  name: string;
  city?: string;
  type?: string;
  intro: string;
  description: string;
  keywords?: string[];
};

export async function fetchStations() {
  return strapiFetch<StrapiListResponse<StationDto>>("stations", {
    tags: ["stations"],
    params: { populate: "*" },
  });
}

export async function fetchStationBySlug(slug: string) {
  const json = await strapiFetch<StrapiListResponse<StationDto>>("stations", {
    tags: ["stations"],
    params: { "filters[slug][$eq]": slug, populate: "*" },
  });
  return json.data[0] ?? null;
}
