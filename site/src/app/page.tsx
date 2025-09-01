import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">LogroVTC</h1>
        <p className="mt-3 text-muted-foreground">
          Traslados VTC en La Rioja: aeropuertos, estaciones y servicios a medida.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/servicios" className="rounded-lg px-5 py-3 border bg-card hover:bg-accent">Ver servicios</Link>
          <Link href="/aeropuertos" className="rounded-lg px-5 py-3 border bg-card hover:bg-accent">Aeropuertos</Link>
          <Link href="/estaciones" className="rounded-lg px-5 py-3 border bg-card hover:bg-accent">Estaciones</Link>
        </div>
      </section>
    </main>
  );
}
