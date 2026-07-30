import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { captureUTMs } from "@/lib/trackConversion";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();
  const GA_ID = import.meta.env.VITE_GA_ID;
  const GADS_ID = import.meta.env.VITE_GADS_CONVERSION_ID;

  useEffect(() => {
    if (!GA_ID) return;

    // Inject gtag script only once
    if (!window.gtag) {
      // Main GA4 script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());

      // Configure GA4
      window.gtag("config", GA_ID, {
        send_page_view: false, // We send manually below
      });

      // Configure Google Ads account (if set)
      if (GADS_ID) {
        window.gtag("config", GADS_ID);
      }
    }

    // Capture UTM params on every navigation (preserves first-touch)
    captureUTMs();
  }, [GA_ID, GADS_ID]);

  // Track page views on route change
  useEffect(() => {
    if (!GA_ID || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location, GA_ID]);

  return null;
};

export default GoogleAnalytics;
