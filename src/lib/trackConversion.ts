/**
 * Retrieves UTM parameters stored in sessionStorage from the initial landing.
 */
export const getStoredUTMs = (): Record<string, string> => {
  try {
    const stored = sessionStorage.getItem("gamemedo_utm");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

/**
 * Reads UTM params + gclid from the current URL and persists them for the session.
 * Call this once on first page load (handled in GoogleAnalytics.tsx).
 */
export const captureUTMs = () => {
  const params = new URLSearchParams(window.location.search);
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
  const utms: Record<string, string> = {};

  UTM_KEYS.forEach((key) => {
    const val = params.get(key);
    if (val) utms[key] = val;
  });

  // Only overwrite if we have fresh UTMs (preserves first-touch attribution)
  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem("gamemedo_utm", JSON.stringify(utms));
  }
};

/**
 * Fires a Google Ads conversion event + a GA4 custom event with UTM context.
 * @param label - Human-readable label for GA4 (e.g. "book_demo_click")
 */
export const trackConversion = (label: string) => {
  if (typeof window === "undefined" || !window.gtag) return;

  const utms = getStoredUTMs();

  // 1. GA4 custom event — includes UTM attribution data
  window.gtag("event", label, {
    event_category: "conversion",
    ...utms,
  });

  // 2. Google Ads conversion — only fires if Ads credentials are configured
  const conversionId = import.meta.env.VITE_GADS_CONVERSION_ID;
  const conversionLabel = import.meta.env.VITE_GADS_CONVERSION_LABEL;

  if (conversionId && conversionLabel) {
    window.gtag("event", "conversion", {
      send_to: `${conversionId}/${conversionLabel}`,
    });
  }
};
