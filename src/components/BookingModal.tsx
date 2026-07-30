import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { trackConversion } from "@/lib/trackConversion";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Fire conversion event the moment the modal opens
  useEffect(() => {
    if (isOpen) {
      trackConversion("book_demo_modal_open");
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-3xl bg-card border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col z-10"
          >
            {/* Header */}
            <div className="bg-secondary/80 px-6 py-5 border-b border-white/5 flex items-center justify-between backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <CalendarIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wider">Book a Strategy Call</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-2.5 h-2.5" /> Free — No Commitment
                    </span>
                    <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Available Slots Today</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 text-muted-foreground hover:text-red-500 transition-all flex items-center justify-center border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Embed */}
            <div className="w-full bg-white h-[450px] md:h-[550px] relative">
              {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white z-10">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] animate-pulse">Establishing Connection</p>
                </div>
              )}
              <iframe
                src="https://calendar.app.google/f6jg8ZqxVD2iVZtD8"
                style={{ border: 0 }}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a free strategy call with GameMedo"
                className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => {
                  setIsLoaded(true);
                  // Second conversion event: user actually SAW the calendar
                  trackConversion("calendar_view");
                }}
              />
            </div>

            {/* Footer */}
            <div className="bg-secondary/50 px-6 py-4 border-t border-white/5 text-center flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-medium">
                Instant Confirmation • Secure Booking System
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
