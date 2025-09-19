import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, Eye, Ear, Hand, Brain, CheckCircle, AlertCircle, Calendar, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Accesibilidad | LogroVTC",
  description: "Política de accesibilidad de LogroVTC. Compromiso con la accesibilidad universal y la inclusión digital según estándares WCAG.",
};

export default function PoliticaAccesibilidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Política de Accesibilidad</h1>
          <p className="text-lg text-muted-foreground">
            Compromiso con la accesibilidad universal y la inclusión digital
          </p>
        </div>

        <div className="space-y-6">
          {/* Introducción */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                Nuestro Compromiso con la Accesibilidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                En LogroVTC, creemos firmemente que la tecnología debe ser accesible para todos. Nos comprometemos a proporcionar un sitio web que sea utilizable por personas con diferentes capacidades, incluyendo aquellas con discapacidades visuales, auditivas, motoras o cognitivas.
              </p>
              <p className="text-muted-foreground">
                Nuestra Política de Accesibilidad refleja nuestro compromiso con la inclusión digital y el cumplimiento de los estándares internacionales de accesibilidad web.
              </p>
            </CardContent>
          </Card>

          {/* Estándares de accesibilidad */}
          <Card>
            <CardHeader>
              <CardTitle>Estándares de Accesibilidad</CardTitle>
              <CardDescription>
                Cumplimos con los estándares internacionales más exigentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">WCAG 2.1 AA</h3>
                  <p className="text-sm text-muted-foreground">
                    Cumplimos con el nivel AA de las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, que es el estándar internacional de referencia para la accesibilidad web.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">EN 301 549 V3.2.1</h3>
                  <p className="text-sm text-muted-foreground">
                    Cumplimos con la norma europea EN 301 549 V3.2.1 sobre accesibilidad de productos y servicios TIC, que implementa la Directiva Europea de Accesibilidad Web.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">LSSI-CE</h3>
                  <p className="text-sm text-muted-foreground">
                    Cumplimos con la Ley de Servicios de la Sociedad de la Información y Comercio Electrónico española, que incluye requisitos de accesibilidad.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">UNE 139803</h3>
                  <p className="text-sm text-muted-foreground">
                    Cumplimos con la norma española UNE 139803 sobre accesibilidad de contenidos en la web.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Características de accesibilidad */}
          <Card>
            <CardHeader>
              <CardTitle>Características de Accesibilidad</CardTitle>
              <CardDescription>
                Funcionalidades que implementamos para mejorar la accesibilidad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Accesibilidad Visual */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Accesibilidad Visual</h3>
                </div>
                <p className="text-muted-foreground">
                  Características diseñadas para usuarios con discapacidades visuales:
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Contraste de colores suficiente (mínimo 4.5:1)</li>
                    <li>• Texto redimensionable hasta 200% sin pérdida de funcionalidad</li>
                    <li>• Alternativas de texto para todas las imágenes</li>
                    <li>• Estructura de encabezados semántica y lógica</li>
                    <li>• Indicadores de foco visibles y claros</li>
                    <li>• Modo oscuro/claro para mejor legibilidad</li>
                  </ul>
                </div>
              </div>

              {/* Accesibilidad Auditiva */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Ear className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Accesibilidad Auditiva</h3>
                </div>
                <p className="text-muted-foreground">
                  Características para usuarios con discapacidades auditivas:
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Subtítulos y transcripciones para contenido multimedia</li>
                    <li>• Alertas visuales para notificaciones importantes</li>
                    <li>• Contenido no dependiente únicamente del audio</li>
                    <li>• Indicadores visuales para eventos sonoros</li>
                  </ul>
                </div>
              </div>

              {/* Accesibilidad Motora */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Hand className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Accesibilidad Motora</h3>
                </div>
                <p className="text-muted-foreground">
                  Características para usuarios con discapacidades motoras:
                </p>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Navegación completa por teclado</li>
                    <li>• Áreas de clic suficientemente grandes</li>
                    <li>• Tiempo suficiente para completar acciones</li>
                    <li>• Evitar contenido que pueda causar convulsiones</li>
                    <li>• Acceso directo a funcionalidades principales</li>
                  </ul>
                </div>
              </div>

              {/* Accesibilidad Cognitiva */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Brain className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Accesibilidad Cognitiva</h3>
                </div>
                <p className="text-muted-foreground">
                  Características para usuarios con discapacidades cognitivas:
                </p>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Lenguaje claro y sencillo</li>
                    <li>• Estructura de navegación consistente</li>
                    <li>• Instrucciones paso a paso claras</li>
                    <li>• Evitar distracciones innecesarias</li>
                    <li>• Proporcionar ayuda contextual</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tecnologías de asistencia */}
          <Card>
            <CardHeader>
              <CardTitle>Tecnologías de Asistencia Compatibles</CardTitle>
              <CardDescription>
                Nuestro sitio web es compatible con las principales tecnologías de asistencia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold">Lectores de Pantalla</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• JAWS (Windows)</li>
                    <li>• NVDA (Windows)</li>
                    <li>• VoiceOver (macOS/iOS)</li>
                    <li>• TalkBack (Android)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Software de Ampliación</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• ZoomText</li>
                    <li>• Magnifier (Windows)</li>
                    <li>• Zoom (macOS)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Navegación por Teclado</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Navegación completa</li>
                    <li>• Atajos de teclado</li>
                    <li>• Indicadores de foco</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Herramientas de Accesibilidad</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Extensiones del navegador</li>
                    <li>• Herramientas de alto contraste</li>
                    <li>• Software de reconocimiento de voz</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado de cumplimiento */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de Cumplimiento</CardTitle>
              <CardDescription>
                Evaluación de la accesibilidad de nuestro sitio web
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Cumplimiento Verificado</h3>
                    <p className="text-sm text-muted-foreground">
                      Nuestro sitio web ha sido evaluado y cumple con los estándares WCAG 2.1 AA
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Pruebas Automatizadas</h3>
                    <p className="text-sm text-muted-foreground">
                      Utilizamos herramientas automatizadas para verificar la accesibilidad continuamente
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Pruebas Manuales</h3>
                    <p className="text-sm text-muted-foreground">
                      Realizamos pruebas manuales con usuarios reales y tecnologías de asistencia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h3 className="font-semibold">Mejora Continua</h3>
                    <p className="text-sm text-muted-foreground">
                      Trabajamos constantemente para mejorar la accesibilidad y corregir cualquier problema identificado
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proceso de mejora */}
          <Card>
            <CardHeader>
              <CardTitle>Proceso de Mejora de Accesibilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">1. Evaluación Regular</h3>
                <p className="text-muted-foreground">
                  Realizamos evaluaciones periódicas de accesibilidad utilizando herramientas automatizadas y pruebas manuales.
                </p>
                
                <h3 className="font-semibold text-lg">2. Feedback de Usuarios</h3>
                <p className="text-muted-foreground">
                  Recopilamos y analizamos comentarios de usuarios sobre la accesibilidad de nuestro sitio web.
                </p>
                
                <h3 className="font-semibold text-lg">3. Implementación de Mejoras</h3>
                <p className="text-muted-foreground">
                  Priorizamos e implementamos mejoras de accesibilidad basadas en las evaluaciones y el feedback recibido.
                </p>
                
                <h3 className="font-semibold text-lg">4. Formación del Equipo</h3>
                <p className="text-muted-foreground">
                  Nuestro equipo recibe formación regular sobre mejores prácticas de accesibilidad web.
                </p>
                
                <h3 className="font-semibold text-lg">5. Seguimiento de Estándares</h3>
                <p className="text-muted-foreground">
                  Monitoreamos las actualizaciones de los estándares de accesibilidad y adaptamos nuestro sitio web en consecuencia.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitaciones conocidas */}
          <Card>
            <CardHeader>
              <CardTitle>Limitaciones Conocidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Aunque nos esforzamos por mantener un alto nivel de accesibilidad, reconocemos que pueden existir algunas limitaciones:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Contenido de Terceros</h3>
                    <p className="text-sm text-muted-foreground">
                      Algunos contenidos de terceros (como mapas interactivos) pueden no cumplir completamente con nuestros estándares de accesibilidad.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Funcionalidades Avanzadas</h3>
                    <p className="text-sm text-muted-foreground">
                      Algunas funcionalidades avanzadas pueden requerir navegadores modernos o tecnologías específicas.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Contenido Dinámico</h3>
                    <p className="text-sm text-muted-foreground">
                      El contenido que se carga dinámicamente puede requerir tiempo adicional para ser procesado por las tecnologías de asistencia.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Compromiso:</strong> Trabajamos activamente para minimizar estas limitaciones y mejorar continuamente la accesibilidad de nuestro sitio web.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contacto para accesibilidad */}
          <Card>
            <CardHeader>
              <CardTitle>Contacto para Cuestiones de Accesibilidad</CardTitle>
              <CardDescription>
                Estamos aquí para ayudarte con cualquier problema de accesibilidad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Si encuentras algún problema de accesibilidad en nuestro sitio web o tienes sugerencias para mejorar la accesibilidad, por favor contacta con nosotros:
              </p>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>accesibilidad@logrovtc.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>684 20 06 59</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-muted-foreground">
                  Nos comprometemos a responder a todas las consultas sobre accesibilidad en un plazo máximo de 48 horas y a implementar las mejoras necesarias lo antes posible.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recursos adicionales */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Para más información sobre accesibilidad web, te recomendamos consultar estos recursos:
              </p>
              
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold">Estándares Internacionales</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <a href="https://www.w3.org/WAI/WCAG21/quickref/" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">WCAG 2.1 Guidelines</a></li>
                    <li>• <a href="https://www.w3.org/WAI/ARIA/" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">WAI-ARIA</a></li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Organizaciones Españolas</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <a href="https://www.discapnet.es/" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">Discapnet</a></li>
                    <li>• <a href="https://www.ceapat.es/" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">CEAPAT</a></li>
                  </ul>
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
                Esta Política de Accesibilidad fue actualizada por última vez el {new Date().toLocaleDateString("es-ES", {
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
