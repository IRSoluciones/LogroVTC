## Variables de entorno

Crea `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_TOKEN=
REVALIDATE_SECRET=
```

## Esquema de base de datos

Archivo `supabase/schema.sql` con tablas: `reviews`, `faqs`, `gallery`, `services`, `airports`, `stations` y RLS de lectura pública.

## Panel de administración

- Ruta: `/admin`
- Introduce el token (ADMIN_TOKEN) para operar.
- Endpoints:
  - `/api/admin/reviews` (GET, POST, DELETE?id=)
  - `/api/admin/faqs` (GET, POST, DELETE?id=)
  - `/api/admin/services` (GET, POST, DELETE?slug=)
  - `/api/admin/aeropuertos` (GET, POST, DELETE?slug=)
  - `/api/admin/estaciones` (GET, POST, DELETE?slug=)
  - `/api/admin/gallery` (GET, POST, DELETE?id=)

## Endpoints públicos

- `/api/public/reviews?context=home|service|airport|station&slug=`
- `/api/public/gallery?limit=`

## Despliegue en Vercel

Configura las variables del proyecto con los valores de Supabase y el `ADMIN_TOKEN`. Para imágenes remotas, `next.config.ts` permite dominios de Supabase.
