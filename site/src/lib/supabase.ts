import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Utilidad centralizada para obtener clientes de Supabase
// Usa ANON para lecturas públicas y SERVICE_ROLE para operaciones de administración/CRUD en servidor

declare const process: { env?: Record<string, string | undefined> };

const SUPABASE_URL = process?.env?.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process?.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_ROLE_KEY = process?.env?.SUPABASE_SERVICE_ROLE_KEY || "";

export function supabasePublic(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Para uso exclusivo en servidor (APIs privadas)
export function supabaseAdmin(): SupabaseClient {
  const key = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  if (!SUPABASE_URL || !key) {
    throw new Error("Faltan variables de entorno de Supabase para servidor");
  }
  return createClient(SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const isSupabaseEnabled = Boolean(SUPABASE_URL && (SUPABASE_ANON_KEY || SUPABASE_SERVICE_ROLE_KEY));


