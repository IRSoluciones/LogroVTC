import { NextResponse } from "next/server";
import { adminClient, assertAdmin } from "../../_utils";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const formData = await req.formData();
    const files = formData.getAll("file");
    if (!files || files.length === 0) {
      return NextResponse.json({ ok: false, error: "missing_file" }, { status: 400 });
    }
    const alt = (formData.get("alt") as string) || "";
    const positionStr = (formData.get("position") as string) || "";
    const activeStr = (formData.get("active") as string) || "true";
    const position = Number.isFinite(Number(positionStr)) ? Number(positionStr) : undefined;
    const active = activeStr !== "false";

    const supabase = adminClient();
    const results: { id?: number; url?: string; path?: string; error?: string }[] = [];

    for (const f of files) {
      if (!(f instanceof File)) continue;
      const arrayBuffer = await f.arrayBuffer();
      const safeName = f.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
      const filePath = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
      const { error: upErr } = await supabase.storage.from("gallery").upload(filePath, arrayBuffer, {
        contentType: f.type || undefined,
        upsert: true,
      });
      if (upErr) {
        results.push({ error: upErr.message });
        continue;
      }
      const { data: pub } = supabase.storage.from("gallery").getPublicUrl(filePath);
      const url = pub?.publicUrl || "";
      const { data: row, error: dbErr } = await supabase
        .from("gallery")
        .insert({ url, alt: alt || null, position: position ?? null, active })
        .select("id")
        .maybeSingle();
      if (dbErr) {
        results.push({ url, path: filePath, error: dbErr.message });
      } else {
        results.push({ id: row?.id, url, path: filePath });
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch (e) {
    const message = e instanceof Error ? e.message : "failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}


