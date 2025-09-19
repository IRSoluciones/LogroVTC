import { Card, CardContent } from "@/components/ui/card";

export default function OtherServices() {
  return (
    <section id="otros" className="mt-24">
      <h3 className="text-3xl font-semibold">Otros servicios</h3>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <Card className="border-border/80">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold">Rutas por La Rioja</h4>
            <p className="mt-2 text-sm text-muted-foreground">Ruta de bodegas, Camino de Santiago, Museo del Vino y más. Quién mejor que un local para enseñarte su tierra.</p>
          </CardContent>
        </Card>
        <Card className="border-border/80">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold">Ruta del Ebro (GR-99)</h4>
            <p className="mt-2 text-sm text-muted-foreground">Traslados y logística en etapas del Camino Natural del Ebro. Transporte de bicicletas, mascotas y equipaje.</p>
          </CardContent>
        </Card>
        <Card className="border-border/80">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold">Coche con conductor</h4>
            <p className="mt-2 text-sm text-muted-foreground">Servicio discrecional sin distintivo para reuniones y eventos. Posibilidad de conductor en otro idioma.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


