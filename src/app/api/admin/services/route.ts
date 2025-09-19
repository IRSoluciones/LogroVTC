import { NextResponse } from "next/server";
import { adminClient, assertAdmin } from "../_utils";

export async function GET(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;
  const supabase = adminClient();
  const { data, error } = await supabase.from("services").select("*").order("slug");
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, services: data || [] });
}

export async function POST(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;
  const body = await req.json().catch(() => ({}));
  const supabase = adminClient();
  const { data, error } = await supabase.from("services").upsert(body).select("*").maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, service: data });
}

export async function DELETE(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  if (!slug) return NextResponse.json({ ok: false, error: "missing_slug" }, { status: 400 });
  const supabase = adminClient();
  const { error } = await supabase.from("services").delete().eq("slug", slug);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


