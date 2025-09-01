import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  let payload: any = {};
  try { payload = await req.json(); } catch {}
  const model: string | undefined = payload?.model || payload?.contentType || payload?.data?.model;
  const tag = model?.includes("service") ? "services" : model?.includes("airport") ? "airports" : model?.includes("station") ? "stations" : undefined;
  if (tag) await revalidateTag(tag);
  return NextResponse.json({ ok: true, tag });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret") || req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const tag = url.searchParams.get("tag") ?? undefined;
  if (tag) await revalidateTag(tag);
  return NextResponse.json({ ok: true, tag, method: "GET" });
}
