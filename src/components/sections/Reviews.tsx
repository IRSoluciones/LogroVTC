import { Card, CardContent } from "@/components/ui/card";

export default function Reviews() {
  return (
    <section id="opiniones" className="mt-24">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-semibold">Lo que dicen nuestros clientes</h3>
        <p className="mt-3 text-muted-foreground">Experiencias reales de viajeros que han confiado en nuestros servicios</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-border/80 bg-gradient-to-br from-card to-card/60">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-lg">m</div>
              <div className="flex-1"><h4 className="font-semibold">melanie dorado</h4></div>
              <div className="text-xs text-muted-foreground">Hace 2 semanas</div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<span key={i} className="text-lg">★</span>))}</div>
              <span className="font-semibold text-sm">5/5</span>
              <span className="bg-black text-white text-xs px-2 py-1 rounded">NUEVA</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">“Tuvimos una experiencia buenisa. Todos los choferes son muy amables y destacar la limpieza de los vehículos. Muy recomendable 10 de 10”</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-card to-card/60">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">A</div>
              <div className="flex-1"><h4 className="font-semibold">Ana Car</h4><div className="text-sm text-muted-foreground">11 reseñas</div></div>
              <div className="text-xs text-muted-foreground">Hace un mes</div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<span key={i} className="text-lg">★</span>))}</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">“Me ha tocado ir un par de veces a la estación de madrugada desde Villamediana... Ninguna queja las veces que lo he utilizado”</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-card to-card/60">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-lg">C</div>
              <div className="flex-1"><h4 className="font-semibold">Carme Puig</h4></div>
              <div className="text-xs text-muted-foreground">Hace 3 meses</div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<span key={i} className="text-lg">★</span>))}</div>
              <span className="font-semibold text-sm">5/5</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">“Super atentos y muy amables, puntualidad de 10... nos llevaron de Logroño a Roncesvalles y todo fue genial.”</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-card to-card/60">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center"><div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-brown-600 rounded-full"></div></div>
              <div className="flex-1"><h4 className="font-semibold">Martina Arnáez García</h4></div>
              <div className="text-xs text-muted-foreground">Hace 7 años</div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<span key={i} className="text-lg">★</span>))}</div>
              <span className="font-semibold text-sm">5/5</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">“Hemos utilizado sus servicios de taxi y nos atendieron muy bien. Nos enseñaron muchas cosas bonitas...”</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-card to-card/60">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold text-lg relative">👓<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-full"></div></div>
              <div className="flex-1"><h4 className="font-semibold">Marijo Rodríguez de Aspiunza</h4></div>
              <div className="text-xs text-muted-foreground">Hace 2 años</div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<span key={i} className="text-lg">★</span>))}</div>
              <span className="font-semibold text-sm">5/5</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">“Amabilidad y buen servicio, a un precio adecuado...”</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-card to-card/60">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold text-lg">F</div>
              <div className="flex-1"><h4 className="font-semibold">Francisco Javier Garcia Garcia</h4></div>
              <div className="text-xs text-muted-foreground">Hace 3 semanas</div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<span key={i} className="text-lg">★</span>))}</div>
              <span className="font-semibold text-sm">5/5</span>
              <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">NUEVA</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">“Taxi laguardia genial”</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


