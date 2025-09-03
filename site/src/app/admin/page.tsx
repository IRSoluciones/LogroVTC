"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Review = { id?: number; author: string; rating: number; content?: string; featured?: boolean; context?: string; slug?: string };
type Faq = { id?: number; context: string; slug: string; question: string; answer: string };

type ServiceRow = { slug: string; name: string; title: string; description: string; intro: string; keywords?: string[] };
type ServiceForm = { slug: string; name: string; title: string; description: string; intro: string; keywords: string };

type AirportRow = { slug: string; name: string; city?: string; code?: string; intro: string; description: string; keywords?: string[] };
type AirportForm = { slug: string; name: string; city: string; code: string; intro: string; description: string; keywords: string };

type StationRow = { slug: string; name: string; city?: string; type: "tren" | "bus"; intro: string; description: string; keywords?: string[] };
type StationForm = { slug: string; name: string; city: string; type: "tren" | "bus"; intro: string; description: string; keywords: string };

type GalleryRow = { id?: number; url: string; alt?: string; position?: number; active?: boolean };
type GalleryForm = { url: string; alt: string; position: number; active: boolean };

export default function AdminPage() {
  const [token, setToken] = useState<string>("");
  const [tokenInput, setTokenInput] = useState<string>("");
  const headers = useMemo<Record<string, string>>(() => {
    const h: Record<string, string> = {};
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
  }, [token]);
  const [active, setActive] = useState<"services" | "airports" | "stations" | "reviews" | "faqs" | "gallery">("services");

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
    <main className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-b py-3">
        <div className="flex flex-wrap gap-2">
          {([
            { key: "services", label: "Servicios" },
            { key: "airports", label: "Aeropuertos" },
            { key: "stations", label: "Estaciones" },
            { key: "gallery", label: "Galería" },
            { key: "reviews", label: "Reviews" },
            { key: "faqs", label: "FAQs" },
          ] as const).map(({ key, label }) => (
            <Button key={key} variant={active === key ? "default" : "outline"} onClick={() => setActive(key)}>
              {label}
            </Button>
          ))}
        </div>
      </div>

      {active === "services" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Servicios</h2>
          <ServicesAdmin headers={headers} />
        </section>
      )}
      {active === "airports" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Aeropuertos</h2>
          <AirportsAdmin headers={headers} />
        </section>
      )}
      {active === "stations" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Estaciones</h2>
          <StationsAdmin headers={headers} />
        </section>
      )}
      {active === "gallery" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Galería</h2>
          <GalleryAdmin headers={headers} />
        </section>
      )}
      {active === "reviews" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          <ReviewsAdmin headers={headers} />
        </section>
      )}
      {active === "faqs" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">FAQs</h2>
          <FaqsAdmin headers={headers} />
        </section>
      )}
    </main>
  );
}

function ReviewsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<Review[]>([]);
  const [form, setForm] = useState<Review>({ author: "", rating: 5, content: "", context: "home", slug: "" });
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/reviews", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.reviews);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);

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
  function edit(r: Review) {
    setForm({ id: r.id, author: r.author, rating: r.rating, content: r.content || "", featured: r.featured, context: r.context, slug: r.slug });
  }
  function resetForm() {
    setForm({ author: "", rating: 5, content: "", context: "home", slug: "" });
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          {form.id ? <div className="text-xs text-muted-foreground">Editando ID #{form.id}</div> : null}
          <Input placeholder="Autor" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <Input placeholder="Rating (1-5)" type="number" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
          <Input placeholder="Contexto (home/service/airport/station)" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
          <Input placeholder="Slug (opcional)" value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Textarea placeholder="Contenido" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={submit}>{form.id ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{r.author} · {r.rating}/5 · {r.context}{r.slug ? ` · ${r.slug}` : ""}</div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => edit(r)}>Editar</Button>
                  <Button variant="outline" onClick={() => remove(r.id)}>Eliminar</Button>
                </div>
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
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/faqs", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.faqs);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);

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
  function edit(f: Faq) {
    setForm({ id: f.id, context: f.context, slug: f.slug, question: f.question, answer: f.answer });
  }
  function resetForm() {
    setForm({ context: "service", slug: "", question: "", answer: "" });
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          {form.id ? <div className="text-xs text-muted-foreground">Editando ID #{form.id}</div> : null}
          <Input placeholder="Contexto (service/airport/station)" value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} />
          <Input placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="Pregunta" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          <Textarea placeholder="Respuesta" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={submit}>{form.id ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
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
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => edit(f)}>Editar</Button>
                <Button variant="outline" onClick={() => remove(f.id)}>Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ServicesAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [form, setForm] = useState<ServiceForm>({ slug: "", name: "", title: "", description: "", intro: "", keywords: "" });
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/services", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.services as ServiceRow[]);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
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
  function edit(it: ServiceRow) {
    setForm({
      slug: it.slug,
      name: it.name,
      title: it.title,
      description: it.description,
      intro: it.intro,
      keywords: (it.keywords || []).join(", "),
    });
  }
  function resetForm() {
    setForm({ slug: "", name: "", title: "", description: "", intro: "", keywords: "" });
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
          <div className="flex gap-2">
            <Button onClick={submit}>{items.find((i) => i.slug === form.slug) ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.slug}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="font-medium">{it.slug} · {it.name}</div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => edit(it)}>Editar</Button>
                <Button variant="outline" onClick={() => remove(it.slug)}>Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AirportsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<AirportRow[]>([]);
  const [form, setForm] = useState<AirportForm>({ slug: "", name: "", city: "", code: "", intro: "", description: "", keywords: "" });
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/aeropuertos", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.airports as AirportRow[]);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
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
  function edit(it: AirportRow) {
    setForm({
      slug: it.slug,
      name: it.name,
      city: it.city || "",
      code: it.code || "",
      intro: it.intro,
      description: it.description,
      keywords: (it.keywords || []).join(", "),
    });
  }
  function resetForm() {
    setForm({ slug: "", name: "", city: "", code: "", intro: "", description: "", keywords: "" });
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
          <div className="flex gap-2">
            <Button onClick={submit}>{items.find((i) => i.slug === form.slug) ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.slug}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="font-medium">{it.slug} · {it.name}</div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => edit(it)}>Editar</Button>
                <Button variant="outline" onClick={() => remove(it.slug)}>Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StationsAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<StationRow[]>([]);
  const [form, setForm] = useState<StationForm>({ slug: "", name: "", city: "", type: "tren", intro: "", description: "", keywords: "" });
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/estaciones", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.stations as StationRow[]);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
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
  function edit(it: StationRow) {
    setForm({
      slug: it.slug,
      name: it.name,
      city: it.city || "",
      type: it.type,
      intro: it.intro,
      description: it.description,
      keywords: (it.keywords || []).join(", "),
    });
  }
  function resetForm() {
    setForm({ slug: "", name: "", city: "", type: "tren", intro: "", description: "", keywords: "" });
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <Input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <Input
            placeholder="type (tren/bus)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value === "bus" ? "bus" : "tren" })}
          />
          <Textarea placeholder="intro" value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
          <Textarea placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="keywords (coma)" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={submit}>{items.find((i) => i.slug === form.slug) ? "Actualizar" : "Guardar"}</Button>
            <Button variant="outline" onClick={resetForm}>Nuevo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it.slug}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="font-medium">{it.slug} · {it.name}</div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => edit(it)}>Editar</Button>
                <Button variant="outline" onClick={() => remove(it.slug)}>Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GalleryAdmin({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [form, setForm] = useState<GalleryForm>({ url: "", alt: "", position: 0, active: true });
  const load = useCallback(async () => {
    const res = await fetch("/api/admin/gallery", { headers });
    const json = await res.json();
    if (json.ok) setItems(json.images as GalleryRow[]);
  }, [headers]);
  useEffect(() => { void load(); }, [load]);
  const [dragOver, setDragOver] = useState(false);

  async function onDropFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("file", f));
    fd.append("alt", form.alt);
    fd.append("position", String(form.position));
    fd.append("active", String(form.active));
    await fetch("/api/admin/gallery/upload", { method: "POST", headers: { ...headers }, body: fd });
    setForm({ url: "", alt: "", position: 0, active: true });
    void load();
  }
  async function remove(id?: number) {
    if (!id) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE", headers });
    load();
  }
  async function update(it: GalleryRow) {
    await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(it) });
    load();
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-5 grid gap-2">
          <div
            className={`border-2 border-dashed rounded-md p-6 text-center ${dragOver ? "border-primary bg-primary/5" : "border-border"}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); onDropFiles(e.dataTransfer.files); }}
          >
            <p className="text-sm text-muted-foreground">Arrastra y suelta imágenes aquí o</p>
            <div className="mt-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => onDropFiles(e.target.files)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Input placeholder="alt" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
            <Input placeholder="posición" type="number" value={form.position} onChange={(e) => setForm({ ...form, position: Number(e.target.value) })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="activa (true/false)" value={String(form.active)} onChange={(e) => setForm({ ...form, active: e.target.value === "true" })} />
            <Button variant="outline" onClick={() => setForm({ url: "", alt: "", position: 0, active: true })}>Limpiar</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3">
        {items.map((it, idx) => (
          <Card key={it.id ?? idx}>
            <CardContent className="p-4 grid gap-2">
              <div className="text-sm truncate">{it.url}</div>
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="alt" value={it.alt || ""} onChange={(e) => setItems((arr) => arr.map((x, i) => i === idx ? { ...x, alt: e.target.value } : x))} />
                <Input placeholder="posición" type="number" value={it.position ?? 0} onChange={(e) => setItems((arr) => arr.map((x, i) => i === idx ? { ...x, position: Number(e.target.value) } : x))} />
                <Input placeholder="activa (true/false)" value={String(it.active ?? true)} onChange={(e) => setItems((arr) => arr.map((x, i) => i === idx ? { ...x, active: e.target.value === "true" } : x))} />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => remove(it.id)}>Eliminar</Button>
                <Button onClick={() => update(it)}>Guardar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}




