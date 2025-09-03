import { supabasePublic, supabaseAdmin } from "./supabase";

export type Review = {
  id?: number;
  author: string;
  rating: number;
  content?: string;
  featured?: boolean;
  context?: "home" | "service" | "airport" | "station";
  slug?: string | null;
  created_at?: string;
};

export type Faq = {
  id?: number;
  context: "service" | "airport" | "station";
  slug: string;
  question: string;
  answer: string;
  created_at?: string;
};

export type GalleryImage = {
  id?: number;
  url: string;
  alt?: string | null;
  position?: number | null;
  active?: boolean | null;
  created_at?: string;
};

export type ServiceContent = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  keywords?: string[] | null;
  benefits?: { title: string; desc: string }[] | null;
};

export type AirportContent = {
  slug: string;
  name: string;
  city?: string | null;
  code?: string | null;
  intro: string;
  description: string;
  keywords?: string[] | null;
};

export type StationContent = {
  slug: string;
  name: string;
  city?: string | null;
  type?: "tren" | "bus" | null;
  intro: string;
  description: string;
  keywords?: string[] | null;
};

export async function getReviews(context?: Review["context"], slug?: string) {
  const client = supabasePublic();
  let query = client.from("reviews").select("*").order("id", { ascending: true });
  if (context) query = query.eq("context", context);
  // Si se pasa slug, incluimos registros globales (slug NULL) además de los específicos
  if (slug) {
    // Supabase .or usa una cadena con filtros separados por comas
    query = query.or(`slug.is.null,slug.eq.${slug}`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as Review[];
}

export async function getFaqs(context: Faq["context"], slug: string) {
  const client = supabasePublic();
  const { data, error } = await client
    .from("faqs")
    .select("*")
    .eq("context", context)
    .eq("slug", slug)
    .order("id", { ascending: true });
  if (error) throw error;
  return (data || []) as Faq[];
}

export async function getGallery(limit?: number) {
  const client = supabasePublic();
  let query = client.from("gallery").select("*").eq("active", true).order("position", { ascending: true }).order("id", { ascending: true });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as GalleryImage[];
}

export async function getServiceBySlugFromDb(slug: string) {
  const client = supabasePublic();
  const { data, error } = await client.from("services").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data || null) as ServiceContent | null;
}

export async function getAirportBySlugFromDb(slug: string) {
  const client = supabasePublic();
  const { data, error } = await client.from("airports").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data || null) as AirportContent | null;
}

export async function getStationBySlugFromDb(slug: string) {
  const client = supabasePublic();
  const { data, error } = await client.from("stations").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data || null) as StationContent | null;
}

export async function listServices() {
  const client = supabasePublic();
  const { data, error } = await client.from("services").select("slug, name, title, description, intro, keywords, benefits").order("slug");
  if (error) throw error;
  return (data || []) as ServiceContent[];
}

export async function listAirports() {
  const client = supabasePublic();
  const { data, error } = await client.from("airports").select("slug, name, city, code, intro, description, keywords").order("slug");
  if (error) throw error;
  return (data || []) as AirportContent[];
}

export async function listStations() {
  const client = supabasePublic();
  const { data, error } = await client.from("stations").select("slug, name, city, type, intro, description, keywords").order("slug");
  if (error) throw error;
  return (data || []) as StationContent[];
}

// Admin helpers (server-only). No exponer directamente en el cliente.
export const admin = {
  async upsertReview(payload: Review) {
    const client = supabaseAdmin();
    const { data, error } = await client.from("reviews").upsert(payload).select("*").single();
    if (error) throw error;
    return data as Review;
  },
  async deleteReview(id: number) {
    const client = supabaseAdmin();
    const { error } = await client.from("reviews").delete().eq("id", id);
    if (error) throw error;
    return { ok: true } as const;
  },
  async upsertFaq(payload: Faq) {
    const client = supabaseAdmin();
    const { data, error } = await client.from("faqs").upsert(payload).select("*").single();
    if (error) throw error;
    return data as Faq;
  },
  async deleteFaq(id: number) {
    const client = supabaseAdmin();
    const { error } = await client.from("faqs").delete().eq("id", id);
    if (error) throw error;
    return { ok: true } as const;
  },
  async upsertGalleryImage(payload: GalleryImage) {
    const client = supabaseAdmin();
    const { data, error } = await client.from("gallery").upsert(payload).select("*").single();
    if (error) throw error;
    return data as GalleryImage;
  },
  async deleteGalleryImage(id: number) {
    const client = supabaseAdmin();
    const { error } = await client.from("gallery").delete().eq("id", id);
    if (error) throw error;
    return { ok: true } as const;
  },
  async upsertService(payload: ServiceContent) {
    const client = supabaseAdmin();
    const { data, error } = await client.from("services").upsert(payload).select("*").single();
    if (error) throw error;
    return data as ServiceContent;
  },
  async upsertAirport(payload: AirportContent) {
    const client = supabaseAdmin();
    const { data, error } = await client.from("airports").upsert(payload).select("*").single();
    if (error) throw error;
    return data as AirportContent;
  },
  async upsertStation(payload: StationContent) {
    const client = supabaseAdmin();
    const { data, error } = await client.from("stations").upsert(payload).select("*").single();
    if (error) throw error;
    return data as StationContent;
  },
};


