import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const url = process.env.STRAPI_URL;
  if (url) {
    // Si hay STRAPI_URL, redirigir al panel de Strapi
    redirect(`${url.replace(/\/$/, "")}/admin`);
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Panel de administración</h1>
      <p className="mt-4 text-muted-foreground">
        No se ha configurado <code>STRAPI_URL</code>. Para acceder al panel de Strapi en local:
      </p>
      <ol className="list-decimal pl-5 mt-3 space-y-2 text-sm text-muted-foreground">
        <li>Arranca Strapi: <code>npm run develop</code> en tu proyecto Strapi.</li>
        <li>Crea un fichero <code>.env.local</code> en este proyecto con:
          <pre className="mt-2 rounded bg-muted p-3"><code>{`STRAPI_ENABLED=true
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=REEMPLAZA_CON_TU_TOKEN`}</code></pre>
        </li>
        <li>Vuelve a cargar esta página para redirigirte automáticamente.</li>
      </ol>
    </main>
  );
}



