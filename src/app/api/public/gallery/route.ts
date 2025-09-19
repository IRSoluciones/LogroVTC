import { NextResponse } from "next/server";
import { getGallery } from "@/lib/cms";
import { isSupabaseEnabled } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit");
    if (!isSupabaseEnabled) {
      return NextResponse.json({ ok: true, images: [] });
    }
    const images = await getGallery(limit ? Number(limit) : undefined);
    return NextResponse.json({ ok: true, images });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "failed" }, { status: 500 });
  }
}


