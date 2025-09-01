import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Route, Package } from "lucide-react";

export default function ServicesNav() {
  const items = [
    { icon: <Plane className="text-primary w-6 h-6" />, title: "Transporte a aeropuertos", desc: "Traslados a aeropuertos y estaciones: Madrid, Bilbao, Zaragoza, Barcelona, Logroño…", slug: "aeropuerto" },
    { icon: <Route className="text-primary w-6 h-6" />, title: "Camino de Santiago", desc: "Asistencia y traslados entre etapas en coche o furgoneta. Expertos en apoyo al peregrino.", slug: "camino" },
    { icon: <Package className="text-primary w-6 h-6" />, title: "Mensajería urgente", desc: "Entregas puerta a puerta en toda España y Europa con seguimiento.", slug: "mensajeria" },
  ];

  return (
    <section id="servicios" className="mt-24">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Servicios principales</h2>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {items.map(({ icon, title, desc, slug }, idx) => (
          <Card key={idx} className="border-border/80 bg-gradient-to-b from-card to-card/60 p-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {icon}
                <h3 className="text-lg font-medium">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/servicios/${slug}`}>Ver más detalles</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}


