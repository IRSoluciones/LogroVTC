import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export function getAdminTokenFromRequest(req: Request) {
  const auth = req.headers.get("authorization") || req.headers.get("Authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) return auth.slice(7);
  const token = req.headers.get("x-admin-token");
  return token || null;
}

export function assertAdmin(req: Request) {
  const expected = process.env.ADMIN_TOKEN || "";
  const got = getAdminTokenFromRequest(req);
  if (!expected || !got || got !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  return null;
}

export const adminClient = () => supabaseAdmin();


