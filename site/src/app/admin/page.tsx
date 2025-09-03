"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Review = { id?: number; author: string; rating: number; content?: string; featured?: boolean; context?: string; slug?: string };
type Faq = { id?: number; context: string; slug: string; question: string; answer: string };

export default function AdminPage() {
  const [token, setToken] = useState<string>("");
  const [tokenInput, setTokenInput] = useState<string>("");
  const headers = useMemo<Record<string, string>>(() => {
    const h: Record<string, string> = {};
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
  }, [token]);

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  function saveToken() {
    setToken(tokenInput.trim());
    localStorage.setItem("admin_token", tokenInput.trim());
  }

  if (!token) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Administración</h1>
        <p className="mt-2 text-sm text-muted-foreground">Introduce tu token de administrador para continuar.</p>
        <div className="mt-4 flex gap-2">
          <Input placeholder="Token" value={tokenInput} onChange={(e) => setTokenInput(e.target.value)} />
          <Button onClick={saveToken}>Acceder</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 grid gap-8">
      <section>
        <h2 className="text-xl font-semibold">Reviews</h2>
        <ReviewsAdmin headers={headers} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">FAQs</h2>
        <FaqsAdmin headers={headers} />
      </section>
    </main>
  );
}

function ReviewsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<Review[]>([]);
  const [form, setForm] = useState<Review>({ author: "", rating: 5, content: "", context: "home", slug: "" });
  async function load() {
    const res = await fetch("/api/admin/reviews", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.reviews);
  }
  useEffect(() => { load(); }, []);

  async function submit() {
    await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(form) });
    setForm({ author: "", rating: 5, content: "", context: "home", slug: "" });
    load();
  }
  async function remove(id?: number) {
    if (!id) return;
    await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE", headers });
    load();
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="Autor" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <Input placeholder="Rating (1-5)" type="number" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
          <Input placeholder="Contexto (home/service/airport/station)" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
          <Input placeholder="Slug (opcional)" value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Textarea placeholder="Contenido" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <Button onClick={submit}>Guardar</Button>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{r.author} · {r.rating}/5 · {r.context}{r.slug ? ` · ${r.slug}` : ""}</div>
                <Button variant="outline" onClick={() => remove(r.id)}>Eliminar</Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FaqsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<Faq[]>([]);
  const [form, setForm] = useState<Faq>({ context: "service", slug: "", question: "", answer: "" });
  async function load() {
    const res = await fetch("/api/admin/faqs", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.faqs);
  }
  useEffect(() => { load(); }, []);

  async function submit() {
    await fetch("/api/admin/faqs", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(form) });
    setForm({ context: "service", slug: "", question: "", answer: "" });
    load();
  }
  async function remove(id?: number) {
    if (!id) return;
    await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE", headers });
    load();
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="Contexto (service/airport/station)" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
          <Input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="Pregunta" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          <Textarea placeholder="Respuesta" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
          <Button onClick={submit}>Guardar</Button>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((f) => (
          <Card key={f.id}>
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">{f.context} · {f.slug}</div>
                <div className="text-sm">{f.question}</div>
              </div>
              <Button variant="outline" onClick={() => remove(f.id)}>Eliminar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}




