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
        <h2 className="text-xl font-semibold">Servicios</h2>
        <ServicesAdmin headers={headers} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Aeropuertos</h2>
        <AirportsAdmin headers={headers} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Estaciones</h2>
        <StationsAdmin headers={headers} />
      </section>

      <section>
        <h2 className="text-xl font-semibold">Galería</h2>
        <GalleryAdmin headers={headers} />
      </section>

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

function ServicesAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ slug: "", name: "", title: "", description: "", intro: "", keywords: "" });
  async function load() {
    const res = await fetch("/api/admin/services", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.services);
  }
  useEffect(() => { load(); }, []);
  async function submit() {
    const payload = { ...form, keywords: form.keywords ? form.keywords.split(",").map((s: string) => s.trim()).filter(Boolean) : [] };
    await fetch("/api/admin/services", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(payload) });
    setForm({ slug: "", name: "", title: "", description: "", intro: "", keywords: "" });
    load();
  }
  async function remove(slug: string) {
    await fetch(`/api/admin/services?slug=${encodeURIComponent(slug)}`, { method: "DELETE", headers });
    load();
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Textarea placeholder="intro" value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
          <Input placeholder="keywords (coma)" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
          <Button onClick={submit}>Guardar</Button>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.slug}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="font-medium">{it.slug} · {it.name}</div>
              <Button variant="outline" onClick={() => remove(it.slug)}>Eliminar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AirportsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ slug: "", name: "", city: "", code: "", intro: "", description: "", keywords: "" });
  async function load() {
    const res = await fetch("/api/admin/aeropuertos", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.airports);
  }
  useEffect(() => { load(); }, []);
  async function submit() {
    const payload = { ...form, keywords: form.keywords ? form.keywords.split(",").map((s: string) => s.trim()).filter(Boolean) : [] };
    await fetch("/api/admin/aeropuertos", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(payload) });
    setForm({ slug: "", name: "", city: "", code: "", intro: "", description: "", keywords: "" });
    load();
  }
  async function remove(slug: string) {
    await fetch(`/api/admin/aeropuertos?slug=${encodeURIComponent(slug)}`, { method: "DELETE", headers });
    load();
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input placeholder="code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          <Textarea placeholder="intro" value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
          <Textarea placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="keywords (coma)" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
          <Button onClick={submit}>Guardar</Button>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.slug}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="font-medium">{it.slug} · {it.name}</div>
              <Button variant="outline" onClick={() => remove(it.slug)}>Eliminar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StationsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ slug: "", name: "", city: "", type: "tren", intro: "", description: "", keywords: "" });
  async function load() {
    const res = await fetch("/api/admin/estaciones", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.stations);
  }
  useEffect(() => { load(); }, []);
  async function submit() {
    const payload = { ...form, keywords: form.keywords ? form.keywords.split(",").map((s: string) => s.trim()).filter(Boolean) : [] };
    await fetch("/api/admin/estaciones", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(payload) });
    setForm({ slug: "", name: "", city: "", type: "tren", intro: "", description: "", keywords: "" });
    load();
  }
  async function remove(slug: string) {
    await fetch(`/api/admin/estaciones?slug=${encodeURIComponent(slug)}`, { method: "DELETE", headers });
    load();
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input placeholder="type (tren/bus)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          <Textarea placeholder="intro" value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
          <Textarea placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="keywords (coma)" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
          <Button onClick={submit}>Guardar</Button>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.slug}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="font-medium">{it.slug} · {it.name}</div>
              <Button variant="outline" onClick={() => remove(it.slug)}>Eliminar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GalleryAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ url: "", alt: "", position: 0, active: true });
  async function load() {
    const res = await fetch("/api/admin/gallery", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.images);
  }
  useEffect(() => { load(); }, []);
  async function submit() {
    await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(form) });
    setForm({ url: "", alt: "", position: 0, active: true });
    load();
  }
  async function remove(id?: number) {
    if (!id) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE", headers });
    load();
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <Input placeholder="alt" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
          <Input placeholder="position" type="number" value={form.position} onChange={(e) => setForm({ ...form, position: Number(e.target.value) })} />
          <Input placeholder="active (true/false)" value={String(form.active)} onChange={(e) => setForm({ ...form, active: e.target.value === "true" })} />
          <Button onClick={submit}>Guardar</Button>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="font-medium truncate max-w-[70%]">{it.url}</div>
              <Button variant="outline" onClick={() => remove(it.id)}>Eliminar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}




