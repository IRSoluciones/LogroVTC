import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie, Shield, Info, Settings, Eye, Calendar, Phone, Mail } from "lucide-react";
import CookieManager from "@/components/ui/cookie-manager";

export const metadata: Metadata = {
  title: "Política de Cookies | LogroVTC",
  description: "Política de cookies de LogroVTC. Información detallada sobre el uso de cookies y cómo gestionarlas según el GDPR.",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Política de Cookies</h1>
          <p className="text-lg text-muted-foreground">
            Información detallada sobre el uso de cookies en nuestro sitio web
          </p>
        </div>

        <div className="space-y-6">
          {/* Introducción */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                ¿Qué son las Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil) cuando visitas nuestro sitio web. Estas cookies nos permiten recordar tus preferencias, analizar el tráfico del sitio y personalizar tu experiencia.
              </p>
              <p className="text-muted-foreground">
                En LogroVTC, utilizamos cookies para mejorar la funcionalidad de nuestro sitio web y proporcionarte una mejor experiencia de usuario. Esta política explica qué tipos de cookies utilizamos y cómo puedes gestionarlas.
              </p>
            </CardContent>
          </Card>

          {/* Tipos de cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Cookies que Utilizamos</CardTitle>
              <CardDescription>
                Clasificación según su finalidad y duración
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cookies Necesarias */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Cookies Necesarias</h3>
                    <p className="text-sm text-muted-foreground">Siempre activas</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar. Incluyen cookies que permiten funciones básicas como la navegación por las páginas y el acceso a áreas seguras del sitio web.
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Ejemplos:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Cookies de sesión para mantener tu sesión activa</li>
                    <li>• Cookies de seguridad para proteger contra ataques</li>
                    <li>• Cookies de funcionalidad básica del sitio</li>
                  </ul>
                </div>
              </div>

              {/* Cookies Analíticas */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Cookies Analíticas</h3>
                    <p className="text-sm text-muted-foreground">Opcionales</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Estas cookies nos permiten analizar cómo utilizas nuestro sitio web, qué páginas visitas más frecuentemente y cómo llegas a nuestro sitio. Esta información nos ayuda a mejorar la funcionalidad y el contenido del sitio.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Ejemplos:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Google Analytics para estadísticas de visitas</li>
                    <li>• Análisis de comportamiento del usuario</li>
                    <li>• Métricas de rendimiento del sitio</li>
                  </ul>
                </div>
              </div>

              {/* Cookies de Preferencias */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Settings className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Cookies de Preferencias</h3>
                    <p className="text-sm text-muted-foreground">Opcionales</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Estas cookies permiten que el sitio web recuerde información que cambia la forma en que se comporta o se ve, como tu idioma preferido o la región en la que te encuentras.
                </p>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Ejemplos:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Preferencias de idioma</li>
                    <li>• Configuraciones de accesibilidad</li>
                    <li>• Preferencias de visualización</li>
                  </ul>
                </div>
              </div>

              {/* Cookies de Marketing */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Eye className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Cookies de Marketing</h3>
                    <p className="text-sm text-muted-foreground">Opcionales</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Estas cookies se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual.
                </p>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Ejemplos:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Publicidad personalizada</li>
                    <li>• Seguimiento de campañas publicitarias</li>
                    <li>• Análisis de efectividad de marketing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Duración de las cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Duración de las Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold">Cookies de Sesión</h3>
                  <p className="text-sm text-muted-foreground">
                    Se eliminan automáticamente cuando cierras el navegador. Se utilizan para mantener tu sesión activa durante la navegación.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Cookies Persistentes</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanecen en tu dispositivo hasta que las elimines manualmente o expiren. Se utilizan para recordar tus preferencias.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gestión de cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Cookies</CardTitle>
              <CardDescription>
                Cómo puedes controlar y gestionar las cookies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Tienes varias opciones para gestionar las cookies en nuestro sitio web:
              </p>
              
              <div className="space-y-3">
                <h3 className="font-semibold">1. Configuración del Sitio Web</h3>
                <p className="text-muted-foreground">
                  Utiliza nuestro gestor de cookies integrado para configurar tus preferencias en tiempo real:
                </p>
                <div className="flex justify-center py-4">
                  <CookieManager />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">2. Configuración del Navegador</h3>
                <p className="text-muted-foreground">
                  Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envíe una cookie. Sin embargo, si rechazas las cookies, es posible que algunas partes de nuestro sitio web no funcionen correctamente.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Cómo configurar cookies en tu navegador:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                    <li>• <strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                    <li>• <strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                    <li>• <strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">3. Herramientas de Terceros</h3>
                <p className="text-muted-foreground">
                  También puedes utilizar herramientas de terceros para gestionar las cookies, como extensiones del navegador que te permiten controlar qué cookies se instalan en tu dispositivo.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies de terceros */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies de Terceros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nuestro sitio web puede utilizar servicios de terceros que instalan cookies en tu dispositivo. Estos servicios incluyen:
              </p>
              
              <div className="space-y-3">
                <h3 className="font-semibold">Google Analytics</h3>
                <p className="text-muted-foreground">
                  Utilizamos Google Analytics para analizar el tráfico de nuestro sitio web. Google Analytics utiliza cookies para recopilar información sobre cómo utilizas nuestro sitio.
                </p>
                <p className="text-muted-foreground">
                  Para más información sobre cómo Google utiliza las cookies, visita la{" "}
                  <a href="https://policies.google.com/technologies/cookies" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
                    Política de Privacidad de Google
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Otros Servicios</h3>
                <p className="text-muted-foreground">
                  Podemos utilizar otros servicios de terceros para funcionalidades específicas. En cada caso, te informaremos sobre el uso de estas cookies y podrás optar por no utilizarlas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actualizaciones de la política */}
          <Card>
            <CardHeader>
              <CardTitle>Actualizaciones de esta Política</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nos reservamos el derecho de actualizar esta Política de Cookies en cualquier momento. Cualquier cambio será publicado en esta página con una nueva fecha de &quot;Última actualización&quot;.
              </p>
              <p className="text-muted-foreground">
                Te recomendamos revisar esta política periódicamente para estar informado sobre cómo utilizamos las cookies.
              </p>
            </CardContent>
          </Card>

          {/* Información de contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>
                Para consultas sobre nuestra política de cookies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Si tienes alguna pregunta sobre nuestra Política de Cookies o sobre el uso de cookies en nuestro sitio web, no dudes en contactar con nosotros:
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>630 92 66 11</span>
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
                Última Actualización
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Esta Política de Cookies fue actualizada por última vez el {new Date().toLocaleDateString("es-ES", {
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
