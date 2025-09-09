import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const data = Object.fromEntries(form.entries());

    // Placeholder: aquí se conectaría con email/CRM/Telegram/etc.
    console.log("Contacto recibido:", data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}


