"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type GalleryProps = { count?: number };

export default function Gallery({ count = 8 }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const images = Array.from({ length: 16 }, (_, i) => `/vehicles/vehicle-${i + 1}.jpg`).slice(0, count);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquea el scroll cuando el lightbox está abierto y habilita navegación por teclado
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! + 1) % images.length);
    };
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex, images.length]);

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

      {mounted && lightboxIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-[92vw] max-w-5xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
              <Image src={images[lightboxIndex]} alt={`Vehículo ${lightboxIndex + 1}`} fill className="object-contain" sizes="(max-width: 1024px) 92vw, 1024px" />
              <button
                onClick={() => setLightboxIndex((prev) => (prev! - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-black grid place-items-center"
                aria-label="Imagen anterior"
              >
                ‹
              </button>
              <button
                onClick={() => setLightboxIndex((prev) => (prev! + 1) % images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-black grid place-items-center"
                aria-label="Imagen siguiente"
              >
                ›
              </button>
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute right-2 top-2 h-9 w-9 rounded-full bg-white/80 text-black grid place-items-center"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}


