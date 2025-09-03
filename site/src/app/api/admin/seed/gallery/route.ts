import { NextResponse } from "next/server";
import { adminClient, assertAdmin } from "../../_utils";

export async function POST(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const supabase = adminClient();
    // Crear bucket si no existe
    await supabase.storage.createBucket("gallery", { public: true }).catch(() => {});

    const origin = new URL(req.url).origin;
    // Lista de imágenes conocidas en /public/vehicles
    const fileNames = Array.from({ length: 16 }, (_, i) => `vehicle-${i + 1}.jpg`);

    const results: { file: string; ok: boolean; error?: string }[] = [];

    for (let i = 0; i < fileNames.length; i++) {
      const name = fileNames[i];
      const remoteUrl = `${origin}/vehicles/${name}`;
      try {
        const res = await fetch(remoteUrl);
        if (!res.ok) throw new Error(`fetch ${res.status}`);
        const arrayBuffer = await res.arrayBuffer();
        const path = `seed/${Date.now()}-${Math.random().toString(36).slice(2)}-${name}`;
        const { error: upErr } = await supabase.storage.from("gallery").upload(path, arrayBuffer, {
          contentType: "image/jpeg",
          upsert: false,
        });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("gallery").getPublicUrl(path);
        const url = pub?.publicUrl || "";
        await supabase.from("gallery").insert({ url, alt: name.replace(/[-_]/g, " ").replace(/\.jpg$/i, ""), position: i + 1, active: true });
        results.push({ file: name, ok: true });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "failed";
        results.push({ file: name, ok: false, error: msg });
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch (e) {
    const message = e instanceof Error ? e.message : "failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}


