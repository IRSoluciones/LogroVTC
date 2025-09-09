# Sistema de Cookies GDPR para LogroVTC

Este documento describe el sistema completo de cookies implementado en LogroVTC que cumple con el Reglamento General de Protección de Datos (GDPR) europeo.

## 🎯 Características Principales

- ✅ **Cumplimiento GDPR completo** - Sistema que respeta todos los requisitos del GDPR
- ✅ **Banner de cookies inteligente** - Se muestra solo cuando es necesario
- ✅ **Gestión granular** - Los usuarios pueden configurar cada tipo de cookie individualmente
- ✅ **Persistencia de preferencias** - Las preferencias se guardan en localStorage
- ✅ **Accesibilidad WCAG 2.1 AA** - Cumple con estándares de accesibilidad web
- ✅ **Responsive design** - Funciona perfectamente en todos los dispositivos
- ✅ **TypeScript** - Código completamente tipado para mayor seguridad

## 🏗️ Arquitectura del Sistema

### Componentes Principales

1. **`CookieBanner`** - Banner principal que se muestra a los usuarios
2. **`CookieManager`** - Modal para gestionar preferencias de cookies
3. **`useCookies`** - Hook personalizado para la lógica de cookies
4. **`cookie-config.ts`** - Configuración centralizada del sistema

### Páginas Legales

1. **`/aviso-legal`** - Aviso legal completo de la empresa
2. **`/politica-cookies`** - Política detallada de cookies
3. **`/politica-privacidad`** - Política de privacidad GDPR
4. **`/politica-accesibilidad`** - Política de accesibilidad WCAG

## 🚀 Instalación y Configuración

### 1. Dependencias

El sistema utiliza las siguientes dependencias que ya están incluidas en el proyecto:

```json
{
  "@radix-ui/react-slot": "^1.2.3",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "lucide-react": "^0.542.0",
  "next": "15.5.0",
  "react": "19.1.0",
  "tailwind-merge": "^3.3.1"
}
```

### 2. Estructura de Archivos

```
src/
├── components/
│   └── ui/
│       ├── cookie-banner.tsx      # Banner principal de cookies
│       ├── cookie-manager.tsx     # Gestor de preferencias
│       ├── button.tsx             # Componente de botón
│       ├── card.tsx               # Componente de tarjeta
│       └── generic-modal.tsx      # Modal genérico
├── lib/
│   ├── hooks/
│   │   └── useCookies.ts          # Hook personalizado para cookies
│   └── cookie-config.ts           # Configuración centralizada
└── app/
    ├── aviso-legal/
    │   └── page.tsx               # Página de aviso legal
    ├── politica-cookies/
    │   └── page.tsx               # Página de política de cookies
    ├── politica-privacidad/
    │   └── page.tsx               # Página de política de privacidad
    ├── politica-accesibilidad/
    │   └── page.tsx               # Página de política de accesibilidad
    └── layout.tsx                 # Layout principal con banner integrado
```

### 3. Integración en el Layout

El banner de cookies se integra automáticamente en el layout principal:

```tsx
// src/app/layout.tsx
import CookieBanner from "@/components/ui/cookie-banner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* ... contenido existente ... */}
        <CookieBanner />
      </body>
    </html>
  );
}
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google Analytics
NEXT_PUBLIC_GA_ENABLED=true
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Configuración de cookies
NEXT_PUBLIC_COOKIE_BANNER_DELAY=1000
NEXT_PUBLIC_COOKIE_BANNER_POSITION=bottom
```

### Personalización de la Configuración

Edita `src/lib/cookie-config.ts` para personalizar:

- Tipos de cookies
- Duración de las cookies
- Textos y mensajes
- Configuración de accesibilidad
- Cumplimiento legal

## 📱 Uso del Sistema

### Para Usuarios

1. **Primera visita**: Se muestra automáticamente el banner de cookies
2. **Opciones disponibles**:
   - Aceptar todas las cookies
   - Aceptar solo cookies necesarias
   - Personalizar preferencias
3. **Gestión continua**: Acceso al gestor de cookies desde cualquier página

### Para Desarrolladores

#### Uso del Hook useCookies

```tsx
import { useCookies } from '@/lib/hooks/useCookies';

function MyComponent() {
  const { 
    preferences, 
    hasConsent, 
    acceptAll, 
    acceptNecessary,
    togglePreference 
  } = useCookies();

  // Verificar si una categoría está habilitada
  if (preferences.analytics) {
    // Cargar Google Analytics
  }

  return (
    <div>
      <button onClick={acceptAll}>Aceptar Todas</button>
      <button onClick={acceptNecessary}>Solo Necesarias</button>
    </div>
  );
}
```

#### Uso del Componente CookieManager

```tsx
import CookieManager from '@/components/ui/cookie-manager';

function LegalPage() {
  return (
    <div>
      <h1>Política de Cookies</h1>
      <CookieManager />
    </div>
  );
}
```

## 🍪 Tipos de Cookies Implementados

