"use client";

import { useEffect, useState } from "react";
import { useCookies } from "@/lib/hooks/useCookies";
import CookieManager from "./cookie-manager";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const { hasConsent, loaded } = useCookies();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Decidir apertura solo cuando el estado de cookies esté cargado
  useEffect(() => {
    if (!loaded) return;
    setForceOpen(!hasConsent);
  }, [loaded, hasConsent]);

  if (!mounted || !loaded) return null; // evita parpadeo hasta hidratar y cargar consentimiento
  if (hasConsent && !forceOpen) return null;

  return (
    <CookieManager open={!hasConsent || forceOpen} onOpenChange={setForceOpen} hideTrigger preventClose={!hasConsent} />
  );
}
