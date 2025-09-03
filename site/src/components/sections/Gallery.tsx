"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type GalleryProps = { count?: number };

export default function Gallery({ count = 8 }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>(Array.from({ length: count }, (_, i) => `/vehicles/vehicle-${i + 1}.jpg`));

  useEffect(() => {
    fetch(`/api/public/gallery?limit=${count}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (json?.ok && Array.isArray(json.images) && json.images.length > 0) {
          const urls = json.images.map((it: { url: string }) => it.url);
          setImages(urls);
        }
      })
      .catch(() => {});
  }, [count]);

  return (
    <section id="galeria" className="mt-24">
      <h3 className="text-3xl font-semibold">Galería de vehículos</h3>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button key={i} onClick={() => setLightboxIndex(i)} className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border" aria-label={`Ampliar vehículo ${i + 1}`}>
            <Image src={src} alt={`Vehículo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <div className="relative w-[92vw] max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
            <Image src={images[lightboxIndex]} alt={`Vehículo ${lightboxIndex + 1}`} fill className="object-contain" sizes="(max-width: 1024px) 92vw, 1024px" />
            <button onClick={() => setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-black grid place-items-center" aria-label="Imagen anterior">‹</button>
            <button onClick={() => setLightboxIndex((prev) => (prev! + 1) % images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-black grid place-items-center" aria-label="Imagen siguiente">›</button>
            <button onClick={() => setLightboxIndex(null)} className="absolute right-2 top-2 h-9 w-9 rounded-full bg-white/80 text-black grid place-items-center" aria-label="Cerrar">✕</button>
          </div>
        </div>
      )}
    </section>
  );
}


