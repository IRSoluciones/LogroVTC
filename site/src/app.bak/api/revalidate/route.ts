import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

type RevalidatePayload = {
  model?: string;
  contentType?: string;
  data?: { model?: string } | null;
};

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  const payload = (body ?? null) as RevalidatePayload | null;
  const model: string | undefined = payload?.model ?? payload?.contentType ?? payload?.data?.model ?? undefined;

  const tag = model?.includes("service")
    ? "services"
    : model?.includes("airport")
    ? "airports"
    : model?.includes("station")
    ? "stations"
    : undefined;

  if (tag) {
    await revalidateTag(tag);
  }

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
