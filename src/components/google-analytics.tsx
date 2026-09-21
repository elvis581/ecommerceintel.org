"use client";

import Script from "next/script";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const googleAnalyticsId = "G-W85K9NCP1F";
const consentStorageKey = "ecommerceintel-consent";
type ConsentChoice = "unknown" | "accepted" | "rejected";

const consentListeners = new Set<() => void>();

function getStoredChoice(): ConsentChoice {
  if (typeof window === "undefined") return "unknown";
  const stored = window.localStorage.getItem(consentStorageKey);
  return stored === "accepted" || stored === "rejected" ? stored : "unknown";
}

function subscribeToConsent(listener: () => void) {
  consentListeners.add(listener);
  return () => consentListeners.delete(listener);
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function GoogleAnalytics() {
  const choice = useSyncExternalStore(subscribeToConsent, getStoredChoice, () => "unknown");
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const saveChoice = (nextChoice: Exclude<ConsentChoice, "unknown">) => {
    window.localStorage.setItem(consentStorageKey, nextChoice);
    consentListeners.forEach((listener) => listener());
    setPreferencesOpen(false);
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: nextChoice === "accepted" ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  };

  return (
    <>
      {choice === "accepted" && <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){dataLayer.push(arguments);};
gtag('consent', 'update', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', {send_page_view: true});`}
        </Script>
      </>}
      {choice === "unknown" || preferencesOpen ? <aside className="cookie-banner" aria-label="Cookie consent">
        <div><p className="cookie-banner-title">Analytics preferences</p><p>We use Google Analytics only to understand page visits and improve the research library. You can accept analytics or reject non-essential cookies. Read the <Link href="/privacy">Privacy Policy</Link>.</p></div>
        <div className="cookie-banner-actions"><button type="button" className="cookie-button cookie-button-secondary" onClick={() => saveChoice("rejected")}>Reject non-essential</button><button type="button" className="cookie-button cookie-button-primary" onClick={() => saveChoice("accepted")}>Accept analytics</button></div>
      </aside> : <button type="button" className="cookie-preferences" onClick={() => setPreferencesOpen(true)}>Cookie preferences</button>}
    </>
  );
}
