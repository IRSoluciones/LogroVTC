import { useState, useEffect, useCallback } from 'react';
import { COOKIE_CONFIG } from '../cookie-config';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsent {
  preferences: CookiePreferences;
  date: string;
  version: string;
}

const COOKIE_CONSENT_KEY = 'cookieConsent';
const COOKIE_CONSENT_VERSION = '1.0';

export function useCookies() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [consentDate, setConsentDate] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Función para aplicar preferencias de cookies
  const applyCookiePreferences = useCallback((prefs: CookiePreferences) => {
    if (prefs.analytics) {
      enableGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }

    if (prefs.marketing) {
      enableMarketingCookies();
    } else {
      disableMarketingCookies();
    }

    if (prefs.preferences) {
      enablePreferenceCookies();
    } else {
      disablePreferenceCookies();
    }
  }, []);

  // Cargar preferencias guardadas al inicializar y respetar ventana de renovación
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      try {
        const consent: CookieConsent = JSON.parse(savedConsent);
        if (consent.version === COOKIE_CONSENT_VERSION) {
          const renewDays = COOKIE_CONFIG.CONSENT.RENEW_AFTER_DAYS ?? 0;
          const mustRenew = (() => {
            if (!renewDays) return false;
            const last = new Date(consent.date).getTime();
            const now = Date.now();
            const ms = renewDays * 24 * 60 * 60 * 1000;
            return now - last > ms;
          })();

          setPreferences(consent.preferences);
          setHasConsent(!mustRenew);
          setConsentDate(consent.date);

          if (!mustRenew) {
            applyCookiePreferences(consent.preferences);
          }
        } else {
          localStorage.removeItem(COOKIE_CONSENT_KEY);
        }
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        localStorage.removeItem(COOKIE_CONSENT_KEY);
      }
    }
    setLoaded(true);
  }, [applyCookiePreferences]);

  // Guardar preferencias de cookies
  const savePreferences = useCallback((newPreferences: CookiePreferences) => {
    const consent: CookieConsent = {
      preferences: newPreferences,
      date: new Date().toISOString(),
      version: COOKIE_CONSENT_VERSION,
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setPreferences(newPreferences);
    setHasConsent(true);
    setConsentDate(consent.date);

    // Aplicar cambios en tiempo real
    applyCookiePreferences(newPreferences);
  }, [applyCookiePreferences]);

  // Aceptar todas las cookies
  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    savePreferences(allAccepted);
  }, [savePreferences]);

  // Aceptar solo cookies necesarias
  const acceptNecessary = useCallback(() => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    savePreferences(necessaryOnly);
  }, [savePreferences]);

  // Cambiar preferencia individual
  const togglePreference = useCallback((key: keyof CookiePreferences) => {
    if (key === "necessary") return; // No se puede desactivar
    
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key]
    };
    savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  // Restablecer preferencias
  const resetPreferences = useCallback(() => {
    const defaultPrefs: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setPreferences(defaultPrefs);
    setHasConsent(false);
    setConsentDate(null);
    
    // Deshabilitar todas las cookies no necesarias
    disableGoogleAnalytics();
    disableMarketingCookies();
    disablePreferenceCookies();
  }, []);

  // Verificar si una categoría específica está habilitada
  const isEnabled = useCallback((category: keyof CookiePreferences) => {
    return preferences[category];
  }, [preferences]);

  // Obtener fecha de consentimiento formateada
  const getFormattedConsentDate = useCallback(() => {
    if (!consentDate) return null;
    
    return new Date(consentDate).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, [consentDate]);

  return {
    preferences,
    hasConsent,
    loaded,
    consentDate: getFormattedConsentDate(),
    savePreferences,
    acceptAll,
    acceptNecessary,
    togglePreference,
    resetPreferences,
    isEnabled,
  };
}

// Funciones para habilitar/deshabilitar cookies específicas
function enableGoogleAnalytics() {
  console.log('Google Analytics habilitado');
  
  // Aquí implementarías la lógica para habilitar Google Analytics
  if (typeof window !== 'undefined' && !window.gtag) {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    script.async = true;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: unknown[]) {
      if (window.dataLayer) {
        window.dataLayer.push(args);
      }
    };
    
    window.gtag('js', new Date());
    window.gtag('config', 'GA_MEASUREMENT_ID');
  }
}

function disableGoogleAnalytics() {
  console.log('Google Analytics deshabilitado');
  
  if (typeof window !== 'undefined') {
    const scripts = document.querySelectorAll('script[src*="googletagmanager"]');
    scripts.forEach(script => script.remove());
    
    if (window.dataLayer) {
      window.dataLayer = [];
    }
    
    delete window.gtag;
  }
}

function enableMarketingCookies() {
  console.log('Cookies de marketing habilitadas');
  // Implementar lógica para cookies de marketing
}

function disableMarketingCookies() {
  console.log('Cookies de marketing deshabilitadas');
  // Implementar lógica para deshabilitar cookies de marketing
}

function enablePreferenceCookies() {
  console.log('Cookies de preferencias habilitadas');
  // Implementar lógica para cookies de preferencias
}

function disablePreferenceCookies() {
  console.log('Cookies de preferencias deshabilitadas');
  // Implementar lógica para deshabilitar cookies de preferencias
}

// Tipos globales para TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
