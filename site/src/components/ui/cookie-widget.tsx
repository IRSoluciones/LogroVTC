"use client";

import { useState } from "react";
import { Button } from "./button";
import { Settings, Cookie, X } from "lucide-react";
import CookieManager from "./cookie-manager";
import { useCookies } from "@/lib/hooks/useCookies";

export default function CookieWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { hasConsent } = useCookies();

  // Solo mostrar si hay consentimiento previo
  if (!hasConsent) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 md:bottom-6">
      {/* Widget principal */}
      <div className="relative">
        {/* Botón principal */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-110"
          aria-label="Gestionar preferencias de cookies"
        >
          <Cookie className="h-5 w-5" />
        </Button>

        {/* Indicador de estado */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </div>

      {/* Modal de gestión directamente controlado */}
      <CookieManager open={isExpanded} onOpenChange={setIsExpanded} hideTrigger />
    </div>
  );
}
