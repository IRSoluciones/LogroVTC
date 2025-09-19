"use client";

import { useEffect, useState } from "react";
import { useCookies } from "@/lib/hooks/useCookies";
import CookieManager from "./cookie-manager";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const { hasConsent, loaded, acceptNecessary } = useCookies();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Decidir apertura solo cuando el estado de cookies esté cargado
  useEffect(() => {
    if (!loaded) return;
    if (!hasConsent) {
      if (!userInteracted) setForceOpen(true);
    } else {
      setForceOpen(false);
      if (userInteracted) setUserInteracted(false);
    }
  }, [loaded, hasConsent, userInteracted]);

  if (!mounted || !loaded) return null; // evita parpadeo hasta hidratar y cargar consentimiento
  if (hasConsent && !forceOpen) return null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setUserInteracted(true);
      if (!hasConsent) acceptNecessary();
      setForceOpen(false);
    } else {
      setForceOpen(true);
    }
  };

  return (
    <CookieManager open={forceOpen} onOpenChange={handleOpenChange} hideTrigger preventClose={false} />
  );
}
