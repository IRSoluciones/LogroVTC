import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Database, Eye, Lock, Calendar, Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad | LogroVTC",
  description: "Política de privacidad de LogroVTC. Información sobre el tratamiento de datos personales según el GDPR europeo.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Política de Privacidad</h1>
          <p className="text-lg text-muted-foreground">
            Protección de datos personales y privacidad en LogroVTC
          </p>
        </div>

        <div className="space-y-6">
          {/* Introducción */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compromiso con la Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                En LogroVTC, nos tomamos muy en serio la protección de tu privacidad y datos personales. Esta Política de Privacidad explica cómo recopilamos, utilizamos, almacenamos y protegemos tu información personal cuando utilizas nuestro sitio web y servicios.
              </p>
              <p className="text-muted-foreground">
                Cumplimos estrictamente con el Reglamento General de Protección de Datos (GDPR) de la Unión Europea y la Ley Orgánica de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPDGDD) de España.
              </p>
            </CardContent>
          </Card>

          {/* Responsable del tratamiento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Responsable del Tratamiento
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
                  <h3 className="font-semibold">Domicilio</h3>
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
                  <span>722 10 91 11</span>
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

          {/* Datos que recopilamos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Datos Personales que Recopilamos
              </CardTitle>
              <CardDescription>
                Tipos de información que podemos recopilar de ti
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">1. Datos de Identificación</h3>
                <p className="text-muted-foreground">
                  Información básica para identificarte y contactar contigo:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Nombre y apellidos</li>
                  <li>• Número de teléfono</li>
                  <li>• Dirección de correo electrónico</li>
                  <li>• Dirección postal (cuando sea necesario)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">2. Datos del Servicio</h3>
                <p className="text-muted-foreground">
                  Información relacionada con los servicios que solicitas:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Origen y destino del viaje</li>
                  <li>• Fecha y hora del servicio</li>
                  <li>• Número de pasajeros</li>
                  <li>• Requisitos especiales o accesibilidad</li>
                  <li>• Historial de servicios contratados</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">3. Datos de Navegación</h3>
                <p className="text-muted-foreground">
                  Información técnica sobre tu uso del sitio web:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Dirección IP</li>
                  <li>• Tipo de navegador y dispositivo</li>
                  <li>• Páginas visitadas y tiempo de permanencia</li>
                  <li>• Cookies y tecnologías similares</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">4. Datos de Comunicación</h3>
                <p className="text-muted-foreground">
                  Información de las comunicaciones que mantenemos contigo:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Consultas y solicitudes de información</li>
                  <li>• Comentarios y valoraciones</li>
                  <li>• Comunicaciones de servicio al cliente</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Finalidad del tratamiento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Finalidad del Tratamiento
              </CardTitle>
              <CardDescription>
                Para qué utilizamos tus datos personales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. Prestación de Servicios</h3>
                  <p className="text-muted-foreground">
                    Para gestionar y prestar los servicios de VTC que solicitas, incluyendo reservas, confirmaciones y seguimiento del servicio.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">2. Comunicación y Atención al Cliente</h3>
                  <p className="text-muted-foreground">
                    Para responder a tus consultas, proporcionar información sobre nuestros servicios y resolver incidencias.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">3. Mejora de Servicios</h3>
                  <p className="text-muted-foreground">
                    Para analizar el uso de nuestro sitio web y servicios, con el fin de mejorar la experiencia del usuario y la calidad de nuestros servicios.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">4. Cumplimiento Legal</h3>
                  <p className="text-muted-foreground">
                    Para cumplir con las obligaciones legales aplicables, incluyendo la normativa de transporte, fiscal y de protección de datos.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">5. Marketing y Promociones</h3>
                  <p className="text-muted-foreground">
                    Para enviarte información sobre nuestros servicios, promociones y novedades, siempre con tu consentimiento previo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base legal */}
          <Card>
            <CardHeader>
              <CardTitle>Base Legal del Tratamiento</CardTitle>
              <CardDescription>
                Fundamentos legales para el tratamiento de tus datos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">1. Ejecución del Contrato</h3>
                <p className="text-muted-foreground">
                  El tratamiento es necesario para la ejecución del contrato de servicios de VTC que solicitas.
                </p>
                
                <h3 className="font-semibold text-lg">2. Interés Legítimo</h3>
                <p className="text-muted-foreground">
                  Para mejorar nuestros servicios, analizar el uso del sitio web y gestionar la relación comercial.
                </p>
                
                <h3 className="font-semibold text-lg">3. Consentimiento</h3>
                <p className="text-muted-foreground">
                  Para el envío de comunicaciones comerciales y el uso de cookies no esenciales.
                </p>
                
                <h3 className="font-semibold text-lg">4. Cumplimiento de Obligaciones Legales</h3>
                <p className="text-muted-foreground">
                  Para cumplir con las normativas aplicables en materia de transporte y fiscal.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Conservación de datos */}
          <Card>
            <CardHeader>
              <CardTitle>Conservación de los Datos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Conservamos tus datos personales únicamente durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados, incluyendo las obligaciones legales, contables o de reporting.
              </p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold">Datos de Cliente</h3>
                  <p className="text-sm text-muted-foreground">
                    Se conservan durante 5 años desde la última prestación de servicio, para cumplir con obligaciones fiscales.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Datos de Navegación</h3>
                  <p className="text-sm text-muted-foreground">
                    Se conservan durante 2 años, salvo que se revoque el consentimiento antes.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Comunicaciones Comerciales</h3>
                  <p className="text-sm text-muted-foreground">
                    Se conservan hasta que revoques tu consentimiento o solicites la baja.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Según el tipo: sesión (hasta cerrar navegador) o persistentes (hasta 2 años).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Destinatarios */}
          <Card>
            <CardHeader>
              <CardTitle>Destinatarios de los Datos</CardTitle>
              <CardDescription>
                Con quién compartimos tu información
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">1. Personal Autorizado</h3>
                <p className="text-muted-foreground">
                  Nuestro personal autorizado que necesita acceder a tus datos para prestar los servicios solicitados.
                </p>
                
                <h3 className="font-semibold text-lg">2. Proveedores de Servicios</h3>
                <p className="text-muted-foreground">
                  Empresas que nos prestan servicios técnicos, como hosting, análisis web o herramientas de comunicación, siempre con garantías adecuadas.
                </p>
                
                <h3 className="font-semibold text-lg">3. Autoridades Públicas</h3>
                <p className="text-muted-foreground">
                  Cuando sea necesario para cumplir con obligaciones legales o en respuesta a requerimientos legítimos.
                </p>
                
                <h3 className="font-semibold text-lg">4. Terceros con Consentimiento</h3>
                <p className="text-muted-foreground">
                  Solo cuando hayas dado tu consentimiento expreso para compartir datos con terceros específicos.
                </p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Importante:</strong> No vendemos, alquilamos ni intercambiamos tus datos personales con terceros con fines comerciales.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Derechos del usuario */}
          <Card>
            <CardHeader>
              <CardTitle>Tus Derechos</CardTitle>
              <CardDescription>
                Derechos que tienes sobre tus datos personales según el GDPR
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold">Acceso</h3>
                  <p className="text-sm text-muted-foreground">
                    Derecho a saber qué datos tuyos tenemos y cómo los tratamos.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Rectificación</h3>
                  <p className="text-sm text-muted-foreground">
                    Derecho a corregir datos inexactos o incompletos.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Supresión</h3>
                  <p className="text-sm text-muted-foreground">
                    Derecho a que eliminemos tus datos (&quot;derecho al olvido&quot;).
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Limitación</h3>
                  <p className="text-sm text-muted-foreground">
                    Derecho a limitar el tratamiento de tus datos.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Portabilidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Derecho a recibir tus datos en formato estructurado.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Oposición</h3>
                  <p className="text-sm text-muted-foreground">
                    Derecho a oponerte al tratamiento de tus datos.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-muted-foreground">
                  Para ejercer cualquiera de estos derechos, puedes contactar con nosotros a través de:
                </p>
                <div className="grid gap-3 md:grid-cols-2 mt-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>privacy@logrovtc.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>722 10 91 11</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Medidas de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción.
              </p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold">Medidas Técnicas</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Encriptación de datos en tránsito</li>
                    <li>• Acceso seguro con HTTPS</li>
                    <li>• Firewalls y sistemas de seguridad</li>
                    <li>• Copias de seguridad regulares</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Medidas Organizativas</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Políticas de acceso y confidencialidad</li>
                    <li>• Formación del personal</li>
                    <li>• Auditorías regulares</li>
                    <li>• Procedimientos de incidentes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transferencias internacionales */}
          <Card>
            <CardHeader>
              <CardTitle>Transferencias Internacionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Tus datos personales se procesan principalmente en España y en la Unión Europea. En caso de que sea necesario realizar transferencias internacionales a países que no proporcionen un nivel adecuado de protección, implementaremos las garantías apropiadas.
              </p>
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Actualmente no realizamos transferencias internacionales de datos personales fuera del Espacio Económico Europeo.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Información de contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>
                Para consultas sobre protección de datos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Si tienes alguna pregunta sobre esta Política de Privacidad o sobre el tratamiento de tus datos personales, puedes contactar con nosotros:
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>privacy@logrovtc.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>722 10 91 11</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    También puedes presentar una reclamación ante la{" "}
                    <a href="https://www.aepd.es" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
                      Agencia Española de Protección de Datos (AEPD)
                    </a>{" "}
                    si consideras que el tratamiento de tus datos personales no se ajusta a la normativa vigente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fecha de actualización */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Última Actualización
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Esta Política de Privacidad fue actualizada por última vez el {new Date().toLocaleDateString("es-ES", {
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