### 1. Cookies Necesarias (Siempre Activas)
- **Propósito**: Funcionamiento básico del sitio web
- **Ejemplos**: Sesión, seguridad, funcionalidad básica
- **Duración**: Sesión del navegador
- **Consentimiento**: No requerido (siempre activas)

### 2. Cookies Analíticas (Opcionales)
- **Propósito**: Análisis de tráfico y comportamiento
- **Ejemplos**: Google Analytics, métricas de rendimiento
- **Duración**: 2 años
- **Consentimiento**: Requerido explícitamente

### 3. Cookies de Preferencias (Opcionales)
- **Propósito**: Recordar configuraciones del usuario
- **Ejemplos**: Idioma, tema, configuraciones de accesibilidad
- **Duración**: 1 año
- **Consentimiento**: Requerido explícitamente

### 4. Cookies de Marketing (Opcionales)
- **Propósito**: Publicidad personalizada y seguimiento
- **Ejemplos**: Anuncios dirigidos, campañas publicitarias
- **Duración**: 1 año
- **Consentimiento**: Requerido explícitamente

## 🔒 Cumplimiento GDPR

### Principios Implementados

1. **Consentimiento Explícito**: Los usuarios deben dar consentimiento activo
2. **Granularidad**: Control individual sobre cada tipo de cookie
3. **Retirada del Consentimiento**: Los usuarios pueden cambiar preferencias en cualquier momento
4. **Transparencia**: Información clara sobre el uso de cookies
5. **Minimización**: Solo se instalan cookies cuando son necesarias

### Derechos del Usuario

- ✅ **Acceso**: Ver qué cookies están activas
- ✅ **Rectificación**: Cambiar preferencias de cookies
- ✅ **Supresión**: Eliminar cookies no necesarias
- ✅ **Portabilidad**: Exportar preferencias de cookies
- ✅ **Oposición**: Rechazar cookies opcionales

## ♿ Accesibilidad

### Características Implementadas

- **Navegación por teclado**: Control completo sin ratón
- **Lectores de pantalla**: Compatible con JAWS, NVDA, VoiceOver
- **Contraste**: Cumple con estándares WCAG 2.1 AA
- **ARIA labels**: Etiquetas de accesibilidad apropiadas
- **Enfoque visible**: Indicadores claros de foco

### Tecnologías de Asistencia Soportadas

- Lectores de pantalla (JAWS, NVDA, VoiceOver, TalkBack)
- Software de ampliación (ZoomText, Magnifier)
- Navegación por teclado
- Herramientas de alto contraste

## 🧪 Testing y Validación

### Herramientas de Validación

1. **Lighthouse**: Para accesibilidad y rendimiento
2. **WAVE**: Para evaluación de accesibilidad web
3. **axe-core**: Para pruebas automatizadas de accesibilidad
4. **Cookiebot**: Para validación de cumplimiento GDPR

### Checklist de Validación

- [ ] Banner se muestra en la primera visita
- [ ] Preferencias se guardan correctamente
- [ ] Cookies se aplican según las preferencias
- [ ] Navegación por teclado funciona
- [ ] Lectores de pantalla pueden acceder al contenido
- [ ] Cumple con WCAG 2.1 AA
- [ ] Cumple con GDPR

## 🚨 Solución de Problemas

### Problemas Comunes

1. **Banner no se muestra**
   - Verificar que no haya consentimiento previo en localStorage
   - Comprobar que el componente esté importado correctamente

2. **Preferencias no se guardan**
   - Verificar que localStorage esté disponible
   - Comprobar la consola del navegador para errores

3. **Google Analytics no funciona**
   - Verificar que las variables de entorno estén configuradas
   - Comprobar que el consentimiento de analytics esté habilitado

### Debug

```tsx
// Habilitar logs de debug
localStorage.setItem('cookieDebug', 'true');

// Ver preferencias actuales
console.log('Cookie preferences:', localStorage.getItem('cookieConsent'));

// Limpiar preferencias
localStorage.removeItem('cookieConsent');
```

## 📚 Recursos Adicionales

### Documentación Legal

- [GDPR Texto Completo](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32016R0679)
- [AEPD - Agencia Española de Protección de Datos](https://www.aepd.es/)
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/)

### Herramientas de Desarrollo

- [Cookie Consent Checker](https://www.cookiebot.com/en/cookie-consent-checker/)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 🤝 Contribución

Para contribuir al sistema de cookies:

1. Fork del repositorio
2. Crear una rama para tu feature
3. Implementar cambios siguiendo las mejores prácticas
4. Añadir tests si es necesario
5. Crear un Pull Request

## 📄 Licencia

Este sistema de cookies está bajo la misma licencia que el proyecto principal de LogroVTC.

## 📞 Soporte

Para soporte técnico o consultas sobre el sistema de cookies:

- **Email**: desarrollo@logrovtc.com
- **Teléfono**: 684 20 06 59
- **Documentación**: Este README y las páginas legales del sitio

---

**Nota**: Este sistema está diseñado para cumplir con la legislación vigente en España y la Unión Europea. Para uso en otros países, consulta la legislación local aplicable.
