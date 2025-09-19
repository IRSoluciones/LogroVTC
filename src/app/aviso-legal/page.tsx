import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Building, Phone, Mail, MapPin, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Aviso Legal | LogroVTC",
  description: "Información legal y términos de uso de LogroVTC. Datos de la empresa, responsabilidades y condiciones de servicio.",
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Aviso Legal</h1>
          <p className="text-lg text-muted-foreground">
            Información legal y términos de uso de LogroVTC
          </p>
        </div>

        <div className="space-y-6">
          {/* Información de la empresa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Información de la Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold">Razón Social</h3>
                  <p className="text-muted-foreground">LogroVTC</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">NIF/CIF</h3>
                  <p className="text-muted-foreground">[NIF/CIF de la empresa]</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Domicilio Social</h3>
                  <p className="text-muted-foreground">La Rioja, España</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Actividad</h3>
                  <p className="text-muted-foreground">Servicios de VTC y Transporte</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>684 20 06 59</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Mail className="h-4 w-4" />
                  <span>info@logrovtc.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>Zona de servicio: La Rioja y Rioja Alavesa</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Condiciones de uso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Condiciones de Uso
              </CardTitle>
              <CardDescription>
                Términos y condiciones para el uso de nuestros servicios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">1. Aceptación de las Condiciones</h3>
                <p className="text-muted-foreground">
                  El acceso y uso de este sitio web implica la aceptación expresa y plena de todas las condiciones y términos incluidos en este Aviso Legal.
                </p>
                
                <h3 className="font-semibold text-lg">2. Uso del Sitio Web</h3>
                <p className="text-muted-foreground">
                  El usuario se compromete a utilizar el sitio web de conformidad con la ley, la moral, las buenas costumbres y el orden público. El usuario se abstendrá de utilizar el sitio web con fines o efectos ilícitos, prohibidos o lesivos de los derechos e intereses de terceros.
                </p>
                
                <h3 className="font-semibold text-lg">3. Propiedad Intelectual</h3>
                <p className="text-muted-foreground">
                  Todos los contenidos del sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, enlaces, contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de LogroVTC o de terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia de propiedad intelectual.
                </p>
                
                <h3 className="font-semibold text-lg">4. Responsabilidad</h3>
                <p className="text-muted-foreground">
                  LogroVTC no se hace responsable de los daños y perjuicios que se pudieran derivar de interferencias, omisiones, interrupciones, informáticos, averías telefónicas o desconexiones en el funcionamiento operativo del sistema electrónico, motivadas por causas ajenas a la empresa.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Servicios VTC */}
          <Card>
            <CardHeader>
              <CardTitle>Servicios de VTC</CardTitle>
              <CardDescription>
                Información específica sobre nuestros servicios de transporte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Licencia de VTC</h3>
                <p className="text-muted-foreground">
                  LogroVTC opera bajo la licencia de Vehículo de Turismo con Conductor (VTC) expedida por la autoridad competente, cumpliendo con toda la normativa vigente en materia de transporte de viajeros.
                </p>
                
                <h3 className="font-semibold text-lg">Área de Servicio</h3>
                <p className="text-muted-foreground">
                  Nuestros servicios están disponibles en La Rioja y Rioja Alavesa, incluyendo traslados a aeropuertos, servicios del Camino de Santiago y mensajería urgente.
                </p>
                
                <h3 className="font-semibold text-lg">Tarifas y Reservas</h3>
                <p className="text-muted-foreground">
                  Las tarifas se establecen según la normativa vigente y se comunican al cliente antes de la prestación del servicio. Se recomienda realizar reservas con antelación, especialmente para servicios a aeropuertos.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitación de responsabilidad */}
          <Card>
            <CardHeader>
              <CardTitle>Limitación de Responsabilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  LogroVTC se compromete a realizar sus mejores esfuerzos para garantizar la disponibilidad y continuidad del sitio web y de los servicios. Sin embargo, no puede garantizar la ausencia de errores ni que la disponibilidad del servicio sea permanente e ininterrumpida.
                </p>
                
                <p className="text-muted-foreground">
                  En ningún caso LogroVTC será responsable por los daños y perjuicios de cualquier naturaleza que pudieran ocasionarse por el uso o la imposibilidad de uso del sitio web o de los contenidos, salvo en los supuestos previstos por la normativa vigente.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Legislación aplicable */}
          <Card>
            <CardHeader>
              <CardTitle>Legislación Aplicable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Las presentes condiciones se rigen por la legislación española. Para cualquier litigio que pudiera surgir relacionado con el sitio web o la actividad que en él se desarrolla serán competentes los Juzgados y Tribunales de La Rioja, salvo que la ley establezca otra jurisdicción obligatoria.
                </p>
                
                <p className="text-muted-foreground">
                  En caso de que alguna de las estipulaciones contenidas en este Aviso Legal sea declarada nula, se procederá a la eliminación o sustitución de la misma. En tal caso, dicha declaración no afectará a la validez del resto de las estipulaciones.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Modificaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Modificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  LogroVTC se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través del mismo como la forma en la que éstos aparezcan presentados o localizados en su sitio web.
                </p>
                
                <p className="text-muted-foreground">
                  Asimismo, se reserva el derecho de modificar las presentes condiciones cuando lo considere oportuno, así como el uso del sitio web.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Información de contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>
                Para cualquier consulta relacionada con este aviso legal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Para cualquier consulta relacionada con este Aviso Legal o con el sitio web, puede contactar con nosotros a través de:
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>684 20 06 59</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>info@logrovtc.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fecha de actualización */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Fecha de Actualización
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Este Aviso Legal fue actualizado por última vez el {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
