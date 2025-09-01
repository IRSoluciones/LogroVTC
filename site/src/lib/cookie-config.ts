// Configuración centralizada para el sistema de cookies
export const COOKIE_CONFIG = {
  // Política de renovación del consentimiento
  CONSENT: {
    // Días tras los que volver a solicitar consentimiento (0 = nunca forzar)
    RENEW_AFTER_DAYS: 180,
  },
  // Claves de almacenamiento
  STORAGE_KEYS: {
    CONSENT: 'cookieConsent',
    VERSION: 'cookieConsentVersion',
  },
  
  // Versión actual del sistema de cookies
  CURRENT_VERSION: '1.0',
  
  // Configuración de tipos de cookies
  TYPES: {
    NECESSARY: {
      key: 'necessary',
      label: 'Necesarias',
      description: 'Cookies esenciales para el funcionamiento del sitio web',
      required: true,
      color: 'green',
      icon: 'shield',
    },
    ANALYTICS: {
      key: 'analytics',
      label: 'Analíticas',
      description: 'Nos ayudan a entender cómo usas nuestro sitio',
      required: false,
      color: 'blue',
      icon: 'info',
    },
    PREFERENCES: {
      key: 'preferences',
      label: 'Preferencias',
      description: 'Recuerdan tus configuraciones y preferencias',
      required: false,
      color: 'purple',
      icon: 'settings',
    },
    MARKETING: {
      key: 'marketing',
      label: 'Marketing',
      description: 'Para mostrar contenido personalizado y publicidad',
      required: false,
      color: 'orange',
      icon: 'cookie',
    },
  },
  
  // Configuración de Google Analytics
  GOOGLE_ANALYTICS: {
    ENABLED: process.env.NEXT_PUBLIC_GA_ENABLED === 'true',
    MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID',
    SCRIPT_URL: 'https://www.googletagmanager.com/gtag/js',
  },
  
  // Configuración de cookies de terceros
  THIRD_PARTY: {
    GOOGLE_ANALYTICS: {
      name: 'Google Analytics',
      purpose: 'Análisis de tráfico web y comportamiento del usuario',
      provider: 'Google LLC',
      privacyPolicy: 'https://policies.google.com/privacy',
      cookiePolicy: 'https://policies.google.com/technologies/cookies',
    },
    // Agregar más servicios de terceros según sea necesario
  },
  
  // Duración de las cookies
  DURATION: {
    SESSION: 'session', // Se eliminan al cerrar el navegador
    PERSISTENT: 'persistent', // Permanecen hasta que se eliminen manualmente
    ANALYTICS: 2 * 365 * 24 * 60 * 60 * 1000, // 2 años en milisegundos
    MARKETING: 1 * 365 * 24 * 60 * 60 * 1000, // 1 año en milisegundos
    PREFERENCES: 1 * 365 * 24 * 60 * 60 * 1000, // 1 año en milisegundos
  },
  
  // Configuración de la interfaz de usuario
  UI: {
    BANNER: {
      SHOW_DELAY: 1000, // Milisegundos antes de mostrar el banner
      AUTO_HIDE: false, // No ocultar automáticamente
      POSITION: 'bottom', // Posición del banner
    },
    PREFERENCES: {
      SHOW_DETAILS: true, // Mostrar detalles de cada tipo de cookie
      ALLOW_INDIVIDUAL: true, // Permitir configurar individualmente
      SHOW_EXAMPLES: true, // Mostrar ejemplos de uso
    },
  },
  
  // Textos y mensajes
  MESSAGES: {
    BANNER: {
      TITLE: 'Configuración de Cookies',
      DESCRIPTION: 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio web',
      ACCEPT_ALL: 'Aceptar Todas',
      ACCEPT_NECESSARY: 'Solo Necesarias',
      CUSTOMIZE: 'Personalizar',
      CLOSE: 'Cerrar',
    },
    PREFERENCES: {
      TITLE: 'Gestión de Cookies',
      DESCRIPTION: 'Configura tus preferencias de cookies y revisa qué tipos utilizamos',
      SAVE: 'Guardar Cambios',
      RESET: 'Restablecer',
      BACK: 'Volver',
    },
    TYPES: {
      NECESSARY: {
        ALWAYS_ACTIVE: 'Siempre activas',
        CANNOT_DISABLE: 'No se puede desactivar',
      },
      OPTIONAL: {
        ENABLED: 'Activadas',
        DISABLED: 'Desactivadas',
      },
    },
  },
  
  // Configuración de accesibilidad
  ACCESSIBILITY: {
    ARIA_LABELS: {
      BANNER: 'Banner de configuración de cookies',
      PREFERENCES: 'Panel de preferencias de cookies',
      TOGGLE: 'Alternar preferencia de cookies',
      CLOSE: 'Cerrar configuración de cookies',
    },
    KEYBOARD_NAVIGATION: {
      ENABLED: true,
      TRAP_FOCUS: true,
      ESCAPE_TO_CLOSE: true,
    },
  },
  
  // Configuración de cumplimiento legal
  COMPLIANCE: {
    GDPR: {
      ENABLED: true,
      REQUIRE_EXPLICIT_CONSENT: true,
      ALLOW_WITHDRAWAL: true,
      DATA_PORTABILITY: true,
    },
    CCPA: {
      ENABLED: false, // Solo si operas en California
      OPT_OUT_RIGHTS: false,
    },
    LOCAL_LAWS: {
      SPAIN: {
        LSSI_CE: true,
        LOPDGDD: true,
      },
      EU: {
        EPRIVACY: true,
        ACCESSIBILITY: true,
      },
    },
  },
};

// Tipos TypeScript para la configuración
export type CookieType = keyof typeof COOKIE_CONFIG.TYPES;
export type CookieTypeConfig = typeof COOKIE_CONFIG.TYPES[CookieType];

// Función para obtener la configuración de un tipo de cookie
export function getCookieTypeConfig(type: CookieType): CookieTypeConfig {
  return COOKIE_CONFIG.TYPES[type];
}

// Función para verificar si una funcionalidad está habilitada
type FeatureKey = 'GOOGLE_ANALYTICS' | 'GDPR' | 'CCPA';

export function isFeatureEnabled(feature: FeatureKey): boolean {
  switch (feature) {
    case 'GOOGLE_ANALYTICS':
      return COOKIE_CONFIG.GOOGLE_ANALYTICS.ENABLED;
    case 'GDPR':
      return COOKIE_CONFIG.COMPLIANCE.GDPR.ENABLED;
    case 'CCPA':
      return COOKIE_CONFIG.COMPLIANCE.CCPA.ENABLED;
    default:
      return false;
  }
}

// Función para obtener la duración de una cookie
export function getCookieDuration(type: CookieType): number | string {
  switch (type) {
    case 'ANALYTICS':
      return COOKIE_CONFIG.DURATION.ANALYTICS;
    case 'MARKETING':
      return COOKIE_CONFIG.DURATION.MARKETING;
    case 'PREFERENCES':
      return COOKIE_CONFIG.DURATION.PREFERENCES;
    case 'NECESSARY':
    default:
      return COOKIE_CONFIG.DURATION.SESSION;
  }
}
