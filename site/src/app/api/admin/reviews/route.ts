import { NextResponse } from "next/server";
import { adminClient, assertAdmin } from "../_utils";

export async function GET(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;
  const url = new URL(req.url);
  const context = url.searchParams.get("context") || undefined;
  const slug = url.searchParams.get("slug") || undefined;
  const supabase = adminClient();
  let query = supabase.from("reviews").select("*").order("id", { ascending: true });
  if (context) query = query.eq("context", context);
  if (slug) query = query.eq("slug", slug);
  const { data, error } = await query;
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, reviews: data || [] });
}

export async function POST(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;
  const supabase = adminClient();
  const body = await req.json().catch(() => ({}));
  const { data, error } = await supabase.from("reviews").upsert(body).select("*").maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, review: data });
}

export async function DELETE(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  if (!id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
  const supabase = adminClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


