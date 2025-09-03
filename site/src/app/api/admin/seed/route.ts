import { NextResponse } from "next/server";
import { adminClient, assertAdmin } from "../_utils";
import { services as localServices, airports as localAirports, stations as localStations } from "@/lib/site-data";

export async function POST(req: Request) {
  const unauthorized = assertAdmin(req);
  if (unauthorized) return unauthorized;
  const supabase = adminClient();

  const results: Record<string, unknown> = {};
  try {
    // Seed services
    const servicesPayload = localServices.map((s) => ({
      slug: s.slug,
      name: s.name,
      title: s.title,
      description: s.description,
      intro: s.intro,
      keywords: s.keywords,
      benefits: s.benefits,
    }));
    const { error: svcErr } = await supabase.from("services").upsert(servicesPayload, { onConflict: "slug" });
    if (svcErr) throw svcErr;
    results.services = servicesPayload.length;

    // Seed airports
    const airportsPayload = localAirports.map((a) => ({
      slug: a.slug,
      name: a.name,
      city: a.city,
      code: a.code,
      intro: a.intro,
      description: a.description,
      keywords: a.keywords,
    }));
    const { error: airErr } = await supabase.from("airports").upsert(airportsPayload, { onConflict: "slug" });
    if (airErr) throw airErr;
    results.airports = airportsPayload.length;

    // Seed stations
    const stationsPayload = localStations.map((s) => ({
      slug: s.slug,
      name: s.name,
      city: s.city,
      type: s.type,
      intro: s.intro,
      description: s.description,
      keywords: s.keywords,
    }));
    const { error: stErr } = await supabase.from("stations").upsert(stationsPayload, { onConflict: "slug" });
    if (stErr) throw stErr;
    results.stations = stationsPayload.length;

    return NextResponse.json({ ok: true, results });
  } catch (e) {
    const message = e instanceof Error ? e.message : "failed";
    return NextResponse.json({ ok: false, error: message, results }, { status: 500 });
  }
}


