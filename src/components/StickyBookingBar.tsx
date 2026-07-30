import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, X } from "lucide-react";

const StickyBookingBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("gamemedo_sticky_dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show after scrolling 600px past the fold
      const shouldShow = scrollY > 600;

      // Hide when booking section is in view
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        const rect = bookingSection.getBoundingClientRect();
        const isBookingVisible = rect.top < windowHeight && rect.bottom > 0;
        if (isBookingVisible) {
          setIsVisible(false);
          return;
        }
      }

      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("gamemedo_sticky_dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:pb-5 pointer-events-none"
          >
            <div className="max-w-2xl mx-auto pointer-events-auto">
              <div className="relative flex items-center justify-between gap-2 md:gap-4 bg-card border border-primary/40 rounded-2xl px-5 py-3.5 md:px-7 md:py-4 shadow-[0_8px_40px_rgba(0,0,0,0.6)] shadow-primary/20 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent pointer-events-none" />

                {/* Left: Urgency message */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] md:text-sm font-heading font-bold uppercase tracking-wider text-foreground">
                      DOMINATE THE SEASON
                    </p>
                    <p className="text-[10px] text-muted-foreground/70 tracking-wide hidden sm:block">
                      Instant ordering for elite graphics & video.
                    </p>
                  </div>
                </div>

                {/* Right: CTA + dismiss */}
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="/order"
                    className="bg-primary text-primary-foreground font-heading text-[10px] md:text-xs tracking-[0.15em] uppercase px-4 md:px-6 py-2.5 rounded-lg hover:brightness-110 transition-all active:scale-95 whitespace-nowrap glow-orange"
                  >
                    Quick Start →
                  </a>
                  <button
                    onClick={handleDismiss}
                    className="text-muted-foreground/50 hover:text-muted-foreground transition-colors p-1"
                    aria-label="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyBookingBar;
