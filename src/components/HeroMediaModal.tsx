import { X, Play, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface HeroMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: {
    url: string;
    type: "video" | "graphic";
    title: string;
  } | null;
}

export const HeroMediaModal = ({ isOpen, onClose, media }: HeroMediaModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && media && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-all pointer-events-auto"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title Bar */}
            <div className="absolute -top-12 left-0 flex items-center gap-2 text-white/90 bg-black/50 px-4 py-2 rounded-full font-heading uppercase text-xs tracking-widest pointer-events-auto backdrop-blur-md">
              {media.type === "video" ? <Play className="w-4 h-4 text-primary" /> : <ImageIcon className="w-4 h-4 text-primary" />}
              {media.title}
            </div>

            {/* Media Container */}
            <div className="w-full bg-black rounded-xl overflow-hidden shadow-2xl shadow-primary/20 pointer-events-auto border border-white/10 relative group">
              {media.type === "video" ? (
                <video
                  src={media.url}
                  autoPlay
                  controls
                  className="w-full max-h-[85vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  src={media.url}
                  alt={media.title}
                  className="w-full max-h-[85vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
            
            <p className="absolute -bottom-8 text-white/50 text-xs italic tracking-widest font-heading uppercase">
              Press ESC to close
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
