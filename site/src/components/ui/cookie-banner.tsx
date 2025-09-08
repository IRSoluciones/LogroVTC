"use client";

import { useEffect, useState } from "react";
import { useCookies } from "@/lib/hooks/useCookies";
import CookieManager from "./cookie-manager";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const { hasConsent, loaded } = useCookies();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Decidir apertura solo cuando el estado de cookies esté cargado
  useEffect(() => {
    if (!loaded) return;
    if (!hasConsent) {
      if (!userInteracted) setForceOpen(true);
    } else {
      // Cuando ya hay consentimiento, aseguramos cierre y limpiamos la marca
      setForceOpen(false);
      if (userInteracted) setUserInteracted(false);
    }
  }, [loaded, hasConsent, userInteracted]);

  if (!mounted || !loaded) return null; // evita parpadeo hasta hidratar y cargar consentimiento
  if (hasConsent && !forceOpen) return null;

  const handleOpenChange = (open: boolean) => {
    setForceOpen(open);
    if (!open) setUserInteracted(true);
  };

  return (
    <CookieManager open={!hasConsent || forceOpen} onOpenChange={handleOpenChange} hideTrigger preventClose={!hasConsent} />
  );
}
