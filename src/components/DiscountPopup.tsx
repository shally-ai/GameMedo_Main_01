import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Coupon {
  code: string;
  title?: string;
  description?: string;
  discount?: number;
  enabled?: boolean;
}

const DiscountPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCouponAndShow = async () => {
      // Check if already shown in this session
      const hasShown = sessionStorage.getItem("gamemedo_coupon_shown");
      if (hasShown) return;

      try {
        const { data: docSnap } = await supabase.from("content").select("coupon").eq("id", "main").maybeSingle();
        if (docSnap) {
          const data = docSnap;
          if (data.coupon && data.coupon.enabled) {
            setCoupon(data.coupon);
            // Delay showing slightly for better UX
            setTimeout(() => {
              setIsOpen(true);
              sessionStorage.setItem("gamemedo_coupon_shown", "true");
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Error fetching coupon for popup:", error);
      }
    };

    fetchCouponAndShow();
  }, []);

  const copyCode = () => {
    if (!coupon) return;
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    toast({ title: "Code Copied!", description: "Apply it at checkout for your discount." });
    
    // Automatically close the popup after a short delay so they see the "Copied" state
    setTimeout(() => {
      setIsOpen(false);
      setCopied(false);
    }, 800);
  };

  if (!isOpen || !coupon) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-background/80 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-card border-2 border-primary/30 rounded-3xl p-8 shadow-2xl shadow-primary/20 overflow-hidden"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mb-16" />

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <Tag className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="font-heading text-3xl font-bold uppercase mb-2">
              {coupon.title || "Special Offer!"}
            </h2>
            
            <p className="text-muted-foreground mb-8">
              {coupon.description || "Get a discount on your next project."}
            </p>

            <div className="bg-secondary/50 border-2 border-dashed border-border rounded-2xl p-6 mb-8 relative group">
              <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-bold mb-2">
                Your Coupon Code
              </div>
              <div className="text-4xl font-heading font-black tracking-widest text-primary mb-4 select-all">
                {coupon.code}
              </div>
              
              <button
                onClick={copyCode}
                className="w-full bg-primary text-primary-foreground font-heading text-xs tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Code Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Code
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-muted-foreground uppercase tracking-widest font-heading hover:text-foreground transition-colors"
            >
              No thanks, I'll pay full price
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DiscountPopup;
