import { NextResponse } from "next/server";
import { fetchReviews, fetchReviewsBy } from "@/lib/strapi";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const context = (url.searchParams.get("context") || "home") as "home" | "service" | "airport" | "station";
    const slug = url.searchParams.get("slug") || undefined;

    let data = await fetchReviewsBy(context, slug);
    let reviews = data.data.map((it) => ({ id: it.id, ...it.attributes }));
    if (reviews.length === 0) {
      data = await fetchReviews();
      reviews = data.data.map((it) => ({ id: it.id, ...it.attributes }));
    }
    return NextResponse.json({ ok: true, reviews });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}


