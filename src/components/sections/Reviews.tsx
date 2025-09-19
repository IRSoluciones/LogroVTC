"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type ReviewsProps = {
  context?: "home" | "service" | "airport" | "station";
  slug?: string;
};

type ReviewItem = { author?: string; rating?: number; content?: string; featured?: boolean };

export default function Reviews({ context = "home", slug }: ReviewsProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const url = `/api/public/reviews?context=${encodeURIComponent(context)}${slug ? `&slug=${encodeURIComponent(slug)}` : ""}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (json?.ok && Array.isArray(json.reviews)) setReviews(json.reviews);
      })
      .catch(() => {});
  }, [context, slug]);

  return (
    <section id="opiniones" className="mt-24">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-semibold">Lo que dicen nuestros clientes</h3>
        <p className="mt-3 text-muted-foreground">Experiencias reales de viajeros que han confiado en nuestros servicios</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((r, idx) => (
            <Card key={idx} className="border-border/80 bg-gradient-to-br from-card to-card/60">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/80 grid place-items-center text-white font-semibold text-lg">
                    {r.author?.charAt(0) || "☺"}
                  </div>
                  <div className="flex-1"><h4 className="font-semibold">{r.author || "Cliente"}</h4></div>
                  <div className="text-xs text-muted-foreground">★★★★★</div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">{[...Array(r.rating || 5)].map((_, i) => (<span key={i} className="text-lg">★</span>))}</div>
                  {r.featured ? <span className="bg-black text-white text-xs px-2 py-1 rounded">DESTACADA</span> : null}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.content || ""}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          // Fallback estático breve si no hay Strapi o no hay datos
          <Card className="border-border/80 bg-gradient-to-br from-card to-card/60">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 grid place-items-center text-white font-semibold text-lg">A</div>
                <div className="flex-1"><h4 className="font-semibold">Cliente</h4></div>
                <div className="text-xs text-muted-foreground">★★★★★</div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<span key={i} className="text-lg">★</span>))}</div>
                <span className="font-semibold text-sm">5/5</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">“Servicio excelente y puntual. Repetiré sin duda.”</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}


