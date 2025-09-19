import { NextResponse } from "next/server";
import { getReviews, type Review } from "@/lib/cms";
import { isSupabaseEnabled } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const context = (url.searchParams.get("context") || "home") as "home" | "service" | "airport" | "station";
    const slug = url.searchParams.get("slug") || undefined;
    const debug = url.searchParams.get("debug");
    if (!isSupabaseEnabled) {
      // Sin Supabase configurado devolvemos vacío para que el frontend use fallback visual
      const payload: { ok: true; reviews: Review[]; debug: { isSupabaseEnabled: boolean } } = { ok: true, reviews: [], debug: { isSupabaseEnabled } };
      return NextResponse.json(debug === "1" ? payload : { ok: true, reviews: [] });
    }

    const reviews = await getReviews(context, slug);
    if (debug === "1") {
      return NextResponse.json({
        ok: true,
        reviews,
        debug: { isSupabaseEnabled },
      });
    }
    return NextResponse.json({ ok: true, reviews });
  } catch (err) {
    const url = new URL(req.url);
    const debug = url.searchParams.get("debug");
    const message = err instanceof Error ? err.message : "unknown";
    const body = debug === "1" ? { ok: false as const, error: message } : { ok: false as const, error: "failed" };
    return NextResponse.json(body, { status: 500 });
  }
}


